import styled from 'styled-components';
import { color } from '../../utils/branding';
import Card from '../Card';

export const MainContainer = styled.div`
  //max-width: 788px;
  margin: auto;
`;

export const StyledTopCard = styled.div`
  background-color: ${color.neutral};
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 10px #000000;
  transform: rotate(-3.21deg);
  margin: 40px auto;
  max-width: 380px;
`;

export const StyledTopText = styled.div`
  transform: rotate(3.21deg);
`;

export const StyledActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 120px;
  
  div {
    width: 33%;
  }  
`;

export const StyledJoinGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledCreateButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTopLeftCard = styled(Card)`
  position: absolute;
  top: 60px;
  right: 60%;
  margin: auto;
  color: #fff;
  box-shadow: 0px 4px 10px #000000;`;

export const StyledTopRightCard = styled(Card)`
  position: absolute;
  top: 40px;
  left: 60%;
  color: #fff;
  box-shadow: 0px 4px 10px #000000;`;

export default {
  StyledTopCard,
  MainContainer,
  StyledTopText,
  StyledActionContainer,
  StyledJoinGame,
  StyledCreateButton,
  StyledTopLeftCard,
  StyledTopRightCard,
};
