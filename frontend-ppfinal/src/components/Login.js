import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";


export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const login = async (e) => {
    e.preventDefault(); // para que la pagina no se actualice automaticamente cuando se rellena el formulario
    const usuario = {
      correo,
      contrasena,
    };
    const respuesta = await Axios.post(
      "http://localhost:4000/usuario/login",
      usuario
    ); // Almacenamos la respuesta que nos traiga el localhost
    const mensaje = respuesta.data.mensaje;
    if (mensaje === "Bienvenido") {
      const token = respuesta.data.token;
      const id = respuesta.data.id;
      const nombre = respuesta.data.nombre;
      sessionStorage.setItem("token", token); // crea una variable llama token y se le asigna lo q haya en token
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("nombre", nombre);
      Swal.fire({
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
      });
      //Una vez confirmado el mensaje nos lleva al siguiente archivo
      setTimeout(() => {
        window.location.href = "/VerEmpleados";
      }, 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
  <body className="col-lg-6 col-md-8 mx-auto h-100 login">
    <div className="col-lg-6 col-md-8 mx-auto container h-10">
        <div className="card row h-100 align-items-center justify-content-center">
          <div className="container text-center fa-5x col-md-7">
            <i className="fas fa-user"></i>
          </div>
          <div className="card-header contenido p-5 bg-light text-center bg-primary text-light py-2 text-uppercase">Iniciar Sesión</div>
          <div className="card-boddy m-2">
            <form onSubmit={login} className="mt-4">
              <div className="form-group">
                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  placeholder="Correo"
                  required
                  autoFocus
                  onChange={(e) => setCorreo(e.target.value)}
                  value={correo}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="contrasena"
                  className="form-control"
                  placeholder="Contraseña"
                  required
                  autoFocus
                  onChange={(e) => setContrasena(e.target.value)}
                  value={contrasena}
                />
              </div>
              <button type="submit" className="btn btn-info btn-block">
                Aceptar
              </button>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}
