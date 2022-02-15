import styled from 'styled-components';

export const Container = styled.header`
  a {
    display: flex;
    text-decoration: none;
    span {
      margin-left: 10px;
      font-family: 'Sora';
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
    }

    img {
      transform: rotate(-90deg);
    }
  }
  h1 {
    font-size: 24px;
  }
`;
