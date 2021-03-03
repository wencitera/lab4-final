from sqlalchemy import Column, Float, Integer, Boolean, String
from datos import db

class Formato(db.Model):
    __tablename__ = 'formatos'
    idFormato  = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(30), unique=True, nullable=False)