import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(7px);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  background: #FFF;
  border-radius: 4px;
  padding: 24px;

  h1 {
    color: ${({ danger, theme }) => (
    danger ? theme.colors.danger.main
      : theme.colors.gray[900])};
    font-size: 22px;
  }

  p {
    margin-top: 8px;
  }

`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    text-align: center;
    font-size: 16px;
    margin-right: 8px;
    color:  ${({ theme }) => theme.colors.gray[200]};
    font-weight: bold;
  }
`;