import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

import GlobalStyle from "styles/Grobalstyle.styled";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

import { RecoilRoot } from "recoil";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
  // </React.StrictMode>
);
