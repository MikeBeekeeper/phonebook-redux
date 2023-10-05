import css from '../contactList/contactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from 'redux/slice';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const getContacts = (contacts, filterValue) => {
    if (filterValue) {
      const normalazedContact = filterValue.toLowerCase();
      return contacts.filter(contact =>
        contact.userName.toLowerCase().includes(normalazedContact)
      );
    }
    return contacts;
  };

  const visibleContacts = getContacts(contacts, filterValue);

  return (
    <>
      {contacts && (
        <ul className={css.contactList}>
          {visibleContacts.map(({ id, userName, userNumber }) => (
            <li key={id} className={css.contactListItem}>
              <div>
                {userName} : {userNumber}
              </div>
              <button
                type="button"
                className={css.deleteBtn}
                onClick={() => {
                  dispatch(remove(id));
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactList;
