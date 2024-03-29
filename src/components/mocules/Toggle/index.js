import React from 'react';
import {
  MenuRounded as MenuRoundedIcon,
  AccountCircle as AccountCircleIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Share as ShareIcon,
  LocalOffer as LocalOfferIcon,
  ExitToApp as ExitToAppIcon,
  MonetizationOn as MonetizationOnIcon,
  Message as MessageIcon,
} from '@material-ui/icons';
import { Button, MenuItem, Typography, Divider } from '@material-ui/core';
import { useAuth, useCart } from 'context';
import { useRouter } from 'next/router';
import { MenuDropDown, MenuDropDownItem } from 'components/atoms';
import { useModal } from 'hooks';
import { formatCurrency } from 'utils/FormatNumber';

import CustomModal from '../CustomModal';
import styles from './styles.module.css';

export default function Toggle({ point, balance }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showPoupLogout, toggleLogout] = useModal(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { clearCart } = useCart();
  const { logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    clearCart();
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
              {formatCurrency(balance)}
            </Typography>
            <Typography className={styles.top_text} variant="h5" color="secondary">
              {point}
            </Typography>
          </div>
        </MenuItem>
        <Divider />

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
          handleClick={() => router.push('/users/my-ticket')}
          text="Phản hồi của tôi"
        >
          <MessageIcon />
        </MenuDropDownItem>

        <MenuDropDownItem
          handleClick={() => router.push('/users/loyalty_points')}
          text="Điểm tích luỹ"
        >
          <MonetizationOnIcon />
        </MenuDropDownItem>
        <MenuDropDownItem handleClick={toggleLogout} text="Đăng xuất">
          <ExitToAppIcon />
        </MenuDropDownItem>
      </MenuDropDown>
      <CustomModal
        visible={showPoupLogout}
        onClose={toggleLogout}
        title="Xin xác nhận"
        content="Bạn có chắc muốn đăng xuất?"
        btnOk="Có"
        onClickOk={handleLogout}
        btnOnClose="Không"
      />
    </>
  );
}
