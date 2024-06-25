const obtenerCiudadCoordenadas = async (ciudad) => {
  const apiKey = 'e98bddb6c592457fbf85fae6b0ac704e';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${ciudad}&key=${apiKey}&language=es&pretty=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener los datos de la API');
    }
    const data = await response.json();
    if (data.results && data.results[0] && data.results[0].geometry) {
      return {
        latitud: data.results[0].geometry.lat,
        longitud: data.results[0].geometry.lng
      };
    } else {
      throw new Error('No se pudo encontrar la ubicación en los datos de la API');
    }
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    return null;
  }
};

export default obtenerCiudadCoordenadas;
