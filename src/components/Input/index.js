import React from 'react';
import { StyledInput } from './styled';

const Input = ({
  onChange,
  onKeyUp,
  value,
}) => {
  return (
    <StyledInput onChange={onChange} onKeyUp={onKeyUp} value={value} name="id" type="text"/>
  )
};

export default Input;
