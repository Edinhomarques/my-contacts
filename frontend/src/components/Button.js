import styled from 'styled-components';

export default styled.button`
  width: 100%;
  height: 52px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  color: #FFF;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  margin-top: 20px;
  border-radius: 4px;
  transition: background-color 0.2s ease-in;

    &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color:  ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background-color: #CCC;
    cursor: default;
  }
`;