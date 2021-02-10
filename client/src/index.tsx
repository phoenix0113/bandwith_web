import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { App } from "./App";
import "./styles/main.scss";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    min-height: 100%;
    overflow-y: hidden;
    display: flex;
    flex-grow: 1;
  }

  * {
    box-sizing: border-box;
    font-family: "Avenir"
  }
`;

render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>,
  document.getElementById("root"),
);
