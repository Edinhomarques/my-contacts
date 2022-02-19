import React from 'react';
import PropTypes from 'prop-types';
import { Form, ButtonContainer } from './styles';

import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';

export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Nome" />
      </FormGroup>

      <FormGroup
        error="Format e-mail is invalid"
      >
        <Input placeholder="Email" error />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Phone" />
      </FormGroup>
      <FormGroup>
        <Select>
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
