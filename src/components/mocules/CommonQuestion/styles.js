import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  Wrapper: {
    backgroundColor: '#f4f7fc',
  },
  link: {
    cursor: 'pointer',
    fontWeight: 400,
    padding: '17px 0',
    fontSize: 16,
    alignSelf: 'flex-start',
    borderBottom: '1px solid #dee2e6',
    '&:hover': {
      color: '#00b46e',
    },
  },
  label: {
    color: '#00b46e',
    width: '174px',
    height: '34px',
    fontWeight: 500,
    lineHeight: 2,
  },
  outlined: {
    border: '1px solid #00b46e',
    padding: '6px 12px',
  },
  root: {
    '&:hover span': {
      transition: '.6s all',
      color: 'black',
    },
    borderRadius: '50px',
    backgroundColor: '#fff',
  },
  center: {
    textAlign: 'center',
  },
}));
