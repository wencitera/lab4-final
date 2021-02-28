import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Form, Col, Button, Navbar, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
export function EditorialForm() {

    const history = useHistory()
    const { id } = useParams()
    const [editorial, setEditorial] = useState({
        idEditorial: '',
        nombre: '',
    })

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/editoriales/${id}`)
                .then((response) => setEditorial(response.data))
                .catch((error) => alert(error))
        }

    }, [])

    function handleOnChange(event, campo) {
        setEditorial({
            ...editorial,
            [campo]: event.target.value
        })
    }

    function guardar(event) {
        event.preventDefault()
        event.stopPropagation()
        var msgAlert = "Falta completar: "
        if (editorial.nombre === '' || !editorial.nombre) {
            alert(`${msgAlert} Nombre`)
            return;
        }

        if(!id)
        {
            axios.post("http://localhost:5000/editoriales/", editorial)
            .then(() => {
                alert("Se ha agregado el registro")
                history.push("/editoriales/")
            }).catch(error => alert(error))
        }else
        {
            axios.put(`http://localhost:5000/editoriales/${id}`, editorial)
            .then(() => {
                alert("Se ha modificado el registro")
                history.push("/editoriales/")
            }).catch(error => alert(error))
        }
    }

    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                {!id && <Navbar.Brand>Crear nueva Editorial</Navbar.Brand>}
                {id && <Navbar.Brand>Modificar Editorial</Navbar.Brand>}
            </Navbar>
            <Form onSubmit={(event) => guardar(event)}>
                <Form.Row>
                    <Col>
                        <Form.Label>Nombre</Form.Label>
                        {!id && <Form.Control onChange={(event) => handleOnChange(event, 'nombre')} />}
                        {id && <Form.Control placeholder={' '} value={editorial.nombre} onChange={(event) => handleOnChange(event, 'nombre')} />}
                    </Col>
                </Form.Row>
                <Row>&nbsp;</Row>
                {!id && <Button type="submit" variant="success">Confirmar</Button>}
                {id && <Button type="submit" variant="success">Modificar</Button>}&nbsp;
                <Button onClick={() => history.push("/editoriales")} variant="danger">Cancelar</Button>
            </Form>
        </Container>
    );


}