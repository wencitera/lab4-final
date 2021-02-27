import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Form, Col, Button, Navbar, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

export function AutorForm() {
    const history = useHistory()
    const { id } = useParams()
    const [autor, setAutor] = useState({
        idAutor: '',
        nombre: '',
        apellido: '',
    })

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/autores/${id}`)
                .then((response) => setAutor(response.data))
                .catch((error) => alert(error))
        }

    }, [])

    function handleOnChange(event, campo) {
        setAutor({
            ...autor,
            [campo]: event.target.value
        })
    }

    function guardar(event) {
        event.preventDefault()
        event.stopPropagation()
        var msgAlert = "Falta completar: "
        if (autor.nombre === '' || !autor.nombre) {
            alert(`${msgAlert} Nombre(s)`)
            return;
        }
        if (autor.apellido === '' || !autor.apellido) {
            alert(`${msgAlert} Apellido(s)`)
            return;
        }

        axios.post("http://localhost:5000/autores/", autor)
            .then(() => {
                alert("Se ha agregado el registro")
                history.push("/autores/")
            }).catch(error => alert(error))
    }

    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                {!id && <Navbar.Brand>Crear nuevo autor</Navbar.Brand>}
                {id && <Navbar.Brand>Modificar autor</Navbar.Brand>}
            </Navbar>
            <Form onSubmit={(event) => guardar(event)}>
                <Form.Row>
                    <Col>
                        <Form.Label>Nombre(s)</Form.Label>
                        {!id && <Form.Control onChange={(event) => handleOnChange(event, 'nombre')} />}
                        {id && <Form.Control placeholder={' '} value={autor.nombre} onChange={(event) => handleOnChange(event, 'nombre')} />}
                    </Col>
                    <Col>
                        <Form.Label>Apellido(s)</Form.Label>
                        {!id && <Form.Control onChange={(event) => handleOnChange(event, 'apellido')} />}
                        {id && <Form.Control placeholder={' '} value={autor.apellido} onChange={(event) => handleOnChange(event, 'apellido')} />}
                    </Col>
                </Form.Row>
                <Row>&nbsp;</Row>
                {!id && <Button type="submit" variant="success">Confirmar</Button>}
                {id && <Button type="submit" variant="success">Modificar</Button>}&nbsp;
                <Button onClick={() => history.push("/autores")} variant="danger">Cancelar</Button>
            </Form>
        </Container>
    );


}