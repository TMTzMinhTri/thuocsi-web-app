import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  root: {
    height: '56px',
    padding: '15px',
  },
});

const Copyright = () => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
        © Bản quyền thuộc Công Ty TNHH Buymed - {new Date().getFullYear()}
      </Typography>
    </div>
  );
};

export default React.memo(Copyright);
