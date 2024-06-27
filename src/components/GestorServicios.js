import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import './GestorServicios.css';

const GestorServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [formValues, setFormValues] = useState({ id: '', nombre: '' });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    try {
      const response = await fetch('http://localhost:3001/servicio/getAllServicios');
      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:3001/servicio/createServicio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Nombre: formValues.nombre }),
      });

      if (response.ok) {
        fetchServicios();
        setFormValues({ id: '', nombre: '' });
      }
    } catch (error) {
      console.error('Error al crear el servicio:', error);
    }
  };

  const handleEdit = (servicio) => {
    setFormValues({ id: servicio.idServicio, nombre: servicio.Nombre });
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/servicio/updateServicio/${formValues.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Nombre: formValues.nombre }),
      });

      if (response.ok) {
        fetchServicios();
        setFormValues({ id: '', nombre: '' });
        setEditing(false);
      }
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/servicio/deleteServicio/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServicios(servicios.filter(servicio => servicio.idServicio !== id));
      }
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
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
        handleGestionAlojamientoServiciosClick={() => navigate('/gestion-alojamientos-servicios')} // Pasar la función
      />
      <main className="main-content">
        <div className="gestionar-servicios">
          <h2>Gestionar Servicios</h2>
          <form onSubmit={(e) => e.preventDefault()} className="form-container">
            <div className="form-group">
              <label>Nombre del Servicio:</label>
              <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} className="form-input" />
            </div>
            <div className="button-group">
              {editing ? (
                <button type="button" onClick={handleUpdate} className="form-button">Actualizar</button>
              ) : (
                <button type="button" onClick={handleCreate} className="form-button">Crear</button>
              )}
            </div>
          </form>
          <table className="servicios-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio.idServicio}>
                  <td>{servicio.idServicio}</td>
                  <td>{servicio.Nombre}</td>
                  <td>
                    <button onClick={() => handleEdit(servicio)} className="edit-button">Editar</button>
                    <button onClick={() => handleDelete(servicio.idServicio)} className="delete-button">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GestorServicios;
