import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './AdministradordeImagenes.css';
import Footer from '../components/Footer2.js';

const AdministradordeImagenes = ({ role }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState('');
  const [alojamientos, setAlojamientos] = useState([]);
  const [selectedAlojamiento, setSelectedAlojamiento] = useState('');
  const [images, setImages] = useState([]);
  const IMGBB_API_KEY = 'fe710239ec2669c60deafe46f166c86d';

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/alojamiento/getAlojamientos');
        setAlojamientos(response.data);
      } catch (error) {
        console.error('Error fetching alojamientos:', error);
      }
    };

    fetchAlojamientos();
  }, []);

  useEffect(() => {
    if (selectedAlojamiento) {
      const fetchImages = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/imagen/getImagenesPorAlojamiento/${selectedAlojamiento}`);
          setImages(response.data);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };

      fetchImages();
    }
  }, [selectedAlojamiento]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAlojamientoChange = (e) => {
    setSelectedAlojamiento(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const uploadRes = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { url } = uploadRes.data.data;
      setUploadedFilePath(url);

      const saveImageRes = await axios.post('http://localhost:3001/imagen/createImagen', {
        idAlojamiento: selectedAlojamiento,
        RutaArchivo: url,
      });

      if (saveImageRes.status === 200) {
        setUploadSuccess(true);
        setImages([...images, { id: saveImageRes.data.id, RutaArchivo: url }]);
      }
    } catch (err) {
      console.error(err);
      setUploadSuccess(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const deleteRes = await axios.delete(`http://localhost:3001/imagen/deleteImagen/${imageId}`);
      if (deleteRes.status === 200) {
        setImages(images.filter(image => image.id !== imageId));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        role={role}
        handleRegistrarAlojamientoClick={() => window.location.href = '/registrar-alojamiento'}
        handleAdministrarImagenesClick={() => window.location.href = '/administrador-imagenes'}
        handleCheckInClick={() => window.location.href = '/'}
        handleGestionAlojamientosClick={() => window.location.href = '/gestion-de-alojamientos'}
        handleTipoAlojamientoClick={() => window.location.href = '/gestor-tipo-alojamiento'}
        handleGestionServiciosClick={() => window.location.href = '/gestor-servicios'}
        handleGestionAlojamientoServiciosClick={() => window.location.href = '/gestion-alojamientos-servicios'}
      />
      <main className="main-content">
        <div className="container">
          <h2>Administrador de Imágenes</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="alojamientoSelect">Seleccione Alojamiento:</label>
              <select id="alojamientoSelect" value={selectedAlojamiento} onChange={handleAlojamientoChange}>
                <option value="">Seleccione un alojamiento</option>
                {alojamientos.map((alojamiento) => (
                  <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                    {alojamiento.Titulo}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fileInput">Seleccione Imagen:</label>
              <input type="file" id="fileInput" onChange={handleFileChange} />
            </div>
            <button type="submit">Subir Imagen</button>
          </form>
          {uploadSuccess && (
            <div className="success-message">
              Imagen subida exitosamente. URL: <a href={uploadedFilePath} target="_blank" rel="noopener noreferrer">{uploadedFilePath}</a>
            </div>
          )}
          <div className="images-list">
            {images.map((image) => (
              <div key={image.id} className="image-item">
                <img src={image.RutaArchivo} alt={`Imagen ${image.id}`} />
                <button onClick={() => handleDeleteImage(image.id)}>Borrar</button>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default AdministradordeImagenes;
