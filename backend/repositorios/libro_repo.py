from dominio.libro import Libro
from dominio.editorial import Editorial
from dominio.autor import Autor

from datos import db
import json

class LibroRepo():
    def get_all(self):
        libros = Libro.query.all()
        lista=[]
        for li in libros:
            idE = li.idEditorial
            edi = Editorial.query.filter_by(idEditorial=idE).all()
            for e in edi:
                nom = e.nombre            
            aux = {
                'idLibro': li.idLibro,
                'titulo' : li.titulo.title(),
                'cantidadHojas': li.cantidadHojas,
                'anoEdicion' : li.anoEdicion,
                'tema' : li.tema,
                'formato' : li.formato,
                'idEditorial' : nom.title(),
                'idAutor' : li.idAutor
            }
            lista.append(aux)
        return lista
       
    def add(self, data):
        libro = Libro(**data)
        db.session.add(libro)
        db.session.commit()
        return libro
    
    def get_by_id(self,id):
        return Libro.query.get(id)


    #Libro deTalles
    def get_by_id_detalles(self,id):
        li = Libro.query.get(id)
        lista=[] 
        aux = li.idAutor
        autor = aux.split(',')        
        edi = Editorial.query.filter_by(idEditorial=li.idEditorial).all()
        for e in edi:
             nom = e.nombre 
        autores=''
        print(autor)
        for a in autor:
            print(a)
            if a == '':
                aux=0
            else:
                 aux = int(a)
            aut = Autor.query.filter_by(idAutor = aux).all()
            for au in aut:
                autores += au.nombre.title() + ' ' + au.apellido.title()+', '
        aux = {
            'idLibro': li.idLibro,
            'titulo' : li.titulo.title(),
            'cantidadHojas': li.cantidadHojas,
            'anoEdicion' : li.anoEdicion,
            'tema' : li.tema,
            'formato' : li.formato,
            'idEditorial' : nom.title(),
            'idAutor' : autores
            }
        print(aux)
        lista.append(aux)
        return aux





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
        tit = titulo.lower() 
        encontrados = Libro.query.filter_by(titulo = tit).all()        
        if encontrados:
            return encontrados
        return None
        
    
    def buscar_editorial(self,editorial):
        #edito = editorial.lower()
        edi = Editorial.query.filter_by(nombre=editorial).all()
        for e in edi:
            idE = e.idEditorial      
        encontrados = Libro.query.filter_by(idEditorial=idE).all()
        if encontrados:
            return encontrados
        return None    


    
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

   