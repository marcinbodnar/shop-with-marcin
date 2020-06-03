import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html {
        font-family: Verdana;   
        font-size: 14px;
        background: #eceff1;
    }

    h1, h6 {
        padding: 0px;
        margin: 0px;
    }

    h1 {
        font-size: 30px;
    }
    h6 {
        font-size: 12px;
        color: #999;
        font-weight: normal;
    }

    input {
        font-family: Verdana;
        font-size: 14px;
        padding: 0 0 0 1em;
        border: 1px solid #777;
    }

    b {
        color: #000;
        font-weight: normal;
    }
`;
