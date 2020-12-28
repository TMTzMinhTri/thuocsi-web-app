import React from 'react';
import {
  MenuRounded as MenuRoundedIcon,
  AccountCircle as AccountCircleIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Share as ShareIcon,
  LocalOffer as LocalOfferIcon,
  ExitToApp as ExitToAppIcon,
  MonetizationOn as MonetizationOnIcon,
} from '@material-ui/icons';
import { Button, MenuItem, Typography } from '@material-ui/core';
import { useAuth } from 'context';
import { useRouter } from 'next/router';
import { MenuDropDown, MenuDropDownItem } from 'components/atoms';
import styles from './styles.module.css';

export default function Toggle() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const { logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={styles.toggle_button}
        aria-haspopup="true"
        onClick={handleClick}
        cursor="pointer"
      >
        <MenuRoundedIcon />
      </Button>
      <MenuDropDown anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <MenuItem onClick={handleClose} className={styles.menu_item}>
          <div className={styles.top_menu}>
            <Typography className={styles.top_text} variant="h5">
              Ví điện tử
            </Typography>
            <Typography className={styles.top_text} variant="h5">
              Điểm thưởng
            </Typography>
          </div>
          <div className={styles.top_menu}>
            <Typography className={styles.top_text} variant="h5" color="primary">
              0 đ
            </Typography>
            <Typography className={styles.top_text} variant="h5" color="secondary">
              0
            </Typography>
          </div>
        </MenuItem>
        <MenuDropDownItem handleClick={() => router.push('/my-account')} text="Thông tin tài khoản">
          <AccountCircleIcon />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={() => router.push('/my-order')} text="Đơn hàng của tôi">
          <AssignmentTurnedInIcon />
        </MenuDropDownItem>

        <MenuDropDownItem
          handleClick={() => router.push('/users/referrals')}
          text="Giới thiệu bạn bè"
        >
          <ShareIcon />
        </MenuDropDownItem>

        <MenuDropDownItem
          handleClick={() => router.push('/users/user-promo-codes')}
          text="Mã giảm giá của tôi"
        >
          <LocalOfferIcon />
        </MenuDropDownItem>

        <MenuDropDownItem
          handleClick={() => router.push('/users/loyalty_points')}
          text="Điểm tích luỹ"
        >
          <MonetizationOnIcon />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={logout} text="Đăng xuất">
          <ExitToAppIcon />
        </MenuDropDownItem>
      </MenuDropDown>
    </>
  );
}
