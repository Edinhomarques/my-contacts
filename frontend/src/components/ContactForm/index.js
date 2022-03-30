import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, ButtonContainer } from './styles';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';
import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import Loader from '../Loader';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const categoriesList = await CategoriesService.listCategories();
      setCategories(categoriesList);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const isFormValid = name && errors.length === 0;

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

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <Form onSubmit={(e) => handleSubmit(e)} noValidate>
        <FormGroup
          error={getErrorMessageByFieldName('name')}
        >
          <Input
            placeholder="Nome *"
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
            onChange={(e) => handlePhoneChange(e)}
            maxLength="15"
          />
        </FormGroup>
        <FormGroup>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Sem categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <ButtonContainer>
          <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
        </ButtonContainer>
      </Form>
    </>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
