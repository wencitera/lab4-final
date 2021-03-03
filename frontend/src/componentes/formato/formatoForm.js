import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Form, Col, Button, Navbar, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
export function FormatosForm() {

    const history = useHistory()
    const { id } = useParams()
    const [formato, setFormato] = useState({
        idFormato: '',
        nombre: '',
    })

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/formatos/${id}`)
                .then((response) => setFormato(response.data))
                .catch((error) => alert(error))
        }

    }, [])

    function handleOnChange(event, campo) {
        setFormato({
            ...formato,
            [campo]: event.target.value
        })
    }

    function guardar(event) {
        event.preventDefault()
        event.stopPropagation()
        var msgAlert = "Falta completar: "
        if (formato.nombre === '' || !formato.nombre) {
            alert(`${msgAlert} Nombre`)
            return;
        }

        if(!id)
        {
            axios.post("http://localhost:5000/formatos/", formato)
            .then(() => {
                alert("Se ha agregado el registro")
                history.push("/formatos/")
            }).catch(error => alert(error))
        }else
        {
            axios.put(`http://localhost:5000/formatos/${id}`, formato)
            .then(() => {
                alert("Se ha modificado el registro")
                history.push("/formatos/")
            }).catch(error => alert(error))
        }
    }

    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                {!id && <Navbar.Brand>Crear nuevo Formato</Navbar.Brand>}
                {id && <Navbar.Brand>Modificar Formato</Navbar.Brand>}
            </Navbar>
            <Form onSubmit={(event) => guardar(event)}>
                <Form.Row>
                    <Col>
                        <Form.Label>Nombre</Form.Label>
                        {!id && <Form.Control onChange={(event) => handleOnChange(event, 'nombre')} />}
                        {id && <Form.Control placeholder={' '} value={formato.nombre} onChange={(event) => handleOnChange(event, 'nombre')} />}
                    </Col>
                </Form.Row>
                <Row>&nbsp;</Row>
                {!id && <Button type="submit" variant="success">Confirmar</Button>}
                {id && <Button type="submit" variant="success">Modificar</Button>}&nbsp;
                <Button onClick={() => history.push("/formatos")} variant="danger">Cancelar</Button>
            </Form>
        </Container>
    );


}