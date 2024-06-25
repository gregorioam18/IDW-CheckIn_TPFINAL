import Navbar from './components/Navbar.js';
import './styles.css';
import {Route, Routes} from "react-router-dom";
import Inicio from "./routes/Inicio";
import Nosotros from "./routes/Nosotros";
import Contacto from "./routes/Contacto";
import Servicios from "./routes/AlojamientosUser.js";
import Login from "./routes/LoginRoute.js";
import Signup from "./routes/Signup";
import GestiondeAlojamientos from './components/GestiondeAlojamientos';
import RegistrarAlojamiento from './components/RegistrarAlojamiento.js';
import AdministradordeImagenes from './components/AdministradordeImagenes.js'; 
import GestorTipoAlojamiento from './components/GestorTipoAlojamiento.js';
import GestorServicios from './components/GestorServicios.js';
import GestionAlojamientosServicios from './components/GestionAlojamientosServicios';


function App() {
  return (
    <div className="App">
        {<Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/Nosotros" element={<Nosotros/>}/>
          <Route path="/alojamientosUser" element={<Servicios/>}/>
          <Route path="/Contacto" element={<Contacto/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/gestion-de-alojamientos" element={<GestiondeAlojamientos />} />
          <Route path="/registrar-alojamiento" element={<RegistrarAlojamiento />} />
          <Route path="/administrador-imagenes" element={<AdministradordeImagenes />} />
          <Route path="/gestor-tipo-alojamiento" element={<GestorTipoAlojamiento />} />
          <Route path="/gestor-servicios" element={<GestorServicios />} />
          <Route path="/gestion-alojamientos-servicios" element={<GestionAlojamientosServicios />} />
        </Routes>}
    </div>
  );
}

export default App;
