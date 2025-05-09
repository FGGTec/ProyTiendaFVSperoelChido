import os
from functools import wraps

from flask_mysqldb import MySQL
from flask_login import LoginManager, login_user, logout_user, login_required, current_user

from flask import Flask, redirect, render_template, request, url_for, flash, abort
from Config import DevelopmentConfig
from models.entities.Users import User
from models.ModelUsers import ModelUsers
from models.entities.Users import User

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

@app.route("/paquetes")
def paquetes():
    return render_template("paquetes.html")

@app.route("/InfoAdicional2")
def InfoAdicional2():
    return render_template("InfoAdicional2.html")

@app.route("/infoAdicional")
def infoAdicional():
    return render_template("infoAdicional.html")

@app.route("/ticket")
def ticket():
    return render_template("ticket.html")

@app.route("/Ticket2")
def Ticket2():
    return render_template("Ticket2.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        print("🔐 POST recibido en /login")
        username = request.form['username']
        password = request.form['password']
        print(f"➡️ Datos recibidos: usuario = {username}, contraseña = {password}")
        
        user = User(0, username, password, 0)
        logged_user = ModelUsers.login(db, user)

        if logged_user:
            print(f"✅ Login exitoso. Usuario: {logged_user.username}, Tipo: {logged_user.usertype}")
            login_user(logged_user)
            if logged_user.usertype == 1:
                print("➡️ Redirigiendo a index()")
                return redirect(url_for("index"))
            else:
                print("➡️ Usuario logueado, pero no es admin. Redirigir según tu lógica.")
        else:
            print("❌ Login fallido. Usuario no encontrado o credenciales incorrectas.")
            flash("Acceso rechazado...") 
            return render_template("login.html")
    else:
        print("📥 GET en /login: mostrando formulario.")
        return render_template("login.html")


def admin_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if not current_user.is_authenticated or current_user.usertype != 1:
            abort(403)
        return func(*args, **kwargs)
    return decorated_view

@app.route("/registro", methods=["GET", "POST"])
def registro():
    if request.method == "POST":
        try:
            nombre = request.form['nombre']
            apellido = request.form['apellido']
            password = request.form['password']
            gamertag = request.form['gamertag']

            print("📨 Datos recibidos:")
            print("Nombre:", nombre)
            print("Apellido:", apellido)
            print("Gamertag:", gamertag)
            print("Contraseña:", password)

            cursor = db.connection.cursor()
            print("📥 Ejecutando INSERT...")
            cursor.execute("""
                INSERT INTO Usuario (NombreUsuario, ApellidoUsuario, Contrasenia, Gamertag)
                VALUES (%s, %s, %s, %s)
            """, (nombre, apellido, password, gamertag))
            db.connection.commit()
            print("✅ Usuario insertado y commit hecho.")
            flash("Usuario registrado correctamente", "success")
            return redirect(url_for('login'))

        except Exception as e:
            db.connection.rollback()
            print("❌ ERROR al registrar usuario:", str(e))
            flash("Error al registrar usuario", "danger")

    return render_template("registro.html")



@login_manager_app.user_loader
def load_user(user_id):
    return ModelUsers.get_by_id(db, user_id)


@app.route("/home")
@login_required
def home():
    return render_template("home.html") 

@app.route("/admin")
@login_required
@admin_required
def admin():
    return render_template("admin.html") 

@app.route("/prueba")
def prueba():
    return render_template("prueba.html")



@login_manager_app.user_loader
def load_user(id):
    return ModelUsers.get_by_id(db, id)

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)
