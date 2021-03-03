import './App.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LibroForm } from './componentes/libro/libroForm';
import { LibroList } from './componentes/libro/libroList';
import { AutorForm } from './componentes/autor/autorForm';
import { AutorList } from './componentes/autor/autorList';
import { EditorialForm } from './componentes/editorial/editorialForm';
import { EditorialList } from './componentes/editorial/editorialList';
import { LibroDetalle } from './componentes/libro/libroDetalle';
import { FormatosList } from './componentes/formato/formatoList';
import {FormatosForm} from './componentes/formato/formatoForm';

function App() {
  return (
    <div>

      <Router>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Panel</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/libros">Libros</Nav.Link>
            <Nav.Link href="/autores">Autores</Nav.Link>
            <Nav.Link href="/editoriales">Editoriales</Nav.Link>
            <Nav.Link href="/formatos">Formatos</Nav.Link>
          </Nav>
        </Navbar>
        &nbsp;
        <>
            <Switch>
              <Route path="/libros/detalles/:id" component={LibroDetalle}></Route>
              <Route path="/libros/nuevo" component={LibroForm}></Route>
              <Route path="/libros/:id" component={LibroForm}></Route>
              <Route path="/libros" component={LibroList}></Route>

              <Route path="/formatos/nuevo" component={FormatosForm}></Route>
              <Route path="/formatos/:id" component={FormatosForm}></Route>
              <Route path="/formatos" component={FormatosList}></Route>

              <Route path="/autores/nuevo" component={AutorForm}></Route>
              <Route path="/autores/:id" component={AutorForm}></Route>
              <Route path="/autores" component={AutorList}></Route>

              <Route path="/editoriales/nuevo" component={EditorialForm}></Route>
              <Route path="/editoriales/:id" component={EditorialForm}></Route>
              <Route path="/editoriales" component={EditorialList}></Route>

              <Route path="/" component={LibroList}></Route>

            </Switch>
        </>
        
      </Router >
      &nbsp;
    </div> 
  );
}

export default App;
