import React from 'react';
import PropTypes from 'prop-types';
import { Form } from './styles';

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

      <FormGroup>
        <Input placeholder="Email" />
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

      <Button type="submit">{buttonLabel}</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
