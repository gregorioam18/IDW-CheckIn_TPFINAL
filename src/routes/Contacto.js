import Navbar from '../components/Navbar.js';
import Hero from '../components/Hero.js';
import Footer from '../components/Footer.js';
import ContactForm from '../components/ContactForm.js';

function Contacto (){
    return(
        <>
        <Navbar />
        <Hero 
        cName="hero-mid"
        heroImg="https://i.postimg.cc/QNRwsqKM/kaleb-tapp-J59w-WPn09-BE-unsplash.jpg"
        title="Contactanos"
        btnClass="hide"
        />
        <ContactForm/>
        <Footer/>
     </> 
    )
}

export default Contacto;