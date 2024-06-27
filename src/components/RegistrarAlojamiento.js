import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarAlojamiento.css'; 
import Sidebar from './Sidebar'; 
import Modal from './Modal'; 
import obtenerCiudadCoordenadas from './obtenerCiudadCoordenadas'; 
import Footer from './Footer2';

const RegistrarAlojamiento = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    location: '', 
    price: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    estado: 'Disponible',
    tipoAlojamiento: '', 
  });
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const { location, ...restFormValues } = formValues;
      const coordinates = await obtenerCiudadCoordenadas(location);

      if (!coordinates) {
        setModalMessage('Error al obtener las coordenadas de la ubicación');
        setIsModalOpen(true);
        return;
      }

      const { latitud, longitud } = coordinates;

      const response = await fetch('http://localhost:3001/alojamiento/createAlojamiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Titulo: formValues.name,
          Descripcion: formValues.description,
          TipoAlojamiento: parseInt(formValues.tipoAlojamiento),
          Latitud: parseFloat(latitud),
          Longitud: parseFloat(longitud),
          TipoAlojamiento: parseInt(formValues.tipoAlojamiento), 
          PrecioPorDia: parseFloat(formValues.price),
          CantidadDormitorios: parseInt(formValues.bedrooms),
          CantidadBanios: parseInt(formValues.bathrooms),
          idTipoAlojamiento: parseInt(formValues.tipoAlojamiento),
        }),
      });

      const data = await response.json();
      console.log('Response status:', response.status); 
      console.log('Response data:', data); 

      if (response.ok) {
        console.log('Alojamiento creado correctamente');
        clearForm();
        // Mostrar modal de éxito
        setModalMessage('Alojamiento creado correctamente');
      } else {
        console.error('Error al crear el alojamiento:', data.message || response.statusText);
        // Mostrar modal de error con detalles del mensaje de error
        setModalMessage(`Error al crear el alojamiento: ${data.message || response.statusText}`);
      }
      setIsModalOpen(true); 
    } catch (error) {
      console.error('Error al crear el alojamiento:', error);
      // Mostrar modal de error
      setModalMessage('Error al crear el alojamiento');
      setIsModalOpen(true);
    }
  };

  const clearForm = () => {
    setFormValues({
      name: '',
      location: '', 
      price: '',
      description: '',
      bedrooms: '',
      bathrooms: '',
      estado: 'Disponible',
      tipoAlojamiento: '',
    });
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
        <div className="registrar-alojamiento">
          <h2>Registrar Alojamiento</h2>
          <form onSubmit={(e) => e.preventDefault()} className="form-container">
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" name="name" value={formValues.name} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Ubicación (Ciudad):</label>
              <input type="text" name="location" value={formValues.location} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Precio:</label>
              <input type="text" name="price" value={formValues.price} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Descripción:</label>
              <textarea name="description" value={formValues.description} onChange={handleChange} className="form-input textarea" />
            </div>
            <div className="form-group">
              <label>Dormitorios:</label>
              <input type="text" name="bedrooms" value={formValues.bedrooms} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Baños:</label>
              <input type="text" name="bathrooms" value={formValues.bathrooms} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Estado:</label>
              <input type="text" name="estado" value={formValues.estado} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Tipo de Alojamiento:</label>
              <select name="tipoAlojamiento" value={formValues.tipoAlojamiento} onChange={handleChange} className="form-input">
                <option value="">Seleccione un tipo de alojamiento</option>
                {tiposAlojamiento.map((tipo) => (
                  <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>
                    {tipo.Descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="button-group">
              <button type="submit" onClick={handleCreate} className="form-button">Registrar</button>
            </div>
          </form>
        </div>
        <Footer />
      </main>
      {isModalOpen && <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} />}
      
    </div>
  );
};

export default RegistrarAlojamiento;
