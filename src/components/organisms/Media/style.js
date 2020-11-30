import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  mediaWrapper: {
    marginTop: 48,
    marginBottom: 48,
  },
  dark: {
    backgroundColor: '#343a40',
  },
  container: {
    maxWidth: '50rem',
    margin: '0 auto',
  },
  hoverLink: {
    willChange: 'transform',
    transition: 'transform 0.2s',
    '&:hover': {
      transformOrigin: 'center center',
      transform: 'scale(1.1,1.1)',
    },
  },
}));
