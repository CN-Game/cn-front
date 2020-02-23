import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Riffic';
    font-style: normal;
    font-weight: normal;
    src: local('Riffic Free Bold'), url('../../public/RifficFree-Bold.woff') format('woff');
  }
  
  body {
    font-family: 'Riffic', sans-serif;
  }
`;

export default GlobalStyle
