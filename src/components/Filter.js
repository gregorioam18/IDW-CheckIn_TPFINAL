import React, { useState, useEffect } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange, onClearFilters }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [availability, setAvailability] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  const handleFilterChange = () => {
    onFilterChange({
      type: selectedType,
      availability,
      priceRange,
      bedrooms,
      bathrooms,
    });
  };

  const handleClearFilters = () => {
    setSelectedType('');
    setAvailability('');
    setPriceRange({ min: '', max: '' });
    setBedrooms('');
    setBathrooms('');
    onClearFilters();
  };

  return (
    <div className="filter">
      <h3>Filtrar Alojamientos</h3>
      <div>
        <label>Tipo de Alojamiento:</label>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Seleccione un tipo</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.Descripcion}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Disponibilidad:</label>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="">Seleccione disponibilidad</option>
          <option value="Disponible">Disponible</option>
          <option value="Reservado">Reservado</option>
        </select>
      </div>
      <div>
        <label>Rango de Precios:</label>
        <input
          type="number"
          value={priceRange.min}
          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          placeholder="Mínimo"
        />
        <input
          type="number"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          placeholder="Máximo"
        />
      </div>
      <div>
        <label>Cantidad de Dormitorios:</label>
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </div>
      <div>
        <label>Cantidad de Baños:</label>
        <input
          type="number"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
      </div>
      <div className="filter-buttons">
        <button onClick={handleFilterChange}>Aplicar Filtros</button>
        <button onClick={handleClearFilters}>Limpiar Filtros</button>
      </div>
    </div>
  );
};

export default Filter;
