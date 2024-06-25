import React, { useEffect, useState } from 'react';

const ObtenerCiudad = ({ latitud, longitud }) => {
  const [ciudad, setCiudad] = useState('');

  useEffect(() => {
    const obtenerCiudad = async () => {
      const apiKey = 'e98bddb6c592457fbf85fae6b0ac704e';
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitud}+${longitud}&key=${apiKey}&language=es&pretty=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results[0] && data.results[0].components) {
          setCiudad(data.results[0].components.city || 'Desconocida');
        } else {
          setCiudad('Desconocida');
        }
      } catch (error) {
        console.error('Error fetching city:', error);
        setCiudad('Error');
      }
    };

    obtenerCiudad();
  }, [latitud, longitud]);

  return <span>{ciudad}</span>;
};

export default ObtenerCiudad;
