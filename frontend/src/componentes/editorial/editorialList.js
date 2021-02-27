import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar, Table } from 'react-bootstrap';
import { useHistory} from 'react-router-dom';

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
          .catch(error => alert(error))
          
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
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
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