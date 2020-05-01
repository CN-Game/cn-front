import styled from "styled-components";
import Button from "../Button";
import { color } from "../../utils/branding";

export const StyledContainer = styled.div`
  height: 150px;
  margin-bottom: 12px;
  position: relative;
`;

export const StyledSpyTurn = styled('section')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledNumberButton = styled(Button)`
  width: 50px;
  height: 50px;
  margin-right: 12px;
`;

export const StyledId = styled.div`
  width: 125px;
  border-radius: 8px;
  box-shadow: 9px 9px 16px #A3B1C6, -9px -9px 16px #FFFFFF;
  padding: 12px 18px;
  top: 0;
  left: 61%;
  margin: 14px auto 0;
  display: block;
  position: absolute;
  
  p {
    text-align: center;
    font-size: 20px;
    letter-spacing: 0.5px;
  }
`;

export const StyledBlueScoreWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 5%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${color.blue};
  box-shadow: 9px 9px 16px #A3B1C6, -9px -9px 16px #FFFFFF;
`;

export const StyledRedScoreWrapper = styled(StyledBlueScoreWrapper)`
  left: unset;
  right: 5%;
  background-color: ${color.red};
  box-shadow: 9px 9px 16px #A3B1C6, -9px -9px 16px #FFFFFF;
`;

export const StyledBlueScore = styled.div`
  position: absolute;
  width: 17px;
  top: 18px;
  left: 24px;
  font-size: 24px; 
  
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: 24px;
    height: 55px;
    width: 2px;
    border-radius: 1px;
    background-color: black;
    transform: rotate(45deg);
  } 
`;

export const StyledBlueTotalScore = styled.div`
  position: absolute;
  width: 17px;
  bottom: 18px;
  right: 24px;
  font-size: 24px; 
`

export const StyledRedScore = styled(StyledBlueScore)`
  left: unset;
  right: 24px;
  
  &:after {
    transform: rotate(-45deg);
    left: unset;
    right: 24px;
  }
`;

export const StyledRedTotalScore = styled(StyledBlueTotalScore)`
  left: 24px;
`;

export const StyledLabel = styled.p`
  display: inline-block;
`;

export const StyledTip = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const StyledTextTip = styled.p`
  font-size: 18px;
  margin-top: 8px;
`;

export const StyledValidationButton = styled(Button)`
  display: block;
  flex: 0 0 auto;
  margin-top: 24px;
`;

export const StyledTurnTitle = styled.p`
  text-align: center;
  vertical-align: middle;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 28px;
`;

export default {
    StyledSpyTurn
};
