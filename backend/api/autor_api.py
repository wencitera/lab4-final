from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from repositorios.autor_repo import AutorRepo

repo = AutorRepo()

nsAutor = Namespace('autores', description='Tabla de Autores')

modeloAutorSinId = Model('AutorSinId', {
    'nombre' : fields.String(),
    'apellido' : fields.String(),
})

modeloAutor = modeloAutorSinId.clone('Autor',{
    'idAutor' : fields.Integer(),
})

nsAutor.models[modeloAutor.name] = modeloAutor
nsAutor.models[modeloAutorSinId.name] = modeloAutorSinId


nuevoAutorParse = reqparse.RequestParser(bundle_errors=True)
nuevoAutorParse.add_argument('nombre', type=str, required=True)
nuevoAutorParse.add_argument('apellido', type=str, required=True)

editarAutorParse = nuevoAutorParse.copy()
editarAutorParse.add_argument('idAutor', type=int, required=True)

@nsAutor.route('/')
class AutoresResource(Resource):
    @nsAutor.marshal_list_with(modeloAutor)
    def get(self):
        return repo.get_all()

    @nsAutor.expect(modeloAutorSinId)
    @nsAutor.marshal_with(modeloAutor)
    def post(self):
        data = nuevoAutorParse.parse_args()
        autor = repo.add(data)
        if autor:
            return autor, 201
        abort(500)

@nsAutor.route('/<int:id>')
class AutorResource(Resource):
    @nsAutor.marshal_with(modeloAutor)
    def get(self,id):
        autor = repo.get_by_id(id)
        if autor:
            return autor, 200
        abort(404)
    
    def delete(self, id):
        if repo.delete(id):
            return 'Autor borrado', 200
        abort(400)
    
    @nsAutor.expect(modeloAutor)
    def put(self, id):
        data = editarAutorParse.parse_args()
        if repo.update(id,data):
            return 'Autor actualizado', 200
        abort(404)



