import styled from 'styled-components';

export default styled.input`
  width: 100%;
  height: 52px;
  background: #FFF;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 0 15px;
  outline: none;
  font-size: 16px;
  border: 2px solid #FFF;
  transition: border-color 0.2s ease-in;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[200]};
  }

  &:focus {
    border-color:  ${({ theme }) => theme.colors.primary.main};
  }
`;
