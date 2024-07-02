import Homepage_Navbar  from "../components/Home/Homepage_NavBar";
import Administrador from "../components/Home/Administrador";
import Nosotros from "../components/Home/Nosotros";
import Servicios from "../components/Home/Servicios";
import Contacto from "../components/Home/Contacto";
import { theme } from "../components/pallete";




    export function HomePage() {
      return (
        <div>
          {/* Renderiza el componente Navbar dentro de la HomePage */}
          <Homepage_Navbar/> {/*como esto , ultima linea jeje*/}
          <h1 style={{ textAlign: 'center' }}>Transformando ideas en realidades</h1>
          <Nosotros/>
          <Servicios/>
          <Administrador/>
          
          <Contacto/>

          {/* Agrega más contenido según sea necesario */}
        </div>
      );
    }
    