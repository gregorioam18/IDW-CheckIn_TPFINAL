import React from 'react';
import ReactDOM from 'react-dom';
import './ModalUser.css'; 

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
    document.getElementById('modal-root') 
  );
};

export default ModalUser;