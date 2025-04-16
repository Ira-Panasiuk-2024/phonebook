import { useSelector, useDispatch } from 'react-redux';
import {
  deleteContactOperation,
  editContactOperation,
} from '../../redux/contacts/operations';

import { selectVisibleContacts } from '../../redux/filters/selectors';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <li className={css.item} key={contact.id}>
          <Contact
            {...contact}
            onDelete={() => dispatch(deleteContactOperation(contact.id))}
            onEdit={updatedContact =>
              dispatch(editContactOperation(updatedContact))
            }
          />
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
