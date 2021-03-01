import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, ListGroup, ListGroupItem, Navbar, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

export function LibroDetalle() {

    const [libro, setLibro] = useState({
        idLibro: '',
        titulo: '',
        cantidadHojas: '',
        anoEdicion: '',
        tema: '',
        formato: '',
        idEditorial: '',
        idAutor: ''
    })
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/librosdetalles/${id}`)
            .then((response) => setLibro(response.data))
            .catch((error) => alert(error))
        
    }, [])

    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>Detalles de libro</Navbar.Brand>
                <Form inline>
                    <Button className="mr-sm-2" href={"/libros/"} variant="danger">Volver</Button>
                </Form>
            </Navbar>
            <Card>
                <Card.Body>
                    <Card.Title>ID: {libro.idLibro}</Card.Title>
                    <Card.Title>Título: {libro.titulo}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Año de Edicion: <b>{libro.anoEdicion}</b></ListGroupItem>
                    <ListGroupItem>Cantidad de Hojas: <b>{libro.cantidadHojas}</b></ListGroupItem>
                    <ListGroupItem>Formato: <b>{libro.formato}</b></ListGroupItem>
                    <ListGroupItem>Temas: <b>{libro.tema}</b></ListGroupItem>
                    <ListGroupItem>Editorial: <b>{libro.idEditorial}</b></ListGroupItem>
                    <ListGroupItem>Autores: <i>{libro.idAutor}</i></ListGroupItem>
                </ListGroup>
            </Card>
        </Container>
    );


}