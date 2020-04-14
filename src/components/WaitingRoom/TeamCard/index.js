import React from 'react';
import { StyledTeamWrapper, StyledTeamContainer, StyledTitle, StyledRoleTitle } from './styled';
import { StyledPseudoWrapper, StyledPseudo } from '../styled';

const TeamCard = ({
    team,
    onClickSpy,
    onClickAgent,
    players,
}) => {

  return (
    <StyledTeamWrapper>
      <StyledTitle team={team}>{team} Team</StyledTitle>
      <StyledTeamContainer onClick={onClickSpy} text={'Go spy'}>
        <StyledRoleTitle>{team} spy</StyledRoleTitle>
          <StyledPseudoWrapper>
            {players.map( player => (
              (player.role === "BS" || player.role === "RS") &&
              <StyledPseudo>{player.pseudo}</StyledPseudo>
            ))}
          </StyledPseudoWrapper>
      </StyledTeamContainer>
      <StyledTeamContainer onClick={onClickAgent} text={'Go spy'}>
        <StyledRoleTitle>{team} agents</StyledRoleTitle>

          <StyledPseudoWrapper>
            {players.map( player => (
              (player.role === "BA" || player.role === "RA") &&
              <StyledPseudo>{player.pseudo}</StyledPseudo>
            ))}
          </StyledPseudoWrapper>
      </StyledTeamContainer>
    </StyledTeamWrapper>
  )
};

export default TeamCard;
