import * as React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
  typography: {
    fontFamily: ['Poppins'],
}
});

export function CustomTheme() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
