import css from './App.module.css';
import ContactForm from './contactForm/contactForm.js';
import Filter from './filter/filter.js';
import ContactList from './contactList/contactList.js';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);
console.log(contacts)
  return (
    <>
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm />

        {contacts?.length > 0 && (
          <div className={css.contactsWrapper}>
            <h2>Contacts</h2>
            <p>Total quantity of your contacts: {contacts?.length}</p>
            <Filter />
            <ContactList />
          </div>
        )}

        {contacts?.length === 0 && <p>Your contacts will be here</p>}
      </div>
    </>
  );
};
