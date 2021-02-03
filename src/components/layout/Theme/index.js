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
  palette:{
    primary: {
    lighter: '#C8FACD',
    light: '#5BE584',
    main: '#00AB55',
    dark: '#007B55',
    darker: '#005249',
  },
  info: {
    lighter: '##D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
  },
  secondary: {
    main: '#ff4fae',
  },
  thirdly: {
    main: '#00814f',
  },
  error: {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842  ',
    dark: '#B72136',
    darker: '#7A0C2E',
  },
  grey: {
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8  ',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
  },
  background: {
    default: '#fff',
  },
  warning: {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107  ',
    dark: '#B78103',
    darker: '#7A4F01',
  },
  success: {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
  },
  },
});

export default Theme;
