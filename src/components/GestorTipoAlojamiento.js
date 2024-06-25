import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './GestorTipoAlojamiento.css';

const GestorTipoAlojamiento = ({ role }) => {
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTiposAlojamiento();
  }, []);

  const fetchTiposAlojamiento = async () => {
    try {
      const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
      const data = await response.json();
      setTiposAlojamiento(data);
    } catch (error) {
      console.error('Error al obtener los tipos de alojamiento:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:3001/tiposAlojamiento/createTipoAlojamiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Descripcion: descripcion }),
      });
      if (response.ok) {
        setDescripcion('');
        fetchTiposAlojamiento();
      }
    } catch (error) {
      console.error('Error al crear el tipo de alojamiento:', error);
    }
  };

  const handleEdit = (tipo) => {
    setEditando(true);
    setDescripcion(tipo.Descripcion);
    setIdEditar(tipo.idTipoAlojamiento);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tiposAlojamiento/putTipoAlojamiento/${idEditar}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Descripcion: descripcion }),
      });
      if (response.ok) {
        setDescripcion('');
        setEditando(false);
        setIdEditar(null);
        fetchTiposAlojamiento();
      }
    } catch (error) {
      console.error('Error al actualizar el tipo de alojamiento:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/tiposAlojamiento/deleteTipoAlojamiento/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTiposAlojamiento();
      }
    } catch (error) {
      console.error('Error al eliminar el tipo de alojamiento:', error);
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
        <h2>Gestión de Tipos de Alojamiento</h2>
        <div className="form-group">
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del tipo de alojamiento"
            className="form-input"
          />
          <button onClick={editando ? handleUpdate : handleCreate} className="form-button">
            {editando ? 'Actualizar' : 'Crear'}
          </button>
        </div>
        <div className="tipos-alojamiento-lista">
          {tiposAlojamiento.map((tipo) => (
            <div key={tipo.idTipoAlojamiento} className="tipo-alojamiento-item">
              <span>{tipo.Descripcion}</span>
              <button onClick={() => handleEdit(tipo)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(tipo.idTipoAlojamiento)} className="delete-button">Eliminar</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GestorTipoAlojamiento;
