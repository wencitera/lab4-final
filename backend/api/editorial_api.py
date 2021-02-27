from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from repositorios.editorial_repo import EditorialRepo



repo = EditorialRepo()

nsEditorial = Namespace('editoriales', description='Tabla de Editoriales')

modeloEditorialSinId = Model('EditorialSinId', {
    'nombre' : fields.String(),
})

modeloEditorial = modeloEditorialSinId.clone('Editorial',{
    'idEditorial' : fields.Integer(),
})

nsEditorial.models[modeloEditorial.name] = modeloEditorial
nsEditorial.models[modeloEditorialSinId.name] = modeloEditorialSinId


nuevoEditorialParse = reqparse.RequestParser(bundle_errors=True)
nuevoEditorialParse.add_argument('nombre', type=str, required=True)

editarEditorialParse = nuevoEditorialParse.copy()
editarEditorialParse.add_argument('idEditorial', type=int, required=True)


@nsEditorial.route('/')
class EditorialesResource(Resource):
    @nsEditorial.marshal_list_with(modeloEditorial)
    def get(self):
        return repo.get_all()

    @nsEditorial.expect(modeloEditorialSinId)
    @nsEditorial.marshal_with(modeloEditorial)
    def post(self):
        data = nuevoEditorialParse.parse_args()
        editorial = repo.add(data)
        if editorial:
            return editorial, 201
        abort(500)

@nsEditorial.route('/<int:id>')
class EditorialResource(Resource):
    @nsEditorial.marshal_with(modeloEditorial)
    def get(self,id):
        editorial = repo.get_by_id(id)
        if editorial:
            return editorial, 200
        abort(404)
    
    def delete(self, id):
        if repo.delete(id):
            return 'Editorial borrado', 200
        abort(400)
    
    @nsEditorial.expect(modeloEditorial)
    def put(self, id):
        data = editarEditorialParse.parse_args()
        if repo.update(id,data):
            return 'Editorial actualizado', 200
        abort(404)