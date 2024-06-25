import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelList from './HotelList';
import Sidebar from './Sidebar';
import ActualizarAlojamiento from './ActualizarAlojamiento';
import './GestiondeAlojamientos.css';

const GestiondeAlojamientos = ({ role }) => {
  const navigate = useNavigate();
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHoteles();
  }, []);

  const fetchHoteles = async () => {
    try {
      const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
      const data = await response.json();
      const formattedHotels = data.map((hotel) => ({
        id: hotel.idAlojamiento,
        name: hotel.Titulo,
        latitud: hotel.Latitud,
        longitud: hotel.Longitud,
        price: hotel.PrecioPorDia,
        images: hotel.imagenes || [],
        description: hotel.Descripción,
        bedrooms: hotel.CantidadDormitorios,
        bathrooms: hotel.CantidadBanios,
        estado: hotel.Estado,
      }));
      setHoteles(formattedHotels);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setLoading(false);
    }
  };

  const handleDeleteHotel = async (id) => {
    try {
      // Eliminar imágenes del alojamiento
      await deleteHotelImages(id);

      // Eliminar el alojamiento
      await fetch(`http://localhost:3001/alojamiento/deleteAlojamiento/${id}`, {
        method: 'DELETE',
      });
      setHoteles(hoteles.filter((hotel) => hotel.id !== id));
    } catch (error) {
      console.error('Error deleting hotel or images:', error);
    }
  };

  const deleteHotelImages = async (hotelId) => {
    try {
      // Obtener todas las imágenes
      const response = await fetch('http://localhost:3001/imagen/getAllImagenes');
      const images = await response.json();

      // Filtrar las imágenes que pertenecen al alojamiento
      const hotelImages = images.filter((image) => image.idAlojamiento === hotelId);

      // Eliminar cada imagen
      for (const image of hotelImages) {
        await fetch(`http://localhost:3001/imagen/deleteImagen/${image.idImagen}`, {
          method: 'DELETE',
        });
      }
    } catch (error) {
      console.error('Error deleting hotel images:', error);
      throw error; // Lanza el error para detener el proceso si la eliminación de una imagen falla
    }
  };

  const handleOpenModal = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHotel(null);
  };

  const handleUpdateHotel = async (updatedHotel) => {
    try {
      const response = await fetch(`http://localhost:3001/alojamiento/putAlojamiento/${updatedHotel.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Titulo: updatedHotel.name,
          PrecioPorDia: updatedHotel.price,
          Estado: updatedHotel.estado,
        }),
      });
      if (response.ok) {
        setHoteles(hoteles.map((hotel) => (hotel.id === updatedHotel.id ? updatedHotel : hotel)));
        handleCloseModal();
      } else {
        console.error('Error updating hotel:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
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
        <h1>Bienvenido, {role === 'admin' ? 'Administrador' : 'Administrador de IDW - Checkin'}</h1>
        <div className="hotel-list">
          {loading ? (
            <p>Cargando Hoteles...</p>
          ) : (
            <HotelList
              hotels={hoteles}
              onDeleteHotel={handleDeleteHotel}
              onOpenModal={handleOpenModal}
            />
          )}
        </div>
        {isModalOpen && (
          <ActualizarAlojamiento
            hotel={selectedHotel}
            onClose={handleCloseModal}
            onUpdateHotel={handleUpdateHotel}
          />
        )}
      </main>
    </div>
  );
};

export default GestiondeAlojamientos;
