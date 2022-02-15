import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from './styles';
import arrow from '../../assets/images/icons/arrow.svg';

export default function PagerHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="Arrow Back" />
        <span>Back</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

PagerHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
