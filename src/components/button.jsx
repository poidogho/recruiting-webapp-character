import React from 'react';
import styled from 'styled-components';

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
const StyledButton = styled.button`
  margin: 0 0.2rem;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
`;

export default Button;
