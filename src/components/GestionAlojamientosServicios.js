import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './GestionAlojamientoServicios.css';
import Footer from '../components/Footer2.js';

const GestionAlojamientoServicios = () => {
  const [alojamientoServicios, setAlojamientoServicios] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [formValues, setFormValues] = useState({ idAlojamiento: '', idServicio: '' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAlojamientos();
    fetchServicios();
    fetchAlojamientoServicios();
  }, []);

  const fetchAlojamientos = async () => {
    try {
      const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
      const data = await response.json();
      setAlojamientos(data);
    } catch (error) {
      console.error('Error al obtener alojamientos:', error);
    }
  };

  const fetchServicios = async () => {
    try {
      const response = await fetch('http://localhost:3001/servicio/getAllServicios');
      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  };

  const fetchAlojamientoServicios = async () => {
    try {
      const response = await fetch('http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios');
      const text = await response.text();  // Get raw response text
      const data = text ? JSON.parse(text) : [];  // Parse only if text is not empty
      if (Array.isArray(data)) {
        const updatedData = await Promise.all(
          data.map(async (alojamientoServicio) => {
            const alojamientoResponse = await fetch(`http://localhost:3001/alojamiento/getAlojamiento/${alojamientoServicio.idAlojamiento}`);
            const alojamientoText = await alojamientoResponse.text();
            const alojamientoData = alojamientoText ? JSON.parse(alojamientoText) : {};
            return {
              ...alojamientoServicio,
              alojamientoTitulo: alojamientoData.Titulo
            };
          })
        );
        setAlojamientoServicios(updatedData);
      } else {
        console.error('Formato de respuesta inesperado:', data);
      }
    } catch (error) {
      console.error('Error al obtener alojamientoServicios:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:3001/alojamientosServicios/createAlojamientoServicio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        fetchAlojamientoServicios();
        setFormValues({ idAlojamiento: '', idServicio: '' });
      }
    } catch (error) {
      console.error('Error al crear alojamientoServicio:', error);
    }
  };

  const handleEdit = (alojamientoServicio) => {
    setFormValues({
      idAlojamiento: alojamientoServicio.idAlojamiento,
      idServicio: alojamientoServicio.idServicio,
    });
    setEditing(true);
    setCurrentId(alojamientoServicio.idAlojamientoServicio);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/alojamientosServicios/updateAlojamientoServicio/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        fetchAlojamientoServicios();
        setFormValues({ idAlojamiento: '', idServicio: '' });
        setEditing(false);
        setCurrentId(null);
      }
    } catch (error) {
      console.error('Error al actualizar alojamientoServicio:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchAlojamientoServicios();
      }
    } catch (error) {
      console.error('Error al eliminar alojamientoServicio:', error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        role="admin"
        handleRegistrarAlojamientoClick={() => navigate('/registrar-alojamiento')}
        handleAdministrarImagenesClick={() => navigate('/administrador-imagenes')}
        handleCheckInClick={() => navigate('/')}
        handleGestionAlojamientosClick={() => navigate('/gestion-de-alojamientos')}
        handleTipoAlojamientoClick={() => navigate('/gestor-tipo-alojamiento')}
        handleGestionServiciosClick={() => navigate('/gestor-servicios')}
        handleGestionAlojamientoServiciosClick={() => navigate('/gestion-alojamientos-servicios')}
      />
      <main className="main-content">
        <h2>Gestión de Alojamientos y Servicios</h2>
        <form onSubmit={(e) => e.preventDefault()} className="form-container">
          <div className="form-group">
            <label>Alojamiento:</label>
            <select name="idAlojamiento" value={formValues.idAlojamiento} onChange={handleChange}>
              <option value="">Seleccione un alojamiento</option>
              {alojamientos.map((alojamiento) => (
                <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                  {alojamiento.Titulo}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Servicio:</label>
            <select name="idServicio" value={formValues.idServicio} onChange={handleChange}>
              <option value="">Seleccione un servicio</option>
              {servicios.map((servicio) => (
                <option key={servicio.idServicio} value={servicio.idServicio}>
                  {servicio.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="button-group">
            {editing ? (
              <button type="button" onClick={handleUpdate} className="form-button">
                Actualizar
              </button>
            ) : (
              <button type="button" onClick={handleCreate} className="form-button">
                Crear
              </button>
            )}
          </div>
        </form>
        <table className="servicios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Alojamiento</th>
              <th>Servicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alojamientoServicios.map((alojamientoServicio) => (
              <tr key={alojamientoServicio.idAlojamientoServicio}>
                <td>{alojamientoServicio.idAlojamientoServicio}</td>
                <td>{alojamientoServicio.idAlojamiento} - {alojamientoServicio.alojamientoTitulo}</td>
                <td>{alojamientoServicio.idServicio}</td>
                <td>
                  <button onClick={() => handleEdit(alojamientoServicio)} className="edit-button">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(alojamientoServicio.idAlojamientoServicio)} className="delete-button">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Footer />
      </main>
      
    </div>
  );
};

export default GestionAlojamientoServicios;
