import styled from 'styled-components';
import Button from "../Button";

const WaitingRoomContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  padding: 0 32px;
`;

const StyledTitlePseudo = styled.h3`
  font-size: 26px;
`;

const PseudoContainer = styled.section`
  text-align: center;
`;

const StyledPseudoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  width: fit-content;
  margin: 0 auto;
`;

const StyledPseudo = styled.p`
  width: 145px;
  border-radius: 8px;
  box-shadow: 9px 9px 16px #A3B1C6, -9px -9px 16px #FFFFFF;
  padding: 14px 20px;
  margin: 0 16px 26px;
`;

const StyledId = styled.div`
  width: 125px;
  border-radius: 8px;
  box-shadow: 9px 9px 16px #A3B1C6, -9px -9px 16px #FFFFFF;
  padding: 12px 18px;
  top: 0;
  margin: 14px auto 0;
  display: block;
  
  p {
    text-align: center;
    font-size: 20px;
    letter-spacing: 0.5px;
  }
`;

const StyledChoosePseudo = styled.section`
  margin-top: 40px;
  
  > * {
    text-align: center;
    margin: 0 auto 12px;
    display: block;
  }
`;

const StyledCenterColumn = styled.section`
  position: relative;
  width: 33%;
`;

const StyledButton = styled(Button)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 40px;
`

export {
  WaitingRoomContainer,
  PseudoContainer,
  StyledTitlePseudo,
  StyledPseudo,
  StyledPseudoWrapper,
  StyledId,
  StyledChoosePseudo,
  StyledCenterColumn,
  StyledButton,
};
