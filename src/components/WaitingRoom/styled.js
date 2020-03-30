import styled from 'styled-components';

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
  width: 33%;
`;

const StyledPseudoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  width: fit-content;
  margin: auto;
`;

const StyledPseudo = styled.p`
  border-radius: 8px;
  box-shadow: 9px 9px 16px #A3B1C6, -9px -9px 16px #FFFFFF;
  padding: 14px 20px;
  margin: 0 16px 26px;
`;

export {
  WaitingRoomContainer,
  PseudoContainer,
  StyledTitlePseudo,
  StyledPseudo,
  StyledPseudoWrapper,
};
