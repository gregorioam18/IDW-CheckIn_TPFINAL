import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = ({ 
  role, 
  handleRegistrarAlojamientoClick, 
  handleAdministrarImagenesClick, 
  handleCheckInClick, 
  handleGestionAlojamientosClick, 
  handleTipoAlojamientoClick,
  handleGestionServiciosClick,
  handleGestionAlojamientoServiciosClick 
}) => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <button className="checkin-button" onClick={handleCheckInClick}>
        IDW - CheckIn
      </button>
      <h2>Gestión de Alojamientos</h2>
      <nav>
        <ul>
          <li>
            <button className="registrar-button" onClick={handleRegistrarAlojamientoClick}>
              Registrar Alojamiento
            </button>
          </li>
          <li>
            <button className="administrar-imagenes-button" onClick={handleAdministrarImagenesClick}>
              Administrar Imágenes
            </button>
          </li>
          <li>
            <button className="gestion-alojamientos-button" onClick={handleGestionAlojamientosClick}>
              Gestionar Alojamientos
            </button>
          </li>
          <li>
            <button className="tipo-alojamiento-button" onClick={handleTipoAlojamientoClick}>
              Gestor Tipo Alojamiento
            </button>
          </li>
          <li>
            <button className="gestion-servicios-button" onClick={handleGestionServiciosClick}>
              Gestionar Servicios
            </button>
          </li>
          <li>
            <button className="gestion-alojamiento-servicios-button" onClick={handleGestionAlojamientoServiciosClick}>
              Alojamiento Servicios
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
