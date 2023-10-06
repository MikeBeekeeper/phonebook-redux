import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import css from './contactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { add } from 'redux/slice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts)

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleClick = e => {
    e.preventDefault();
    const user = {
      id: nanoid(),
      userName: e.currentTarget.elements.name.value,
      userNumber: e.currentTarget.elements.number.value,
    };

    if(contacts.find(el=>el.userName === user.userName)) return alert(`That contact name is already in your phonebook`)

    dispatch(add(user));
    reset();
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleClick}>
      <label htmlFor={nameInputId}> Name</label>
      <input
        className={css.formInput}
        type="text"
        name="name"
        id={nameInputId}
        value={name}
        onChange={handleChange}
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label htmlFor={numberInputId}> Number</label>
      <input
        className={css.formInput}
        type="tel"
        name="number"
        id={numberInputId}
        value={number}
        onChange={handleChange}
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit" className={css.submitBtn}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
