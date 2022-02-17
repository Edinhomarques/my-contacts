import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Container, Overlay, Footer } from './styles';
import Button from '../Button';

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo do Modal</h1>
        <p>
          Corpo do Modal
        </p>
        <Footer>
          <button type="button" className="cancel-button">Cancelar</button>
          <Button danger={danger}>Deletar</Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),

  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
