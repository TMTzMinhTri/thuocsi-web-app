import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const Theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    subtitle2: {
      fontSize: 13,
    },
  },
  modal: {
    background: '#f4f7fc',
  },
  colors: {
    primary: '#000',
    secondary: '#fff',
  },
  button: {
    color: {
      primary: '#000',
      secondary: '#fff',
    },
    background: {
      primary: '#66bb6a',
      success: '#66bb6a',
      warning: '#ffb74d',
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    warning: {
      default: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
    },
    success: {
      default: '#66bb6a',
      main: '#66bb6a',
      dark: '#47824a',
      light: '#00e676',
    },
  },
});

export default Theme;
