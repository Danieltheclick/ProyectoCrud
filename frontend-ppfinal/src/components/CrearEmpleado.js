import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export default function CrearEmpleado() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [contratistas, setContratista] = useState([]);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
  }, []);

  const rescontratista = async () => {
    const token = sessionStorage.getItem("token");
    const respuesta = await Axios.get("http://localhost:4000/obtenerct", {
      headers: { autorizacion: "bearer " + token },
    });
    if(respuesta.data.length > 0){
      setContratista(respuesta.data)
    }
  };

  const guardarEmpleado = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const empleadoNuevo = {
      nombre,
      apellido,
      tipoContrato,
      direccion,
      email,
      fechaNacimiento,
      identificacion,
      contratistas 
    };
    const respuesta = await Axios.post(
      "http://localhost:4000/crear",
      empleadoNuevo,
      {
        headers: { autorizacion: "bearer " + token },
      }
    );

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
    <div className="container text-center">
      <div className="col-md-8 pt-4 mx-auto">
        <div className="card card-body">
          <h3>Crear Empleado</h3>
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
                value={contratistas}
                onChange={(e) => setContratista(e.target.value)}
                placeholder="Contratista"
                required
              />
            </div>
            
            {/* <div className="form-group">
              {
                contratistas.map(contratista =>(
                  <select 
                      key = {contratista._id}
                      type="text"
                      className="form-control"
                      value={contratistas}
                      onChange={(e) => setContratista(e.target.value)}
                      placeholder="Contratista"
                      required
                    >
                      <option >
                        {contratista.nombre}
                      </option>
                  </select>

                ))
              }
            </div> */}
            
            <button className="submit" className="btn btn-info">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
