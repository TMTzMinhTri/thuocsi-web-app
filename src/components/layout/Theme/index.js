import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const Theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        position: 'relative',
        '& $notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: '#20c997',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        },
        '&$focused $notchedOutline': {
          borderColor: '#20c997',
          borderWidth: 3,
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#4A90E2',
        },
      },
    },
    MuiFab: {
      root: {
        backgroundColor: '#fff',
        textTransform: 'unset',
        borderColor: '#00b46e',

        '&$extended': {
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 25,
          height: 38,
          color: '#919aa3',
          boxShadow: '3px 3px 6px rgba(0,0,0,0.08)',
          '&:hover': {
            color: '#343a40',
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
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
      main: '#ff4fae',
    },
    thirdly: {
      main: '#f9b514',
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
