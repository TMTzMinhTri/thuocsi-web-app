import { createMuiTheme } from '@material-ui/core/styles';
import { palette } from 'constants/Colors';
// Create a theme instance.
const Theme = createMuiTheme({
  overrides: {
    MuiRadio: {
      colorSecondary: {
        color: '#66bb6a',
        '&$checked': {
          color: '#66bb6a',
        },
      },
    },
    MuiInputAdornment: {
      positionStart: {
        margin: 8,
      },
    },
    MuiOutlinedInput: {
      root: {
        position: 'relative',
        '& $notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: '#fff',
          boxShadow: '0 0 0 0.2rem rgba(0,180,110,0.25)',
          outline: 0,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
        },
        '&$focused $notchedOutline': {
          borderColor: '#fff',
          outline: 0,
          boxShadow: '0 0 0 0.2rem rgba(0,180,110,0.25)',
          borderWidth: 3,
        },
      },
    },
    MuiDrawer: {
      paper: {
        width: '80%',
        overflowY: 'auto',
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          borderColor: '#fff',
        },
      },
    },
    MuiFab: {
      root: {
        backgroundColor: '#fff',
        textTransform: 'unset',
        boxShadow: '0 0 0 0.2rem rgba(0,180,110,0.25)',

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
    MuiButton: {
      root: {
        textTransform: 'capitalize',
      },
    },
    MuiPagination: {
      root: {
        padding: 10,
      },
    },
    MuiPaginationItem: {
      page: {
        color: '#3bb46d',
        background: '#fff',
        '&$disabled': {
          opacity: 0.18,
        },
        '&$selected': {
          color: '#fff',
          background: 'linear-gradient(102.04deg, #00b46e 0%, #9ac100 100%)',
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
      primary: '#fff',
      secondary: '#000',
    },
    background: {
      primary: palette.primary.main,
      success: palette.success.main,
      warning: palette.warning.main,
      payment: palette.warning.main,
      disabled: '#dddddd',
    },
  },
  palette,
});

export default Theme;
