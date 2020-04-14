import React from 'react';
import { StyledButton } from './styled';

const Button = ({
  text,
  onClick= () => {},
  className = '',
}) => (
  <StyledButton onClick={onClick} className={className}>{text}</StyledButton>
);

export default Button;
