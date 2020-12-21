import React from 'react';
import { withStyles, fade } from '@material-ui/core';
import Input from '../Input';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    borderColor: '#ced4da!important',
    fontSize: 16,
    padding: '10px 0 10px 12px',
  },
  adornedEnd: {
    paddingRight: '0 !important',
  },
  focused: {
    boxShadow: `${fade(theme.palette.success.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: `${fade(theme.palette.success.main, 0.25)}!important`,
    outline: 'none!important',
  },
  disabled: {
    boxShadow: 'none!important',
    border: 'none!important',
  },
}))(Input);

export default React.memo(BootstrapInput);
