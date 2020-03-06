import styled from 'styled-components';

const WaitingRoomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`;

const BlueTeamContainer = styled.section`
  flex: 1 1 auto;
  background-color: #33A1FD;
  color: white;
  text-align: center;
`;

const PseudoContainer = styled.section`
  flex: 1 1 auto;
  text-align: center;
`;

const RedTeamContainer = styled.section`
  flex: 1 1 auto;
  background-color: #A31621;
  color: white;
  text-align: center;
`;

export {
  WaitingRoomContainer,
  BlueTeamContainer,
  PseudoContainer,
  RedTeamContainer
};
