import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, Table } from 'react-bootstrap';

export function FormatosList() {

    const [listaFormato, setListaFormato] = useState([])
    
    useEffect(() => {
        getFormatos()
    }, [])

    function borrar(id) {
        axios.delete(`http://localhost:5000/formatos/${id}`)
          .then(() => {
            alert("Registro borrado correctamente")
            getFormatos()
          })
          .catch(error => alert(error))
      }

    function getFormatos()
    {
        axios.get("http://localhost:5000/formatos")
        .then((response) => setListaFormato(response.data))
        .catch(error => alert(error))
    }

    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Acciones</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/formatos/nuevo">Nuevo</Nav.Link>
                </Nav>
            </Navbar>
            <Table size="sm" striped bordered hover>
                {listaFormato.length > 0 &&
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th></th>
                        </tr>
                    </thead>
                }
                {
                    listaFormato.length > 0 &&
                    <tbody>{
                        listaFormato.map(item => (
                            <tr key={item.idFormato}>
                                <td>{item.idFormato}</td>
                                <td>{item.nombre}</td>
                                <th>
                                    <Button size="sm" href={`/formatos/${item.idFormato}`} variant="warning">✏️</Button>{' '}
                                    <Button size="sm" onClick={() => borrar(item.idFormato)} variant="danger">❌</Button>
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