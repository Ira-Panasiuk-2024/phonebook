import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HiUser  } from 'react-icons/hi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import EditForm from '../EditForm/EditForm';
import ContactDeleteModal from '../ContactDeleteModal/ContactDeleteModal';
import css from './Contact.module.css';
import {
  deleteContactOperation,
  editContactOperation,
} from '../../redux/contacts/operations';

function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = updatedContact => {
    dispatch(editContactOperation(updatedContact));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteContactOperation(id));
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.item}>
      {isEditing ? (
        <EditForm
          contact={{ id, name, number }}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className={css.box}>
            <p className={css.text}>
              <HiUser  size={22} color="grey" />
              {name}
            </p>
            <p className={css.text}>
              <BsFillTelephoneFill size={22} color="grey" />
              {number}
            </p>
          </div>

          <div className={css.wrap}>
            <button className={css.btn} type="button" onClick={handleEdit}>
              Edit
            </button>

            <button className={css.btn} type="button" onClick={openModal}>
              Delete
            </button>
          </div>
        </>
      )}

      <ContactDeleteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Contact;