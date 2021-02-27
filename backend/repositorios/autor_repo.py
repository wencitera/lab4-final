from dominio.autor import Autor
from datos import db
import json

class AutorRepo():
    def get_all(self):
        return Autor.query.all()
       
    def add(self, data):
        autor = Autor(**data)
        db.session.add(autor)
        db.session.commit()
        return autor
    
    def get_by_id(self,id):
        return Autor.query.get(id)

    def delete(self,id):
        au = Autor.query.get(id)
        if au:
            db.session.delete(au)
            db.session.commit()
            return True
        return False

    def update(self, id, data):
        au = Autor.query.get(id)
        if au:
            au.idAutor = data['idAutor']
            au.nombre = data['nombre']
            au.apellido = data['apellido']            
            db.session.commit()
            return True
        return False