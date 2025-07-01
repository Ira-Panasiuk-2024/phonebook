import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HiUser, HiMail } from 'react-icons/hi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdWork, MdHome, MdPerson, MdStar, MdStarBorder } from 'react-icons/md';

import EditForm from '../EditForm/EditForm';
import ContactDeleteModal from '../ContactDeleteModal/ContactDeleteModal';
import css from './Contact.module.css';
import {
  deleteContactOperation,
  editContactOperation,
} from '../../redux/contacts/operations';

const Contact = ({
  _id,
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
}) => {
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
    dispatch(deleteContactOperation(_id));
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getContactTypeIcon = type => {
    switch (type) {
      case 'work':
        return <MdWork size={22} color="grey" />;
      case 'home':
        return <MdHome size={22} color="grey" />;
      case 'personal':
        return <MdPerson size={22} color="grey" />;
      default:
        return null;
    }
  };

  return (
    <div className={css.item}>
      {isEditing ? (
        <EditForm
          contact={{ _id, name, phoneNumber, email, isFavourite, contactType }}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className={css.infoBox}>
            <p className={css.text}>
              <HiUser size={22} color="grey" />
              {name}
            </p>

            <p className={css.text}>
              <BsFillTelephoneFill size={22} color="grey" />
              {phoneNumber}
            </p>

            {email && (
              <p className={css.text}>
                <HiMail size={22} color="grey" />
                {email}
              </p>
            )}

            {contactType && (
              <p className={css.text}>
                {getContactTypeIcon(contactType)}
                {contactType.charAt(0).toUpperCase() +
                  contactType.slice(1)}{' '}
              </p>
            )}

            <p className={css.text}>
              {isFavourite ? (
                <MdStar size={22} color="gold" />
              ) : (
                <MdStarBorder size={22} color="grey" />
              )}
              {isFavourite ? 'Favourite' : 'Not Favourite'}
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
};

export default Contact;
