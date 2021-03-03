import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

export function LibroForm() {

    const { id } = useParams()
    const [listaEditoriales, setListaEditoriales] = useState([])
    const [listaAutores, setListaAutores] = useState([])
    const [listaFormatos, setListaFormatos] = useState([])
    const history = useHistory()

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

    useEffect(() => {
        axios.get("http://localhost:5000/editoriales")
            .then((response) => setListaEditoriales(response.data))
            .catch((error) => alert(error))

        axios.get("http://localhost:5000/autores")
            .then((response) => setListaAutores(response.data))
            .catch((error) => alert(error))

        axios.get("http://localhost:5000/formatos")
            .then((response) => setListaFormatos(response.data))
            .catch((error) => alert(error))

        if (id) {
            axios.get(`http://localhost:5000/libros/${id}`)
                .then((response) => setLibro(response.data))
                .catch((error) => alert(error))
        }


    }, [])

    function guardar(event) {
        event.preventDefault()
        event.stopPropagation()

        var msgAlert = 'Falta completar:';
        if (libro.titulo === '' || !libro.titulo) {
            alert(`${msgAlert} Titulo`)
            return;
        }

        if (libro.cantidadHojas === '' || !libro.cantidadHojas) {
            alert(`${msgAlert} Cantidad de Hojas`)
            return;
        }

        if (libro.idEditorial === '' || !libro.idEditorial) {
            alert(`${msgAlert} Editorial`)
            return;
        }

        if (libro.tema === '' || !libro.tema) {
            alert(`${msgAlert} Tema`)
            return;
        }

        if (libro.anoEdicion === '' || !libro.anoEdicion) {
            alert(`${msgAlert} Año de Edicion`)
            return;
        }

        if (libro.formato === '' || !libro.formato) {
            alert(`${msgAlert} Formato`)
            return;
        }

        if (libro.idAutor.length === 0) {
            alert(`${msgAlert} Autor(es)`)
            return;
        }

        if (!id) {
            axios.post("http://localhost:5000/libros/", libro)
                .then(() => {
                    alert("se ha agregado el registro")
                    history.push("/libros/")
                }).catch(error => alert(error))
        } else {
            axios.put(`http://localhost:5000/libros/${id}`, libro)
                .then(() => {
                    alert("Se ha modificado el registro")
                    history.push("/libros/")
                }).catch(error => alert(error))
        }

    }

    function handleOnChange(event, campo) {
        setLibro({
            ...libro,
            [campo]: event.target.value
        })
    }

    function handleOnChangeAutor(id) {
        var autoresId = libro.idAutor;
        if (autoresId.includes(id)) {
            autoresId = autoresId.split(`${id},`).join('')
        }
        else {
            autoresId += `${id},`
        }
        console.log(autoresId)
        setLibro({
            ...libro,
            idAutor: autoresId
        })
    }

    return (
        <>
            <Container>

                <Navbar bg="primary" variant="dark">
                    {!id && <Navbar.Brand>Crear nuevo libro</Navbar.Brand>}
                    {id && <Navbar.Brand>Modificar Libro</Navbar.Brand>}
                </Navbar>
                <Form onSubmit={(event) => guardar(event)}>
                    <Form.Group>
                        <Form.Label>Titulo *</Form.Label>
                        {!id && <Form.Control onChange={(event) => handleOnChange(event, 'titulo')} />}
                        {id && <Form.Control value={libro.titulo} onChange={(event) => handleOnChange(event, 'titulo')} />}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad de Hojas *</Form.Label>
                        {!id && <Form.Control onChange={(event) => handleOnChange(event, 'cantidadHojas')} />}
                        {id && <Form.Control value={libro.cantidadHojas} onChange={(event) => handleOnChange(event, 'cantidadHojas')} />}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Editorial *</Form.Label>
                        <Form.Control as="select" onChange={(event) => handleOnChange(event, 'idEditorial')}>
                            {
                                listaEditoriales.map(element =>
                                    <option key={element.idEditorial} value={element.idEditorial}>{element.nombre}</option>
                                )
                            }
                            {!id && <option key={0} value="">Seleccione</option>}
                            {id && <select key={0} value={libro.idEditorial}></select>}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Temas *</Form.Label>
                        {!id && <Form.Control type="textarea" placeholder="Aventura, Ficción, Acción" onChange={(event) => handleOnChange(event, 'tema')} />}
                        {id && <Form.Control type="textarea" value={libro.tema} onChange={(event) => handleOnChange(event, 'tema')} />}
                        <Form.Text className="text-muted">Ingrese temas separados por coma. Ej: Aventura, Ficción.</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Año de Edicion *</Form.Label>
                        {!id && <Form.Control type="date" onChange={(event) => handleOnChange(event, 'anoEdicion')} />}
                        {id && <Form.Control type="date" value={libro.anoEdicion} onChange={(event) => handleOnChange(event, 'anoEdicion')} />}
                    </Form.Group>
                    <Form.Group>
                        {/* <Form.Label>Formato *</Form.Label>
                        {!id && <Form.Control type="text" placeholder="Tapa dura, ebook" onChange={(event) => handleOnChange(event, 'formato')} />}
                        {id && <Form.Control type="text" value={libro.formato} onChange={(event) => handleOnChange(event, 'formato')} />} */}
                        <Form.Label>Formato *</Form.Label>
                        <Form.Control as="select" onChange={(event) => handleOnChange(event, 'formato')}>
                            {
                                listaFormatos.map(element =>
                                    <option key={element.idFormato} value={element.idFormato}>{element.nombre}</option>
                                )
                            }
                            {!id && <option key={0} value="">Seleccione</option>}
                            {id && <select key={0} value={libro.formato}></select>}
                        </Form.Control>

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Autores *</Form.Label>
                        {!id && listaAutores.map((autor) => (
                            <Form.Check
                                label={`${autor.apellido}, ${autor.nombre}`}
                                onChange={() => handleOnChangeAutor(autor.idAutor)}
                            />
                        ))}
                        {id && <Form.Control type="text" value={libro.idAutor} readOnly />}
                        {id &&
                            listaAutores.map((autor) => (
                                <>

                                    <Form.Check
                                        label={`(${autor.idAutor}) ${autor.apellido}, ${autor.nombre}`}
                                        onChange={() => handleOnChangeAutor(autor.idAutor)}
                                        id={`${autor.apellido}-${autor.nombre}`}
                                    />
                                </>
                            ))}
                    </Form.Group>
                    {!id && <Button type="submit" variant="success">Confirmar</Button>}&nbsp;
                {id && <Button type="submit" variant="success">Modificar</Button>}&nbsp;
                <Button onClick={() => history.push("/vehiculos")} variant="danger">Cancelar</Button>
                </Form>
            </Container>
        </>
    );


}