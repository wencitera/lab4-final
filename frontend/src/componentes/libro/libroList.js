import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Form, FormControl, Nav, Navbar, Table, Button } from 'react-bootstrap';


export function LibroList() {

    const [listaLibros, setListaLibros] = useState([])
    const [listaEditoriales, setListaEditoriales] = useState([])
    const [filtro, setFiltro] = useState({
        busquedaPor: 'editorial',
        editorial: '',
        tema: '',
        titulo: ''
    })

    useEffect(() => {
        getLibros()
        axios.get("http://localhost:5000/editoriales")
            .then((response) => setListaEditoriales(response.data))
            .catch((error) => alert(error))
    }, [])

    function borrar(id) {
        axios.delete(`http://localhost:5000/libros/${id}`)
            .then(() => {
                alert("Libro borrado exitosamente")
                getLibros()
            })
            .catch(error => alert(error))
    }

    function getLibros() {
        axios.get("http://localhost:5000/libros")
            .then((response) => setListaLibros(response.data))
            .catch((error) => alert(error))
    }

    function handleOnChange(event, campo) {
        setFiltro({
            ...filtro,
            [campo]: event.target.value
        })
    }

    function filtrarLista(event) {
        event.preventDefault()
        event.stopPropagation()
        switch (filtro.busquedaPor) {
            case 'editorial':
                console.log("editorial, entré")
                axios.get(`http://localhost:5000/libroseditorial/${filtro.editorial}`)
                    .then((response) => setListaLibros(response.data))
                    .catch((error) => {
                        console.log(error)
                        getLibros()
                    })
                break;

            case 'tema':
                axios.get(`http://localhost:5000/librostemas/${filtro.tema}`)
                    .then((response) => setListaLibros(response.data))
                    .catch((error) => {
                        console.log(error)
                        getLibros()
                    })
                break;

            case 'titulo':
                axios.get(`http://localhost:5000/librostitulo/${filtro.titulo}`)
                    .then((response) => setListaLibros(response.data))
                    .catch((error) => {
                        console.log(error)
                        getLibros()
                    })
                break;
        }

    }

    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Acciones</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/libros/nuevo">Nuevo</Nav.Link>
                </Nav>
                <Form inline>
                    <Form.Group>
                        <Form.Control as="select" className="mr-sm-2" onChange={(event) => handleOnChange(event, 'busquedaPor')}>
                            <option>Tipo búsqueda</option>
                            <option value={'editorial'}>Editorial</option>
                            <option value={'tema'}>Tema</option>
                            <option value={'titulo'}>Titulo</option>
                        </Form.Control>
                        {filtro.busquedaPor === 'editorial' &&
                            <Form.Control as="select" className="mr-sm-2" onChange={(event) => handleOnChange(event, 'editorial')}>
                                <option key={0}>Seleccione</option>
                                {listaEditoriales.length > 0 && listaEditoriales.map((edit) => <option key={edit.idEditorial} value={edit.nombre}>{edit.nombre}</option>)}
                            </Form.Control>
                        }
                    </Form.Group>
                    {filtro.busquedaPor === 'tema' && <FormControl type="text" placeholder="Tema" className="mr-sm-2" onChange={(event) => handleOnChange(event, 'tema')} />}
                    {filtro.busquedaPor === 'titulo' && <FormControl type="text" placeholder="Título" className="mr-sm-2" onChange={(event) => handleOnChange(event, 'titulo')} />}
                    <Button onClick={(event) => filtrarLista(event)} variant="outline-light">Buscar</Button>&nbsp;
                    <Button onClick={() => getLibros()} variant="outline-light">Cancelar</Button>
                </Form>
            </Navbar>
            <Table striped bordered hover>
                {listaLibros.length > 0 &&
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Hojas</th>
                            <th>Año de Edicion</th>
                            <th>Editorial</th>
                            <th>Formato</th>
                            <th></th>
                        </tr>
                    </thead>
                }
                {
                    listaLibros.length > 0 &&
                    <tbody>{
                        listaLibros.map(item => (
                            <tr key={item.idLibro}>
                                <td><Nav.Link href={`/libros/detalles/${item.idLibro}`}>{item.titulo}</Nav.Link></td>
                                <td>{item.cantidadHojas}</td>
                                <td>{item.anoEdicion}</td>
                                <td>{item.idEditorial}</td>
                                <td>{item.formato}</td>
                                <th>
                                    <Button href={`/libros/${item.idLibro}`} variant="warning">Modificar</Button>{' '}
                                    <Button onClick={() => borrar(item.idLibro)} variant="danger">Eliminar</Button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                }


            </Table>
        </Container>
    );


}