import React, { useEffect } from 'react';
import { Overlay, ModalContainer } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal_root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  });

  const hendleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleOverlay = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleOverlay}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
