from dominio.libro import Libro
from dominio.editorial import Editorial

from datos import db
import json

class LibroRepo():
    def get_all(self):
        return Libro.query.all()
       
    def add(self, data):
        libro = Libro(**data)
        db.session.add(libro)
        db.session.commit()
        return libro
    
    def get_by_id(self,id):
        return Libro.query.get(id)

    def delete(self,id):
        li = Libro.query.get(id)
        if li:
            db.session.delete(li)
            db.session.commit()
            return True
        return False

    def update(self, id, data):
        li = Libro.query.get(id)
        titulo = data['titulo'].lower()
        temas = data['temas'].lower()
        if li:
            li.idLibro = data['idLibro']
            li.titulo = titulo
            li.cantidadHojas = data['cantidadHojas']
            li.anoEdicion = data['anoEdicion']
            li.tema = tema
            li.formato = data['formato']
            li.idEditorial = data['idEditorial']
            li.idAutor = data['idautor']
            db.session.commit()
            return True
        return False

    def buscar_titulo(self,titulo):
        titulo = titulo.lower()
        libros = Libro.query.all()
        lista = []
        for ti in libros:
            if ti.titulo == titulo:
                lista.append(ti)
        return lista
        
    
    def buscar_editorial(self,editorial):
        editorial = editorial.lower()
        libros = Libro.query.all()
        editoriales = Editorial.query.all()
        lista = []        
        for li in libros:
            for edi in editoriales:                              
                if li.idEditorial == edi.idEditorial:                   
                    ed = edi.nombre.lower()                   
                    if ed == editorial:
                        lista.append(li)
        return lista
     

    
    def buscar_tema(self,tema):
        tema = tema.lower()
        libros = Libro.query.all()
        lista = []
        for li in libros:
            te = li.tema
            tem = te.split(',')            
            for t in tem:               
                if t == tema:
                    lista.append(li)       
        return lista

   