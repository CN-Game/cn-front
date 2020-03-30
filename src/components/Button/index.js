import React from 'react';
import { StyledButton } from './styled';

const Button = ({
  text,
  onClick= () => {},
}) => (
  <StyledButton onClick={onClick}>{text}</StyledButton>
);

export default Button;
