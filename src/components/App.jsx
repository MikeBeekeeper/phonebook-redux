import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import css from './App.module.css';
import ContactForm from './contactForm/contactForm.js';
import Filter from './filter/filter.js';
import ContactList from './contactList/contactList.js';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  const getRepeatingName = name => {
    return contacts.find(contact => contact.name === name);
  };

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const repeatingName = getRepeatingName(name);

    if (repeatingName) {
      return alert(`${name} is already in contacts`);
    }

    setContacts(prev => [contact, ...prev]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalazedContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalazedContact)
    );
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const contactList = JSON.stringify(contacts);
    if (contactList) {
      localStorage.setItem('contacts', contactList);
    }
  }, [contacts]);

  const totalQuantity = contacts.length;
  const visibleContacts = getVisibleContacts();
  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      {totalQuantity !== 0 ? (
        <div className={css.contactsWrapper}>
          <h2>Contacts</h2>
          <p>Total quantity of your contacts: {totalQuantity}</p>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        </div>
      ) : (
        <p>Your contacts will be here</p>
      )}
    </div>
  );
};
