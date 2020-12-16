import React from 'react';
import {
  Dehaze as DehazeIcon,
  AccountCircle as AccountCircleIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Share as ShareIcon,
  LocalOffer as LocalOfferIcon,
  ExitToApp as ExitToAppIcon,
  MonetizationOn as MonetizationOnIcon,
} from '@material-ui/icons';
import { makeStyles, Button, MenuItem, Typography } from '@material-ui/core';

import { MenuDropDown, MenuDropDownItem } from '../../atoms';

const useStyles = makeStyles({
  topMenuClass: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: '0 10px',
    minHeight: 0,
  },
  topTextClass: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
  },
  menuItemClass: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch!important',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    borderBottom: '1px solid black',
  },
});

export default function Toggle() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button aria-haspopup="true" onClick={handleClick} cursor="pointer">
        <DehazeIcon />
      </Button>
      <MenuDropDown anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <MenuItem onClick={handleClose} className={classes.menuItemClass}>
          <div className={classes.topMenuClass}>
            <Typography className={classes.topTextClass} variant="h5">
              Ví điện tử
            </Typography>
            <Typography className={classes.topTextClass} variant="h5">
              Điểm thưởng
            </Typography>
          </div>
          <div className={classes.topMenuClass}>
            <Typography className={classes.topTextClass} variant="h5" color="primary">
              0 đ
            </Typography>
            <Typography className={classes.topTextClass} variant="h5" color="secondary">
              0
            </Typography>
          </div>
        </MenuItem>
        <MenuDropDownItem handleClick={handleClose} text="Thông tin tài khoản">
          <AccountCircleIcon />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={handleClose} text="Đơn hàng của tôi">
          <AssignmentTurnedInIcon />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={handleClose} text="Giới thiệu bạn bè">
          <ShareIcon />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={handleClose} text="Mã giảm giá của tôi">
          <LocalOfferIcon />
        </MenuDropDownItem>

        <MenuDropDownItem handleClick={handleClose} text="Điểm tích luỹ">
          <MonetizationOnIcon />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={handleClose} text="Đăng xuất">
          <ExitToAppIcon />
        </MenuDropDownItem>
      </MenuDropDown>
    </>
  );
}
