import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  globalStyle: {
    padding: '3rem 0',
    backgroundColor: '#343a40',
    color: '#f4f7fc',
    fontSize: 16,
  },
  primaryColor: {
    color: '#00b46e',
  },
  bolder: {
    fontWeight: 'bolder',
  },
  footerDelivery: {
    height: '2rem',
    background: 'white',
    borderRadius: '5px',
    padding: '0.25rem 0.5rem!important',
  },
  brandWrap: {
    marginRight: '0.5rem!important',
    marginBottom: '0.5rem',
    display: 'inline-block',
  },
  link: {
    cursor: 'pointer',
    fontWeight: 500,
    marginBottom: '1rem',
    '&:hover': {
      color: '#00b46e',
    },
  },
  footerHeader: {
    textTransform: 'uppercase',
    color: '#00b46e',
    fontWeight: 'bold',
  },
  mb3: {
    marginBottom: '3rem',
  },
  mt1: {
    display: 'inline-block',
    marginTop: '1rem',
  },
  contact: {
    textTransform: 'lowercase',
    marginBottom: 0,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    marginRight: '0.5rem',
  },
  divider: {
    borderRight: '1px solid rgba(145,154,163,0.822)',
  },
}));
