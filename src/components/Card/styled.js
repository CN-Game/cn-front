import styled from "styled-components";

export const StyledCardItem = styled.div`
${ ({reveal, color, realColor, discovered}) => reveal || discovered ? `
    background-color: ${realColor};
    color: #FFF;
     box-shadow: 9px 9px 16px #BFBFBF, -9px -9px 16px #FFFFFF;
  `
    :`
    background-color: ${color};
  `
  };
  text-align: center;
  padding: 40px 20px;
  border-radius: 8px;
  margin: 10px;
  height: 25px;
  width: 200px;
  ${ ({rotate}) => rotate ? `transform: rotate(${rotate}deg);`: ''}
  
  ${ ({clicked, clickable}) => clickable ? clicked ?`
    box-shadow: inset 9px 9px 16px #BFBFBF, inset -9px -9px 16px #FFFFFF;
  `:`
     box-shadow: inset 9px 9px 16px #FFFFFF, inset -9px -9px 16px #BFBFBF;
  `: ''}
  
  ${ ({discovered}) => discovered ?`
    box-shadow: 9px 9px 16px #BFBFBF, -9px -9px 16px #FFFFFF;
  `:''}
`;

export default { StyledCardItem };

