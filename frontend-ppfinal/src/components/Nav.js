import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setMenu(true);
    }
  }, []);

  const salir = () => {
    sessionStorage.clear(true);
    setMenu(false);
  };

  return (
    <React.Fragment>
      <nav className="navbar bd-navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/VerEmpleados">
          Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-3">
              <Link className="nav-item nav-link">
                <i className="fas fa-user"></i>Bienvenido {sessionStorage.getItem('nombre')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-item nav-link" to="/" onClick={() => salir()}>
                <i class="fas fa-sign-out-alt"></i> Salir
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}
