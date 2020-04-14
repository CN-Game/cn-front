import styled  from 'styled-components';
import { color } from '../../../utils/branding';

const StyledTeamWrapper = styled.section`
  width: 33%;
  text-align: center;
  align-items: center;
  margin-top: 12px;
`;

const StyledTitle = styled.h3`
  color: ${({team}) => team === 'Blue' ? color.blue : color.red};
  font-size: 26px;
`;

const StyledTeamContainer = styled.div`
  border-radius: 12px;
  box-shadow: 9px 9px 16px #A3B1C6, -9px -9px 16px #FFFFFF;
  padding-top: 2px;
  padding-bottom: 16px;
  margin: 0 auto 24px;
  min-height: 250px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const StyledRoleTitle = styled.h4`
  font-size: 22px;
`;


export {
    StyledTeamWrapper,
    StyledTeamContainer,
    StyledTitle,
    StyledRoleTitle,
};
