import React from 'react';
import ObtenerCiudad from './NewObtenerCiudad';

const HotelList = ({ hotels, onDeleteHotel, onOpenModal }) => {
  return (
    <div className="hotel-list">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="hotel-card">
          <h2>{hotel.name}</h2>
          <p>
            Ciudad: <ObtenerCiudad latitud={hotel.latitud} longitud={hotel.longitud} />
          </p>
          <p>Precio: ${hotel.price}</p>
          <p>Estado: {hotel.estado}</p>
          <button onClick={() => onDeleteHotel(hotel.id)}>Eliminar</button>
          <button onClick={() => onOpenModal(hotel)}>Actualizar</button>
        </div>
      ))}
    </div>
  );
};

export default HotelList;
