import React, { useState, useEffect } from 'react';
import './HotelCard.css';
import obtenerCiudadCoordenadas from '../components/obtenerCiudadCoordenadas'; // Asegúrate de que la ruta sea correcta

const HotelCard = ({ hotel, onDeleteHotel, onUpdateHotel }) => {
  const [ciudad, setCiudad] = useState('');

  useEffect(() => {
    async function fetchCity() {
      try {
        const city = await obtenerCiudadCoordenadas(hotel.latitud, hotel.longitud);
        setCiudad(city);
      } catch (error) {
        console.error('Error fetching city:', error);
      }
    }

    fetchCity();
  }, [hotel.latitud, hotel.longitud]);

  const handleUpdate = () => {
    const updatedHotel = {
      ...hotel,
      name: 'Título actualizado', // Asumiendo que 'name' debería ser el título actualizado
      price: hotel.price + 10, // Asumiendo que 'price' es el precio por día
      // No modificamos 'rating' en esta parte si decidimos quitarlo
    };
    onUpdateHotel(hotel.id, updatedHotel);
  };

  return (
    <div className="hotel-card">
      <h2>{hotel.name}</h2>
      <p>{ciudad ? `Ciudad: ${ciudad}` : 'Ciudad no disponible'}</p>
      <p>Price: ${hotel.price}</p>
      <div className="hotel-images">
        {hotel.images && hotel.images.length > 0 ? (
          hotel.images.map((image) => (
            <img key={image.id} src={image.url} alt={`Hotel ${hotel.name}`} />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      <button onClick={() => onDeleteHotel(hotel.id)}>Eliminar</button>
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

export default HotelCard;
