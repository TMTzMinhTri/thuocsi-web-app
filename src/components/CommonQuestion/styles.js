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
    buttonOutlined: {
      background: 'white',
      color: '#00b46e!important',
      borderColor: '#00b46e',
      width: '200px!important',
      height: '3em',
      fontWeight: 500,
      lineHeight: 2,
    },
  },
}));
