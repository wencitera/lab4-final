from sqlalchemy import Column, Float, Integer, ARRAY, String, ForeignKey, Date
from datos import db
from sqlalchemy.orm import relationship
from dominio.autor import Autor
from dominio.editorial import Editorial
from dominio.formato import Formato

class Libro(db.Model):
    __tablename__ = 'libros'
    idLibro = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(30), nullable=False)
    cantidadHojas = Column(Integer, nullable=False)
    anoEdicion = Column(Date, nullable=False)
    tema =  Column(String(150), nullable=False)
    formato = Column(Integer(), ForeignKey('formatos.idFormato'), nullable=False)
    f = relationship('Formato')
    idEditorial = Column(Integer(), ForeignKey('editoriales.idEditorial'), nullable=False)    
    editorial = relationship('Editorial')
    idAutor =  Column(String(150), nullable=False)
   
    



