import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export default function EditarContratista() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const idnota = sessionStorage.getItem("ideditar");
    
    Axios.get("http://localhost:4000/obtenerct/" + idnota, {
      headers: { autorizacion: "bearer " + token },
    }).then((respuesta) => {
      
      setNombre(respuesta.data.nombre);
      setApellido(respuesta.data.apellido);
      setIdentificacion(respuesta.data.identificacion);
      setEmail(respuesta.data.email);
      setEmpresa(respuesta.data.empresa);
    });
  }, []);

  const guardarContratista = async (e) => {
    e.preventDefault();
    const contratistaNuevo = {
      nombre,
      apellido,
      email,
      identificacion,
    };
    const token = sessionStorage.getItem("token");
    const idnota = sessionStorage.getItem("ideditar");
    const respuesta = await Axios.put(
      "http://localhost:4000/actualizarct/" + idnota,
      contratistaNuevo,
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
      window.location.href = "/VerContratista";
    }, 1500);
  };

  return (
    <div className="container text-center">
      <div className="col-md-8 pt-4 mx-auto">
        <div className="card card-body">
          <h3>Editar</h3>
          <form onSubmit={guardarContratista}>
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
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="empresa"
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
