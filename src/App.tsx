import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./styles/palette";

const Box = styled.div`
  background-color: ${(p) => p.theme.colors.primary};
`;

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className="App">aserdvgserfbs</Box>
      </ThemeProvider>
    </>
  );
}

export default App;
