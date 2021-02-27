from sqlalchemy import Column, Float, Integer, Boolean, String
from datos import db

class Autor(db.Model):
    __tablename__ = 'autores'
    idAutor =  Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(30), nullable=False)
    apellido = Column(String(30), nullable=False)