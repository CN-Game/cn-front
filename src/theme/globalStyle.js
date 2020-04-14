import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Riffic';
    font-style: normal;
    font-weight: normal;
    src: local('Riffic Free Bold'), url('../../public/RifficFree-Bold.woff') format('woff');
  }
  
  * {
    font-family: 'Riffic', sans-serif;
  }
  
  body {
    //background-color: #F2F2F2;
    background-color: #E0E5EC;
    margin: 0;
  }
  
  p {
    margin: 0;
  }
  
  button {
    border: none;
  }
`;

export default GlobalStyle
