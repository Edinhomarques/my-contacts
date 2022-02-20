import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';

import {
  Container, InputSearchContainer, Header, ListContainer, Card,
} from './styles';

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:3001/contacts');
      const responseJson = await response.json();
      setContacts(responseJson);
    } catch (error) {
      throw Error(error);
    }
  }, []);

  return (
    <Container>
      {false && <Modal danger />}
      {false && <Loader />}
      <InputSearchContainer>
        <input type="text" placeholder="Search by name..." />
      </InputSearchContainer>
      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' Contact' : ' Contacts'}
        </strong>
        <Link to="/new">New Contact</Link>
      </Header>
      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && <small>{contact.category_name}</small>}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="Edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </Card>

        ))}
      </ListContainer>
    </Container>
  );
}
