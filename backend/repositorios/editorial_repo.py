from dominio.editorial import Editorial
from datos import db
import json

class EditorialRepo():
    def get_all(self):
        return Editorial.query.all()
       
    def add(self, data):
        editorial = Editorial(**data)
        db.session.add(editorial)
        db.session.commit()
        return editorial
    
    def get_by_id(self,id):
        return Editorial.query.get(id)

    def delete(self,id):
        ed = Editorial.query.get(id)
        if ed:
            db.session.delete(ed)
            db.session.commit()
            return True
        return False

    def update(self, id, data):
        ed = Editorial.query.get(id)
        if ed:
            ed.idEditorial = data['idEditorial']
            ed.nombre = data['nombre']                 
            db.session.commit()
            return True
        return False