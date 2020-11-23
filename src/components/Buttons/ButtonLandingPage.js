/* eslint-disable no-confusing-arrow */
import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
});

function ButtonLandingPage(props) {
  const { color, name, ...other } = props;
  const classes = useStyles(props);
  return (
    <Button className={classes.root} {...other}>
      {name}
    </Button>
  );
}

export default ButtonLandingPage;
