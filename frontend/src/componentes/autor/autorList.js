import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Navbar, Table } from 'react-bootstrap';

export function AutorList() {

    const [listaAutores, setListaAutores] = useState([])
    
    useEffect(() => {
        getAutores()
    }, [])

    function borrar(id) {
        axios.delete(`http://localhost:5000/autores/${id}`)
          .then(() => {
            alert("Registro borrado correctamente")
            getAutores()
          })
          .catch(error => alert(error))
      }

    function getAutores()
    {
        axios.get("http://localhost:5000/autores")
        .then((response) => setListaAutores(response.data))
        .catch(error => alert(error))
    }

    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Acciones</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/autores/nuevo">Nuevo</Nav.Link>
                </Nav>
            </Navbar>
            <Table size="sm" striped bordered hover>
                {listaAutores.length > 0 &&
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th></th>
                        </tr>
                    </thead>
                }
                {
                    listaAutores.length > 0 &&
                    <tbody>{
                        listaAutores.map(item => (
                            <tr key={item.idAutor}>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <th>
                                    <Button size="sm" href={`/autores/${item.idAutor}`} variant="warning">✏️</Button>{' '}
                                    <Button size="sm" onClick={() => borrar(item.idAutor)} variant="danger">❌</Button>
                                </th>
                            </tr>

                        ))
                    }
                    </tbody>
                }


            </Table>
        </Container>
    );


}