import React from 'react';
import ReactDOM from 'react-dom';
import './ModalUser.css'; // Asegúrate de tener algunos estilos para el modal

const ModalUser = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Asegúrate de tener un div con id 'modal-root' en tu index.html
  );
};

export default ModalUser;