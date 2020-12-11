import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const CustomSnackBar = React.memo((props) => {
  const { alertType, className, onClose, children, autoHideDuration = 3000, ...rest } = props;

  return (
    <Snackbar autoHideDuration={autoHideDuration} className={className} {...rest} onClose={onClose}>
      <Alert onClose={onClose} severity={alertType}>
        {children}
      </Alert>
    </Snackbar>
  );
});

export default CustomSnackBar;
