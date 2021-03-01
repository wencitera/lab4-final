from flask import abort
from flask_restx import Resource, Namespace, Model, fields, reqparse
from repositorios.libro_repo import LibroRepo

repo = LibroRepo()

nsLibro = Namespace('libros', description='Tabla de Libros')

modeloLibroSinId = Model('LibroSinId', {
    'titulo' : fields.String(),
    'cantidadHojas': fields.Integer(),
    'anoEdicion': fields.Date(),
    'tema': fields.String(),
    'formato': fields.String(),
    'idEditorial': fields.Integer(),
    'idAutor': fields.String(),
   

})

modeloLibro = modeloLibroSinId.clone('Libro',{
     'idLibro': fields.Integer(),
})

modeloLibroMostrar = Model('LibroMostrar', {
    'titulo' : fields.String(),
    'cantidadHojas': fields.Integer(),
    'anoEdicion': fields.Date(),
    'tema': fields.String(),
    'formato': fields.String(),
    'idEditorial': fields.String(),
    'idAutor': fields.String(),
    'idLibro': fields.Integer(),   

})


nsLibro.models[modeloLibro.name] = modeloLibro
nsLibro.models[modeloLibroSinId.name] = modeloLibroSinId
nsLibro.models[modeloLibroMostrar.name] = modeloLibroMostrar


nuevoLibroParse = reqparse.RequestParser(bundle_errors=True)
nuevoLibroParse.add_argument('titulo', type=str, required=True)
nuevoLibroParse.add_argument('cantidadHojas', type=int, required=True)
nuevoLibroParse.add_argument('anoEdicion',required=True )
nuevoLibroParse.add_argument('tema', type=str, required=True)
nuevoLibroParse.add_argument('formato', type=str, required=True)
nuevoLibroParse.add_argument('idEditorial', type=int, required=True)
nuevoLibroParse.add_argument('idAutor', type=str, required=True)


editarLibroParse = nuevoLibroParse.copy()
editarLibroParse.add_argument('idLibro', type=int)


@nsLibro.route('/')
class LibrosResource(Resource):
    @nsLibro.marshal_list_with(modeloLibroMostrar)
    def get(self):
        return repo.get_all()

    @nsLibro.expect(modeloLibroSinId)
    @nsLibro.marshal_with(modeloLibro)
    def post(self):
        data = nuevoLibroParse.parse_args()
        libro = repo.add(data)
        if libro:
            return libro, 201
        abort(500)

@nsLibro.route('/<int:id>')
class LibroResource(Resource):
    @nsLibro.marshal_with(modeloLibro)
    def get(self,id):
        libro = repo.get_by_id(id)
        if libro:
            return libro, 200
        abort(404)
    
    def delete(self,id):
        if repo.delete(id):
            return 'Libro borrado', 200
        abort(400)
    
    @nsLibro.expect(modeloLibro)
    def put(self, id):
        data = editarLibroParse.parse_args()
        if repo.update(id,data):
            return 'Libro actualizado', 200
        abort(400)

@nsLibro.route('titulo/<titulo>')
class LibroBuscarTitulo(Resource):
    @nsLibro.marshal_with(modeloLibroMostrar)
    def get(self,titulo):
        return repo.buscar_titulo(titulo)

@nsLibro.route('editorial/<editorial>')
class LibroBuscarTitulo(Resource):
    @nsLibro.marshal_with(modeloLibroMostrar)
    def get(self,editorial):
        return repo.buscar_editorial(editorial)


@nsLibro.route('temas/<tema>')
class LibroBuscarTitulo(Resource):
    @nsLibro.marshal_with(modeloLibroMostrar)
    def get(self,tema):
        return repo.buscar_tema(tema)

#detalles
@nsLibro.route('detalles/<id>')
class LibrosDetalles(Resource):
    @nsLibro.marshal_with(modeloLibroMostrar)
    def get(self,id):
        return repo.get_by_id_detalles(id)        
       
