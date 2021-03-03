from dominio.formato import Formato
from datos import db
import json

class FormatoRepo():
    def get_all(self):
        return Formato.query.all()
       
    def add(self, data):
        formato = Formato(**data)
        db.session.add(formato)
        db.session.commit()
        return editorial
    
    def get_by_id(self,id):
        return Formato.query.get(id)

    def delete(self,id):
        ed = Formato.query.get(id)
        if ed:
            db.session.delete(ed)
            db.session.commit()
            return True
        return False

    def update(self, id, data):
        ed = Formato.query.get(id)
        if ed:
            ed.idFormato = data['idFormato']
            ed.nombre = data['nombre']                 
            db.session.commit()
            return True
        return False