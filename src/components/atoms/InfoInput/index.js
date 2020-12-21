import React from 'react';
import { withStyles } from '@material-ui/core';
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
  disabled: {
    boxShadow: 'none!important',
    border: 'none!important',
  },
}))(Input);

export default React.memo(BootstrapInput);
