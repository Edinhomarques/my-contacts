import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, ButtonContainer } from './styles';

import isEmailValid from '../../utils/isEmailValid';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Name is required' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'name'));
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      const errorAlreadyExists = errors.find((err) => err.field === 'email');
      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'Format e-mail is invalid' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'email'));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormGroup
        error={errors.find((err) => err.field === 'name') && errors.find((err) => err.field === 'name').message}
      >
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => handleNameChange(e)}
          error={errors.find((err) => err.field === 'name')}
        />
      </FormGroup>

      <FormGroup
        error={errors.find((err) => err.field === 'email') && errors.find((err) => err.field === 'email').message}
      >
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          error={errors.find((err) => err.field === 'email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">category</option>
          <option value="Instagram">Instagram</option>
          <option value="Twitter">Twitter</option>
          <option value="Facebook">Facebook</option>
          <option value="School">School</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
