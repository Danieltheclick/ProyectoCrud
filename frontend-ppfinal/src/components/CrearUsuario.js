import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

export default function CrearUsuario() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("id");
  }, []);

 
  const guardarUsuario = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const empleadoNuevo = {
      nombre,
      correo,
      contrasena
    };
    const respuesta = await Axios.post(
      "http://localhost:4000/usuario/registrar",
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
      window.location.href = "/VerUsuario";
    }, 2500);
    
  };

  return (
      
    <div className="container text-center">
      <div className="col-md-8 pt-4 mx-auto">
        <div className="card card-body">
          <h3>Crear Usuario</h3>
          <form onSubmit={guardarUsuario}>
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
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="contrasena"
                required
              />
            </div>
            
            <button className="submit" className="btn btn-info">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
