import React, { useState } from 'react';
import Modal from 'react-modal'; 

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
export const CalendarModal = () => {
  const [modalIsOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    console.log('closeee')
    setIsOpen(false)
  }


  return (
    <Modal
      isOpen={ modalIsOpen }
      // onAfterOpen={afterOpenModal}
      onRequestClose={ closeModal }
      closeTimeoutMS={ 200 }
      style={ customStyles }
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>Hello world</h1>
      <p>This is a paragraph</p>
    </Modal>
  );
};
