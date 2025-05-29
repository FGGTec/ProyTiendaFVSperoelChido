import os
import MySQLdb
from functools import wraps

from flask_mysqldb import MySQL
from flask_login import LoginManager, login_user, logout_user, login_required, current_user

from flask import Flask, redirect, render_template, request, url_for, flash, abort
from config import DevelopmentConfig
from models.entities.Users import User
from models.ModelUsers import ModelUsers
from models.entities.Users import User

def create_app():
    # Asegúrate de tener tu config.py
    BASE_DIR = os.path.abspath(os.path.dirname(__file__)) 
    TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")
    STATIC_DIR = os.path.join(BASE_DIR, "static")

    app = Flask(__name__, template_folder="templates", static_folder="static")
    db = MySQL(app)
    login_manager_app = LoginManager(app)
    app.config.from_object(DevelopmentConfig)


    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/servicios")
    def servicios():
        return render_template("servicios.html")

    @app.route("/blog")
    def blog():
        return render_template("blog.html")


    @app.route("/galeria")
    def galeria():
        return render_template("galeria.html")


    @app.route("/nosotros")
    def nosotros():
        return render_template("nosotros.html")

    @app.route("/carrito")
    def carrito():
        return render_template("carrito.html")

    '''@app.route("/paquetes")
    @login_required
    def paquetes():
        cursor = db.connection.cursor()
        # Obtener el rol del usuario autenticado
        cursor.execute("SELECT RolUsuario FROM Usuario WHERE ID_Usuario = %s", (current_user.id,))
        role_data = cursor.fetchone()
        cursor.close()      
        if not role_data:
            print("Usuario no encontrado")
            return redirect(url_for("login"))  
        RolUsuario = role_data[0]  
        print(f"Rol detectado: {RolUsuario}")  
        return render_template("paquetes.html", RolUsuario=RolUsuario)'''

    @app.route("/paquetes")
    def paquetes():
        RolUsuario = None
        paquetes = []

        cursor = db.connection.cursor()

        # Obtener el rol del usuario actual
        if current_user.is_authenticated:
            cursor.execute("SELECT RolUsuario FROM Usuario WHERE ID_Usuario = %s", (current_user.id,))
            result = cursor.fetchone()
            if result:
                RolUsuario = result[0]

        # Obtener todos los paquetes de la base de datos
        cursor.execute("SELECT * FROM paquete")
        paquetes_data = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]
        cursor.close()

        # Convertir las tuplas en diccionarios
        paquetes = [dict(zip(column_names, row)) for row in paquetes_data]

        return render_template("paquetes.html", RolUsuario=RolUsuario, paquetes=paquetes)


    @app.route("/InfoAdicional2")
    def InfoAdicional2():
        nombre = ""
        apellido = ""
        fechas_ocupadas = []

        if current_user.is_authenticated:
            nombre = getattr(current_user, 'nombre', '')
            apellido = getattr(current_user, 'apellido', '')

        try:
            cursor = db.connection.cursor()
            cursor.execute("SELECT fecha FROM FechasReservadas")
            fechas_ocupadas = [row[0].strftime("%Y-%m-%d") for row in cursor.fetchall()]
        except Exception as e:
            print("Error al obtener fechas reservadas:", e)

        return render_template("InfoAdicional2.html", nombre=nombre, apellido=apellido, fechas_ocupadas=fechas_ocupadas)


    @app.route("/infoAdicional")
    def infoAdicional():
        
        nombre = ""
        apellido = ""
        fechas_ocupadas = []

        if current_user.is_authenticated:
            nombre = getattr(current_user, 'nombre', '')
            apellido = getattr(current_user, 'apellido', '')

        try:
            cursor = db.connection.cursor()
            cursor.execute("SELECT fecha FROM FechasReservadas")
            rows = cursor.fetchall()
            fechas_ocupadas = [row[0].strftime("%Y-%m-%d") for row in rows]  # formato para el input[type="date"]
        except Exception as e:
            print("Error al cargar fechas ocupadas:", str(e))

        return render_template("infoAdicional.html", nombre=nombre, apellido=apellido, fechas_ocupadas=fechas_ocupadas)

    @app.route("/reservar_fecha", methods=["POST"])
    @login_required
    def reservar_fecha():
        data = request.get_json()
        fecha = data.get("fecha")

        try:
            cursor = db.connection.cursor()
            cursor.execute("SELECT * FROM FechasReservadas WHERE fecha = %s", (fecha,))
            if cursor.fetchone():
                return {"status": "error", "message": "Fecha ya reservada"}, 409

            cursor.execute("INSERT INTO FechasReservadas (fecha, id_usuario) VALUES (%s, %s)", (fecha, current_user.id))
            db.connection.commit()
            return {"status": "ok", "message": "Fecha reservada exitosamente"}
        except Exception as e:
            db.connection.rollback()
            print("Error al registrar fecha:", e)
            return {"status": "error", "message": "Error al reservar fecha"}, 500



    @app.route("/ticket")
    def ticket():
        return render_template("ticket.html")

    @app.route("/guardar_ticket", methods=["POST"])
    @login_required
    def guardar_ticket():
        data = request.get_json()
        try:
            correo = data.get('correo')
            fecha = data.get('fecha')
            hora = data.get('hora')
            direccion = data.get('direccion')
            comentario = data.get('comentario')
            total = data.get('total')
            # El usuario actual
            id_usuario = current_user.id
            # El paquete seleccionado (debes guardar el ID del paquete en localStorage y mandarlo desde JS)
            id_paquete = data.get('id_paquete')

            cursor = db.connection.cursor()
            cursor.execute("""
                INSERT INTO ticket (CorreoTicket, FechaTicket, HoraTicket, DireccionTicket, ComentarioTicket, FKID_Usuario, FKID_Paquete, TotalTicket)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (correo, fecha, hora, direccion, comentario, id_usuario, id_paquete, total))
            db.connection.commit()
            return {"status": "ok"}
        except Exception as e:
            db.connection.rollback()
            print("Error al guardar ticket:", e)
            return {"status": "error", "message": str(e)}, 500
        
    @app.route("/ticket2")
    def ticket2():
        return render_template("ticket2.html")
        
    @app.route("/guardar_ticket2", methods=["POST"])
    @login_required
    def guardar_ticket2():
        data = request.get_json()
        try:
            correo = data.get('correo')
            fecha = data.get('fecha')
            hora = data.get('hora')
            direccion = data.get('direccion')
            comentario = data.get('comentario')
            total = data.get('total')
            # El usuario actual
            id_usuario = current_user.id
            # El paquete seleccionado (debes guardar el ID del paquete en localStorage y mandarlo desde JS)
            namepaquetes = data.get('namepaquetes')  # ✅


            cursor = db.connection.cursor()
            cursor.execute("""
                INSERT INTO ticketm (CorreoTicketM, FechaTicketM, HoraTicketM, DireccionTicketM, ComentarioTicketM, FKID_Usuario, NPaquetes, TotalTicketM)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (correo, fecha, hora, direccion, comentario, id_usuario, namepaquetes, total))
            db.connection.commit()
            return {"status": "ok"}
        except Exception as e:
            db.connection.rollback()
            print("Error al guardar ticket:", e)
            return {"status": "error", "message": str(e)}, 500

    @app.route("/login", methods=["GET", "POST"])
    def login():
        if request.method == "POST":
            print("POST recibido en /login")
            username = request.form['username']
            password = request.form['password']
            print(f"Datos recibidos: usuario = {username}, contraseña = {password}")
            
            user = User(0, username, password, 0)
            logged_user = ModelUsers.login(db, user)

            if logged_user:
                print(f"Login exitoso. Usuario: {logged_user.username}, Tipo: {logged_user.usertype}")
                login_user(logged_user)
                if logged_user.usertype == 1:
                    print(" Redirigiendo a index()")
                    return redirect(url_for("index"))
                else:
                    print(" Usuario logueado, pero no es admin.")
            else:
                print("Login fallido. Usuario no encontrado o credenciales incorrectas.")
                flash("Acceso rechazado...") 
                return render_template("login.html")
        else:
            print("GET en /login: mostrando formulario.")
            return render_template("login.html")


    '''def admin_required(func):
        @wraps(func)
        def decorated_view(*args, **kwargs):
            if not current_user.is_authenticated or current_user.usertype != 1:
                abort(403)
            return func(*args, **kwargs)
        return decorated_view'''
    def admin_required(func):
        @wraps(func)
        def decorated_view(*args, **kwargs):
            if not current_user.is_authenticated or getattr(current_user, 'RolUsuario', None) != 'admin':
                abort(403)
            return func(*args, **kwargs)
        return decorated_view

    '''@app.route("/registro", methods=["GET", "POST"])
    def registro():
        if request.method == "POST":
            try:
                nombre = request.form['nombre']
                apellido = request.form['apellido']
                password = request.form['password']
                gamertag = request.form['gamertag']

                print(" Datos recibidos:")
                print("Nombre:", nombre)
                print("Apellido:", apellido)
                print("Gamertag:", gamertag)
                print("Contraseña:", password)

                cursor = db.connection.cursor()
                print(" Ejecutando INSERT...")
                cursor.execute("""
                    INSERT INTO Usuario (NombreUsuario, ApellidoUsuario, Contrasenia, Gamertag)
                    VALUES (%s, %s, %s, %s)
                """, (nombre, apellido, password, gamertag))
                db.connection.commit()
                print("Usuario insertado y commit hecho.")
                flash("Usuario registrado correctamente", "success")
                return redirect(url_for('login'))

            except Exception as e:
                db.connection.rollback()
                print("ERROR al registrar usuario:", str(e))
                flash("Error al registrar usuario", "danger")

        return render_template("registro.html")'''
    @app.route("/registro", methods=["GET", "POST"])
    def registro():
        if request.method == "POST":
            try:
                nombre = request.form['nombre']
                apellido = request.form['apellido']
                password = request.form['password']
                gamertag = request.form['gamertag']

                cursor = db.connection.cursor()
                # Verificación de duplicado
                cursor.execute("SELECT * FROM Usuario WHERE Gamertag = %s", (gamertag,))
                usuario_existente = cursor.fetchone()

                if usuario_existente:
                    flash("El Gamertag ya está registrado. Intenta con otro.", "warning")
                    return render_template("registro.html")

                # Insertar nuevo usuario
                cursor.execute("""
                    INSERT INTO Usuario (NombreUsuario, ApellidoUsuario, Contrasenia, Gamertag)
                    VALUES (%s, %s, %s, %s)
                """, (nombre, apellido, password, gamertag))
                db.connection.commit()
                flash("Usuario registrado correctamente", "success")
                return redirect(url_for('login'))

            except Exception as e:
                db.connection.rollback()
            if "Duplicate entry" in str(e):
                flash("Este Gamertag ya está en uso. Intenta con otro.", "warning")
            else:
                flash("Error al registrar usuario. Intenta más tarde.", "danger")
            return redirect(url_for('registro'))

        return render_template("registro.html")

    '''@app.route("/LDU")
    def LDU():
        cursor = db.connection.cursor()
        cursor.execute("SELECT ID_Usuario, NombreUsuario, ApellidoUsuario, Contrasenia, Gamertag, RolUsuario FROM Usuario")
        usuarios = cursor.fetchall()  # Lista de usuarios desde la BD
        cursor.close()
        return render_template("LDU.html", usuarios=usuarios)
    @app.route("/LDU")
    #@admin_required
    def LDU():
        cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT ID_Usuario, NombreUsuario, ApellidoUsuario, Contrasenia, Gamertag, RolUsuario FROM Usuario")
        usuarios = cursor.fetchall()  # Ahora cada usuario es un dict
        cursor.close()
        return render_template("LDU.html", usuarios=usuarios)'''
    @app.route("/LDU")
    @login_required
    def LDU():
        # Consultar el rol del usuario actual directamente en la base de datos
        cursor = db.connection.cursor()
        cursor.execute("SELECT RolUsuario FROM Usuario WHERE ID_Usuario = %s", (current_user.id,))
        result = cursor.fetchone()
        cursor.close()
        if not result or result[0] != 'admin':
            abort(403)
        # Si es admin, mostrar la lista de usuarios
        cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT ID_Usuario, NombreUsuario, ApellidoUsuario, Contrasenia, Gamertag, RolUsuario FROM Usuario")
        usuarios = cursor.fetchall()
        '''cursor.close()
        return render_template("LDU.html", usuarios=usuarios)'''
        cursor.execute("SELECT ID_Paquete, NombrePaquete, DetallesPaquete, PrecioPaquete, TipoPaquete FROM paquete")
        paquetes = cursor.fetchall()
        cursor.close()
        return render_template("LDU.html", usuarios=usuarios, paquetes=paquetes)

    @login_manager_app.user_loader
    def load_user(user_id):
        return ModelUsers.get_by_id(db, user_id)


    @login_manager_app.user_loader
    def load_user(id):
        return ModelUsers.get_by_id(db, id)

    @app.route("/logout")
    @login_required
    def logout():
        logout_user()
        return redirect(url_for("login"))
    return app
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
