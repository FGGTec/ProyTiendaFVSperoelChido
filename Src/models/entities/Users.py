from flask_login import UserMixin

class User:
    def __init__(self, id, username, password, usertype, nombre=None, apellido=None):
        self.id = id
        self.username = username
        self.password = password
        self.usertype = usertype
        self.nombre = nombre
        self.apellido = apellido
        self.fullname = f"{nombre} {apellido}" if nombre and apellido else username


    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)
