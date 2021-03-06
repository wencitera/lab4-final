from flask import Flask
from flask_restx import Api
from flask_cors import CORS

from datos import db

from api.autor_api import nsAutor
from api.editorial_api import nsEditorial
from api.libros_api import nsLibro
from api.formato_api import nsFormato
<<<<<<< HEAD
=======

>>>>>>> b658acd333770fc5ad0cf899c2bfdac843b5c5ec


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:admin@localhost/lab4Libros"
CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()


api = Api(app, version='1.0.beta', title='Biblioteca', description='Administracion de Libros')

api.add_namespace(nsAutor)
api.add_namespace(nsEditorial)
api.add_namespace(nsLibro)
api.add_namespace(nsFormato)




if __name__ == '__main__':
    app.run()