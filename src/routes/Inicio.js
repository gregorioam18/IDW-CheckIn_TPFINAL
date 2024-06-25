import Navbar from '../components/Navbar.js';
import Hero from '../components/Hero.js';
import Footer from '../components/Footer.js';

function Inicio (){
    return(
     <>
        <Navbar />
        <Hero 
        cName="hero"
        heroImg="https://i.postimg.cc/85tH18kv/marten-bjork-n-IKQDCyr-G0-unsplash.jpg"
        title="Reserva con confianza, descansa con tranquilidad"
        text="Encontra tu alojamiento ideal"
        buttonText="Reserva"
        url="/Hoteles"
        btnClass="show"
        />


        <Footer/>
     </>   
    )
}

export default Inicio;