import React from 'react';
import PagerHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

export default function NewContact() {
  return (
    <>
      <PagerHeader title="New Contact" />
      <ContactForm buttonLabel="Save" />
    </>
  );
}
