import React from 'react';
import Modal from 'react-modal';
import css from './ContactDeleteModal.module.css';

Modal.setAppElement('#root');

function ContactDeleteModal({ isOpen, onRequestClose, onDelete }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Delete"
      className={css.modal}
      overlayClassName={css.overlay}
    >
        <h2 className={css.modalTitle}>Confirm Delete</h2>
        <p className={css.modalText}>Are you sure you want to delete this contact?</p>
        <div className={css.modalBox}>
            <button className={css.btnDelete} onClick={onDelete}>Yes, Delete</button>
            <button className={css.btnCancel} onClick={onRequestClose}>Cancel</button>
        </div>
    </Modal>
  );
}

export default ContactDeleteModal;