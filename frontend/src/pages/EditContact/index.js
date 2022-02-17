import React from 'react';
import PagerHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

export default function EditContact() {
  return (
    <>
      <PagerHeader title="Edit Contact" />
      <ContactForm buttonLabel="Save editions" />
    </>
  );
}
