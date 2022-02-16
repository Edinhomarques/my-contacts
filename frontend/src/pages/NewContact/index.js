import React from 'react';
import PagerHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

export default function NewContact() {
  return (
    <>
      <PagerHeader title="New Contact" />
      <Input placeholder="Nome" />
      <br />
      <br />
      <Select>
        <option value="123">insta</option>
        <option value="123">twitter</option>
        <option value="123">Facebook</option>
      </Select>
      <Button type="button">Cadastrar</Button>
    </>
  );
}
