import styled from "styled-components";

export const StyledCardItem = styled.div`
  //color: #fff;
  background-color: ${props => props.color};
  text-align: center;
  padding: 40px 20px;
  border-radius: 8px;
  //box-shadow: 0 4px 10px #000000;
  margin: 10px;
  height: 25px;
  width: 200px;
  ${ ({rotate}) => rotate ? `transform: rotate(${rotate}deg);`: ''}
  
  ${ ({clicked}) => !clicked ? `
     box-shadow: inset 9px 9px 16px #FFFFFF, inset -9px -9px 16px #BFBFBF;
  `:`
    box-shadow: inset 9px 9px 16px #BFBFBF, inset -9px -9px 16px #FFFFFF;
  `}
  
  ${ ({discovered}) => discovered ?`
    color: #fff;
    box-shadow: 9px 9px 16px #BFBFBF, -9px -9px 16px #FFFFFF;
  `:'color: #000'}
`;

export default { StyledCardItem };

