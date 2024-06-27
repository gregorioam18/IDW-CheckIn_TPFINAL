import React from 'react';
import './FooterStyles.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className='top'>
        <div>
          <h1>IDW - Checkin</h1>
          <p>Reserva con confianza, descansa con tranquilidad</p>
        </div>
        <div>
          <a href='/'>
            <i className="fa-brands fa-facebook-square"></i>
          </a>
          <a href='/'>
            <i className="fa-brands fa-instagram-square"></i>
          </a>
          <a href='/'>
            <i className="fa-brands fa-twitter-square"></i>
          </a>
        </div>
      </div>

      <div className='bottom'>
        <div>
          <h4>Project</h4>
          <a href='/'>Registro de cambios</a>
          <a href='/'>Texto aqui</a>
          <a href='/'>Texto aqui</a>
          <a href='/'>Texto aqui</a>
        </div>
        <div>
          <h4>Project</h4>
          <a href='/'>Registro de cambios</a>
          <a href='/'>Texto aqui</a>
          <a href='/'>Texto aqui</a>
          <a href='/'>Texto aqui</a>
        </div>
        <div>
          <h4>Project</h4>
          <a href='/'>Registro de cambios</a>
          <a href='/'>Texto aqui</a>
          <a href='/'>Texto aqui</a>
          <a href='/'>Texto aqui</a>
        </div>
        <div>
          <h4>Project</h4>
          <a href='/'>Registro de cambios</a>
          <a href='/'>Texto aqui</a>
          <a href='/'>Texto aqui</a>
          <a href='/'>Texto aqui</a>
        </div>
      </div>

      <div className='copyright'>
        <p>&copy; 2024 por Gregorio Alejandro Martin - TUDW</p>
      </div>
    </div>
  );
}

export default Footer;
