import { MenuList, MenuItem, ListItemIcon, Typography, Box } from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Share as ShareIcon,
  LocalOffer as LocalOfferIcon,
  MonetizationOn as MonetizationOnIcon,
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

const tabs = [
  { label: 'Thông tin tài khoản', icon: <AccountCircleIcon />, id: 1, link: '/my-account' },
  { label: 'Đơn hàng của tôi', icon: <AssignmentTurnedInIcon />, id: 2, link: '/my-order' },
  { label: 'Giới thiệu bạn bè', icon: <ShareIcon />, id: 3, link: '/users/referrals' },
  { label: 'Mã giảm giá của tôi', icon: <MonetizationOnIcon />, id: 4 },
  { label: 'Điểm tích luỹ', icon: <LocalOfferIcon />, id: 5 },
];
const InfoTabs = ({ value }) => {
  const Router = useRouter();
  const handleChangePage = (id) => {
    Router.push(tabs[id - 1]?.link);
  };
  return (
    <Box className={styles.tab_box}>
      <Box className={styles.account_name}>
        Tài khoản của
        <Typography variant="h5" className={styles.name}>
          lê duy đạt
        </Typography>
      </Box>
      <MenuList>
        {tabs.map((tab) => (
          <MenuItem
            button={false}
            key={`tab-${tab.id}`}
            classes={{ root: value === tab.id ? styles.tab_active : styles.tab_inactive }}
            onClick={(e) => handleChangePage(e)}
            value={tab.id}
          >
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <Typography variant="inherit">{tab.label}</Typography>
          </MenuItem>
        ))}
      </MenuList>
      <Typography> Ví - 0đ </Typography>
    </Box>
  );
};

export default InfoTabs;
