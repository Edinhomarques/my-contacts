import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyExists = errors.find((err) => err.field === field);
    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError({ fieldName }) {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((err) => err.field === fieldName)
      && errors.find((err) => err.field === fieldName).message;
  }

  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
