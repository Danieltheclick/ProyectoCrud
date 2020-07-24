import React from 'react';
import { BrowserRouter as Router , Route , Redirect} from 'react-router-dom'
import Nav from './components/Nav'
import Login from './components/Login'
import CrearEmpleado from './components/CrearEmpleado';
import EditarEmpleado from './components/EditarEmpleado';
import ObtenerEmpleadosT from './components/Empleados';
import CrearContratista from './components/CrearContratista';
import ObtenerContratistaT from './components/Contratistas';
import EditarContratista from './components/EditarContratista';
import ObtenerUSuarioT from './components/UsuarioRh';
import CrearUsuario from './components/CrearUsuario';



function App() {
  return (
    <Router>
        <Nav></Nav>
        <Route path='/' exact component={Login}/>
        <Route path='/crear/empleado' component={CrearEmpleado}/>
        <Route path='/editar/empleado' component={EditarEmpleado}/>
        <Route path='/VerEmpleados' component={ObtenerEmpleadosT}/>
        <Route path='/crear/contratista' component={CrearContratista}/>
        <Route path='/VerContratista' component={ObtenerContratistaT}/>
        <Route path='/editar/contratista' component={EditarContratista}/>
        <Route path='/VerUsuario' component={ObtenerUSuarioT}/>
        <Route path='/crear/usuario' component={CrearUsuario}/>
    </Router>
  );
}

export default App;
