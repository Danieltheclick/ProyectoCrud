import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export default function EditarEmpleado() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [contratista, setContratista] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const idnota = sessionStorage.getItem("ideditar");
    
    Axios.get("http://localhost:4000/obtener/" + idnota, {
      headers: { autorizacion: "bearer " + token },
    }).then((respuesta) => {
      
      setNombre(respuesta.data.nombre);
      setApellido(respuesta.data.apellido);
      setTipoContrato(respuesta.data.tipoContrato);
      setDireccion(respuesta.data.direccion);
      setEmail(respuesta.data.email);
      setFechaNacimiento(respuesta.data.fechaNacimiento);
      setIdentificacion(respuesta.data.identificacion);
      setContratista(respuesta.data.contratista);
    });
  }, []);

  const guardarEmpleado = async (e) => {
    e.preventDefault();
    const empleadoNuevo = {
      nombre,
      apellido,
      tipoContrato,
      direccion,
      email,
      fechaNacimiento,
      identificacion,
      contratista,
    };
    const token = sessionStorage.getItem("token");
    const idnota = sessionStorage.getItem("ideditar");
    const respuesta = await Axios.put(
      "http://localhost:4000/actualizar/" + idnota,
      empleadoNuevo,
      {
        headers: { 'autorizacion': "bearer " + token },
      }
    );
    const mensaje = respuesta.data.mensaje;
    Swal.fire({
      icon: "success",
      text: mensaje,
      showConfirmButton: false,
    });
    sessionStorage.removeItem("ideditar");
    setTimeout(() => {
      window.location.href = "/VerEmpleados";
    }, 1500);
  };

  return (
    <div className="container text-center">
      <div className="col-md-8 pt-4 mx-auto">
        <div className="card card-body">
          <h3>Editar</h3>
          <form onSubmit={guardarEmpleado}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={tipoContrato}
                onChange={(e) => setTipoContrato(e.target.value)}
                placeholder="Tipo de Contrato"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Direccion"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="Date"
                className="form-control"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                placeholder="Fecha de nacimiento"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="Number"
                className="form-control"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                placeholder="Identificacion"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={contratista}
                onChange={(e) => setContratista(e.target.value)}
                placeholder="Contratista"
                required
              />
            </div>
            <button className="submit" className="btn btn-info">
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
