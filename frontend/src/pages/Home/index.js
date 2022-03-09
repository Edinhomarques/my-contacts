import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';

import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from './styles';
import ContactsServices from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsServices.listContacts();

        setContacts(contactsList);
      } catch (error) {
        throw Error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'ASC' ? 'DESC' : 'ASC'));
  }

  function handleChangeSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  return (

    <Container>
      {false && <Modal danger />}
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Search by name..."
          onChange={(e) => handleChangeSearchTerm(e)}
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' Contact' : ' Contacts'}
        </strong>
        <Link to="/new">New Contact</Link>
      </Header>
      <ListHeader direction={orderBy}>
        {filteredContacts.length !== 0 && (
        <button type="button" onClick={() => handleToggleOrderBy()}>
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </button>
        )}
      </ListHeader>

      {filteredContacts.map((contact) => (
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
    </Container>
  );
}
