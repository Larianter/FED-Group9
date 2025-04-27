import React from 'react';

// Inline CSS styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const contentStyle = {
  background: '#3b2d2b',
  padding: '20px',
  borderRadius: '10px',
  width: '280px',
  maxHeight: '90%',
  overflowY: 'auto',
  boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
  color: 'white',
};

function Popup({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Popup;