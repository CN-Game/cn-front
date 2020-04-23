import React from 'react';
import { StyledInput, StyledInputWrapper, StyledError } from './styled';

const Input = ({
  onChange,
  onKeyUp,
  value,
  error
}) => {
  return (
      <StyledInputWrapper>
        <StyledInput onChange={onChange} onKeyUp={onKeyUp} value={value} name="id" type="text"/>
        { error && <StyledError>{error.data}</StyledError>}
      </StyledInputWrapper>
  )
};

export default Input;
