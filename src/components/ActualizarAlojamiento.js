import React, { useState } from 'react';
import './ActualizarAlojamiento.css';

const ActualizarAlojamiento = ({ hotel, onClose, onUpdateHotel }) => {
  const [formData, setFormData] = useState({
    name: hotel.name,
    price: hotel.price,
    estado: hotel.estado,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateHotel({ ...hotel, ...formData });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Actualizar Alojamiento</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Título</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="price">Precio por Día</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          />
          <button type="submit">Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default ActualizarAlojamiento;
