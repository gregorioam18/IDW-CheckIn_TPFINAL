import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import HotelListUser from '../components/HotelListUser';
import Filter from '../components/Filter';

function Servicios() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotelImages = async () => {
    try {
      const response = await fetch('http://localhost:3001/imagen/getAllImagenes');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching hotel images:', error);
      return [];
    }
  };

  const fetchHotelServices = async (idAlojamiento) => {
    try {
      const response = await fetch(`http://localhost:3001/alojamientosServicios/getAlojamientoServicios/${idAlojamiento}`);
      const data = await response.json();
      return data.map(service => service.idServicio); // Return an array of service IDs
    } catch (error) {
      console.error('Error fetching hotel services:', error);
      return [];
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
      const data = await response.json();
      const allImages = await fetchHotelImages();
      
      const formattedHotels = await Promise.all(
        data.map(async (hotel) => {
          const images = allImages.filter(image => image.idAlojamiento === hotel.idAlojamiento).map(image => image.RutaArchivo);
          const services = await fetchHotelServices(hotel.idAlojamiento);
          const tipoAlojamientoParsed = parseInt(hotel.tipoAlojamiento, 10) || -1; // Assign -1 if invalid
          return {
            id: hotel.idAlojamiento,
            name: hotel.Titulo,
            latitud: hotel.Latitud,
            longitud: hotel.Longitud,
            price: hotel.PrecioPorDia,
            images: images.length > 0 ? images : ['default_image_url.jpg'], // Use default image if no images are found
            description: hotel.Descripcion,
            bedrooms: hotel.CantidadDormitorios,
            bathrooms: hotel.CantidadBanios,
            estado: hotel.Estado,
            tipoAlojamiento: tipoAlojamientoParsed, // Use parsed value
            services: services, // Add services to hotel object
          };
        })
      );

      setHotels(formattedHotels);
      setFilteredHotels(formattedHotels);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleFilterChange = (filters) => {
    console.log('Filters:', filters);

    let filtered = hotels.filter((hotel) => {
      const tipoAlojamientoMatch = !filters.type || parseInt(hotel.tipoAlojamiento, 10) === parseInt(filters.type, 10);
      const disponibilidadMatch = !filters.availability || hotel.estado === filters.availability;
      const priceMatch = (!filters.priceRange.min || hotel.price >= parseFloat(filters.priceRange.min)) &&
                         (!filters.priceRange.max || hotel.price <= parseFloat(filters.priceRange.max));
      const bedroomsMatch = !filters.bedrooms || hotel.bedrooms >= parseInt(filters.bedrooms, 10);
      const bathroomsMatch = !filters.bathrooms || hotel.bathrooms >= parseInt(filters.bathrooms, 10);

      // Log the comparison values
      console.log('Comparing tipoAlojamiento:', hotel.tipoAlojamiento, 'with', parseInt(filters.type, 10));
      console.log('Comparing estado:', hotel.estado, 'with', filters.availability);
      console.log('Comparing price:', hotel.price, 'with range:', filters.priceRange);
      console.log('Comparing bedrooms:', hotel.bedrooms, 'with', filters.bedrooms);
      console.log('Comparing bathrooms:', hotel.bathrooms, 'with', filters.bathrooms);

      return tipoAlojamientoMatch && disponibilidadMatch && priceMatch && bedroomsMatch && bathroomsMatch;
    });

    console.log('Filtered Hotels:', filtered);
    setFilteredHotels(filtered);
  };

  const handleClearFilters = () => {
    setFilteredHotels(hotels);
  };

  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg="https://i.postimg.cc/qqBp3KdY/heather-gill-Wlhfy-AHmp-II-unsplash.jpg"
        title="Alojamientos"
        btnClass="hide"
      />
      <div className="catalog">
        <Filter onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
        {loading ? (
          <p>Cargando Hoteles...</p>
        ) : (
          <HotelListUser hotels={filteredHotels} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default Servicios;
