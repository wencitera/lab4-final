import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, Table } from 'react-bootstrap';

export function EditorialList() {

    const [listaEditoriales, setListaEditoriales] = useState([])

    useEffect(() => {
        getEditoriales()
    }, [])

    function borrar(id) {
        axios.delete(`http://localhost:5000/editoriales/${id}`)
          .then(() => {
            alert("Registro borrado correctamente")
            getEditoriales()
          })
          .catch(() => alert("No se puede borrar, esta editorial esta en uso"))
          
      }
    function getEditoriales(){
        axios.get("http://localhost:5000/editoriales")
            .then((response) => setListaEditoriales(response.data))
            .catch(error => alert(error))
    }
    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Acciones</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/editoriales/nuevo">Nuevo</Nav.Link>
                </Nav>
            </Navbar>
            <Table size="sm" striped bordered hover>
                {listaEditoriales.length > 0 &&
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th></th>
                        </tr>
                    </thead>
                }
                {
                    listaEditoriales.length > 0 &&
                    <tbody>{
                        listaEditoriales.map(item => (
                            <tr key={item.idEditorial}>
                                <td>{item.nombre}</td>
                                <th>
                                    <Button size="sm" href={`/editoriales/${item.idEditorial}`} variant="warning">✏️</Button>{' '}
                                    <Button size="sm" onClick={() => borrar(item.idEditorial)} variant="danger">❌</Button>
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