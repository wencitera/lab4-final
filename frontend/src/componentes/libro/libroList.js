import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Form, FormControl, Nav, Navbar, Table, Button } from 'react-bootstrap';


export function LibroList() {

    const [listaLibros, setListaLibros] = useState([])

    useEffect(() => {
        getLibros()
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

    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Acciones</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/libros/nuevo">Nuevo</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
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