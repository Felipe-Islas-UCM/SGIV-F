// palette.js
import { createTheme } from '@mui/material/styles';
import { amber } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: amber[600],
      //contrastText: '#fff',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#amber',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});
  
  