import styled from 'styled-components';
import { color } from '../../utils/branding';

export const StyledButton = styled.button`
  color: #FFF;
  background-color: ${color.black};
  border-radius: 8px;
  font-size: 18px;
  line-height: 32px;
  height: 50px;
  width: 150px;
  cursor: pointer;
`;

export default { StyledButton };
