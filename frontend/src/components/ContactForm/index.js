import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, ButtonContainer } from './styles';

import isEmailValid from '../../utils/isEmailValid';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';
import useErrors from '../../hooks/useErrors';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  function handleNameChange(e) {
    setName(e.target.value);

    if (!e.target.value) {
      setError({ field: 'name', message: 'Name is required' });
    } else {
      removeError({ fieldName: 'name' });
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'Format e-mail is invalid' });
    } else {
      removeError({ fieldName: 'email' });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)} noValidate>
      <FormGroup
        error={getErrorMessageByFieldName('name')}
      >
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => handleNameChange(e)}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageByFieldName('email')}
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="tel"
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
