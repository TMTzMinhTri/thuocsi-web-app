import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: '10px 30px',
    '&:hover': {
      color: '#00b46e!important',
    },
  },
});

// menu dropdown item include icon + text
const MenuDropDownItem = ({ handleClick, children, text }) => {
  const classes = useStyles();
  return (
    <MenuItem onClick={handleClick} className={classes.root}>
      {/* children = icon of menu item */}
      <ListItemIcon>{children}</ListItemIcon>
      {text}
    </MenuItem>
  );
};

export default MenuDropDownItem;
