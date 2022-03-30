import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import sad from '../../assets/images/sad.svg';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
} from './styles';

import ContactsServices from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsServices.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'ASC' ? 'DESC' : 'ASC'));
  }

  function handleChangeSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  async function handleTryAgain() {
    loadContacts();
  }

  return (

    <Container>
      {false && <Modal danger />}
      <Loader isLoading={isLoading} />
      { contacts.length > 0 && (
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Search by name..."
          onChange={(e) => handleChangeSearchTerm(e)}
        />
      </InputSearchContainer>
      )}

      <Header justifyContent={
        // eslint-disable-next-line no-nested-ternary
        hasError
          ? 'flex-end'
          : (
            contacts.length > 0
              ? 'space-between'
              : 'center'
          )
}
      >
        {(contacts.length > 0 && !hasError) && (
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' Contact' : ' Contacts'}
        </strong>
        )}

        <Link to="/new">New Contact</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="error" />
          <div className="details">
            <span>
              Ocorreu um erro ao obter os seus contatos!
              Tentar novamente!
            </span>
            <Button type="button" onClick={() => handleTryAgain()}>
              Tente novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão
                {' '}
                <strong>”Novo contato”</strong>
                {' '}
                à cima para cadastrar o seu primeiro!

              </p>
            </EmptyListContainer>
          )}
          {filteredContacts.length > 0 && (
            <>
              <ListHeader direction={orderBy}>
                <button type="button" onClick={() => handleToggleOrderBy()}>
                  <span>Nome</span>
                  <img src={arrow} alt="Arrow" />
                </button>
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
            </>
          )}
        </>
      )}

    </Container>
  );
}
