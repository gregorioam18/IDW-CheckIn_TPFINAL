import Navbar from '../components/Navbar.js';
import Hero from '../components/Hero.js';
import Footer from '../components/Footer.js';
import QuienesSomos from '../components/QuienesSomos.js';

function Nosotros (){
    return(
        <>
        <Navbar />
        <Hero 
        cName="hero-mid"
        heroImg="https://i.postimg.cc/qqBp3KdY/heather-gill-Wlhfy-AHmp-II-unsplash.jpg"
        title="¿Quienes somos?"
        btnClass="hide"
        />
        <QuienesSomos/>
        <Footer/>
     </>    
    )
}

export default Nosotros;