import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function ObtenerEmpleadosT() {
  const [empleados, setEmpleados] = useState([]);
  

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    const token = sessionStorage.getItem("token");
    const respuesta = await Axios.get("http://localhost:4000/obtener", {
      headers: { autorizacion: "bearer " + token },
    });
    console.log(respuesta.data);
    if (respuesta.data.length > 0) {
      setEmpleados(respuesta.data);
      
    } 
  };

  const crearEmpleado =() =>{
    window.location.href = '/crear/empleado';
  }
  const editarEmpleado = (id) => {
    sessionStorage.setItem("ideditar", id);
    window.location.href = "/editar/empleado";
  };

  const eliminarEmpleado = async (id) => {
    const token = sessionStorage.getItem("token");
    const respuesta = await Axios.delete(
      "http://localhost:4000/eliminar/" + id,
      {
        headers: { autorizacion: "bearer " + token },
      }
    );
    obtenerEmpleados();
    const mensaje = respuesta.data.mensaje;
    Swal.fire({
      icon: "success",
      text: mensaje,
      showConfirmButton: false,
    });
    setTimeout(() => {
      window.location.href = "/VerEmpleados";
    }, 2500);
  };

  return (
    <body>
        <div className="container-fluid">
        <aside className="barra-lateral" >
          <h3 className="text-light  text-center my-5">Bienvenido</h3>
  
          <ul className="nav flex-column mt-5">
            
            <li className="nav-item bg-success">
              <a
                href="/VerEmpleados"
                className="nav-link text-light d-flex align-items-center"
              >
                <i class="fas fa-briefcase"></i>
                <span>  Empleados</span>
              </a>
            </li>
            <li className="nav-item bg-primary">
              <a
                href="/VerContratista"
                className="nav-link text-light d-flex align-items-center"
              >
                
              <i class="fas fa-hard-hat"></i>
              <span>  Contratistas</span>
              </a>
            </li>
            <li className="nav-item bg-warning">
              <a
                href="/VerUsuario"
                className="nav-link text-light d-flex align-items-center"
              >
              <i class="fas fa-key"></i>
              <span>  Usuarios RH</span>
              </a>
            </li>
          </ul>
        </aside>
      <main className="pt-4">
        <div className="container">
          <h2 className="text-center mb-4">Panel Administrativo</h2>
          <div className="row text-center panel justify-content-center align-middle">
            <div className="col-lg-3 col-md-4 col-12 ">
              <div className="boton bg-success d-flex align-items-center justify-content-center" onClick={() => crearEmpleado()}>
                <a href="#" className="text-light">
                  <i class="fas fa-user-plus"> Add</i>
                </a>
              </div>
            </div>
          </div>

          <div className="card-header">
          
            <h4>Empleados</h4>
          </div>
          <div className="table-responsive">
          <table className="table">
            <caption>Listado Actualizado...</caption>
            <thead className="thead-dark" >
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Tipo de Contrato</th>
                <th>Direccion</th>
                <th>Email</th>
                <th>Fecha Nacimiento</th>
                <th>Identificacion</th>
                <th>Detalles</th>
              </tr>
            </thead>
            {empleados.map((empleado, i) => (
              <tbody key={empleado._id}>
                <tr>
                  <td>{i + 1}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.tipoContrato}</td>
                  <td>{empleado.direccion}</td>
                  <td>{empleado.email}</td>
                  <td>{empleado.fechaNacimiento}</td>
                  <td>{empleado.identificacion}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => editarEmpleado(empleado._id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger p-0 "
                      onClick={() => eliminarEmpleado(empleado._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          </div>
          
        </div>
      </main>

        </div>

    </body>
  );
}
