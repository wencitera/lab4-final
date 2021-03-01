from sqlalchemy import Column, Float, Integer, Boolean, String
from datos import db

class Editorial(db.Model):
    __tablename__ = 'editoriales'
    idEditorial  = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(30), unique=True, nullable=False)