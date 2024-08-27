import React from "react";
import './index.css';

const SuccessModal = ({ showSuccessModal, closeSuccessModal }) => {
  if (!showSuccessModal) return null;

  return (
    <div className="modal-overlay" onClick={closeSuccessModal}>
      <div className="success-modal-container" onClick={(e) => e.stopPropagation()}>
        <img 
          src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1724745899/ancmuz98u3igcyr1dg0n.png" 
          alt="Success" 
          className="success-image"
        />
        <h2 className="success-text">New Task Has Been Created Successfully</h2>
        <button className="back-button" onClick={closeSuccessModal}>Back</button>
      </div>
    </div>
  );
};

export default SuccessModal;
