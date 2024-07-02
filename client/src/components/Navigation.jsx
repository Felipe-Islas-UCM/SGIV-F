import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div>
      <Link to='/servicios'>
        <h1> Servicio App </h1>
      </Link>
      <Link to="/servicios-create"> Crear Servicio </Link>
    </div>
  )
}
