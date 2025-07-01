import { useSelector, useDispatch } from 'react-redux';

import {
  deleteContactOperation,
  editContactOperation,
} from '../../redux/contacts/operations';

import { selectContacts } from '../../redux/contacts/selectors';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <li className={css.item} key={contact._id}>
          <Contact
            {...contact}
            onDelete={() => dispatch(deleteContactOperation(contact._id))}
            onEdit={updatedContact =>
              dispatch(editContactOperation(updatedContact))
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
