from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from repositorios.formato_repo import FormatoRepo



repo = FormatoRepo()

nsFormato = Namespace('formatos', description='Tabla de Formatos')

modeloFormatoSinId = Model('FormatoSinId', {
    'nombre' : fields.String(),
})

modeloFormato = modeloFormatoSinId.clone('Formato',{
    'idFormato' : fields.Integer(),
})

nsFormato.models[modeloFormato.name] = modeloFormato
nsFormato.models[modeloFormatoSinId.name] = modeloFormatoSinId


nuevoFormatoParse = reqparse.RequestParser(bundle_errors=True)
nuevoFormatoParse.add_argument('nombre', type=str, required=True)

editarFormatoParse = nuevoEditorialParse.copy()
editarFormatoParse.add_argument('idFormato', type=int, required=True)


@nsEditorial.route('/')
class FormatosResource(Resource):
    @nsEditorial.marshal_list_with(modeloFormato)
    def get(self):
        return repo.get_all()

    @nsEditorial.expect(modeloFormatoSinId)
    @nsEditorial.marshal_with(modeloFormato)
    def post(self):
        data = nuevoFormatoParse.parse_args()
        formato = repo.add(data)
        if formato:
            return formato, 201
        return 'Formato ya existente', 400

@nsEditorial.route('/<int:id>')
class FormatoResource(Resource):
    @nsEditorial.marshal_with(modeloFormato)
    def get(self,id):
        formato = repo.get_by_id(id)
        if formato:
            return formato, 200
        abort(404)
    
    def delete(self, id):
        if repo.delete(id):
            return 'Formato borrado', 200
        abort(400)
    
    @nsEditorial.expect(modeloFormato)
    def put(self, id):
        data = editarFormatoParse.parse_args()
        if repo.update(id,data):
            return 'Formato actualizado', 200
        abort(404)