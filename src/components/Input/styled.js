import styled from 'styled-components';

export const StyledInput = styled.input`
  display: block;
  border-radius: 8px;
  font-size: 18px;
  line-height: 24px;
  height: 40px;
  width: 140px;
  text-align: center;
  border: solid #000 2px;
  margin: auto;
`;

export const StyledInputWrapper = styled.div`
  margin: 20px 0;
`;

export const StyledError = styled.p`
  color: red;
`;

export default StyledInput;
