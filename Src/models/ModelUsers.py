from .entities.Users import User

class ModelUsers:

    @classmethod
    def login(cls, db, user):
        try:
            cursor = db.connection.cursor()
            cursor.execute(
                "SELECT ID_Usuario, Gamertag, Contrasenia, 1 AS usertype, CONCAT(NombreUsuario, ' ', ApellidoUsuario) FROM Usuario WHERE Gamertag = %s AND Contrasenia = %s",
                (user.username, user.password)
            )
            row = cursor.fetchone()
            if row:
                # ID, username, password, usertype, fullname
                return User(row[0], row[1], row[2], row[3], row[4])
            return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_by_id(cls, db, id):
        try:
            cursor = db.connection.cursor()
            cursor.execute(
                "SELECT ID_Usuario, Gamertag, 1 AS usertype, CONCAT(NombreUsuario, ' ', ApellidoUsuario) FROM Usuario WHERE ID_Usuario = %s",
                (id,)
            )
            row = cursor.fetchone()
            if row:
                return User(row[0], row[1], None, row[2], row[3])
            return None
        except Exception as ex:
            raise Exception(ex)
