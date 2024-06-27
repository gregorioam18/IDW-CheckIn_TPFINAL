import React, { useState } from 'react';
import ObtenerCiudad from './NewObtenerCiudad';
import ModalUser from './ModalUser';
import './HotelListUser.css';

const HotelListUser = ({ hotels }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleViewMore = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
    setCurrentImageIndex(0); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHotel(null);
  };

  const showNextImage = () => {
    if (selectedHotel && selectedHotel.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedHotel.images.length);
    }
  };

  const showPreviousImage = () => {
    if (selectedHotel && selectedHotel.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedHotel.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="hotel-list">
      {hotels.map((hotel) => (
        <div key={hotel.id} className="hotel-card">
          <img src={hotel.images[0]} alt={hotel.name} className="hotel-image" />
          <h2>{hotel.name}</h2>
          <p>
            Ciudad: <ObtenerCiudad latitud={hotel.latitud} longitud={hotel.longitud} />
          </p>
          <p>Precio: ${hotel.price}</p>
          <p>Estado: {hotel.estado}</p>
          <p>Servicios: {hotel.services.join(', ')}</p> {/* Mostrar servicios a solucionar*/}
          <button onClick={() => handleViewMore(hotel)}>Ver más</button>
        </div>
      ))}
      {isModalOpen && selectedHotel && (
        <ModalUser onClose={closeModal}>
          <h2>{selectedHotel.name}</h2>
          <p>
            Ciudad: <ObtenerCiudad latitud={selectedHotel.latitud} longitud={selectedHotel.longitud} />
          </p>
          <p>Precio: ${selectedHotel.price}</p>
          <p>Estado: {selectedHotel.estado}</p>
          <p>Descripción: {selectedHotel.description}</p>
          <p>Dormitorios: {selectedHotel.bedrooms}</p>
          <p>Baños: {selectedHotel.bathrooms}</p>
          <p>Servicios: {selectedHotel.services.join(', ')}</p> {/* Mostrar servicios a solucionar*/}
          {selectedHotel.images && selectedHotel.images.length > 0 && (
            <div className="modal-image-slider">
              <button className="prev" onClick={showPreviousImage}>&#10094;</button>
              <img
                src={selectedHotel.images[currentImageIndex]}
                alt={`Hotel ${currentImageIndex + 1}`}
                className="modal-image"
              />
              <button className="next" onClick={showNextImage}>&#10095;</button>
            </div>
          )}
          <button onClick={closeModal}>Cerrar</button>
        </ModalUser>
      )}
    </div>
  );
};

export default HotelListUser;
