import { MenuList, MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Share as ShareIcon,
  LocalOffer as LocalOfferIcon,
  MonetizationOn as MonetizationOnIcon,
} from '@material-ui/icons';
import Link from 'next/link';
import { formatCurrency } from 'utils/FormatNumber';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const tabs = [
  { label: 'Thông tin tài khoản', icon: <AccountCircleIcon />, id: 1, link: '/my-account' },
  { label: 'Đơn hàng của tôi', icon: <AssignmentTurnedInIcon />, id: 2, link: '/my-order' },
  { label: 'Giới thiệu bạn bè', icon: <ShareIcon />, id: 3, link: '/users/referrals' },
  {
    label: 'Mã giảm giá của tôi',
    icon: <LocalOfferIcon />,
    id: 4,
    link: '/users/user-promo-codes',
  },
  { label: 'Điểm tích luỹ', icon: <MonetizationOnIcon />, id: 5, link: '/users/loyalty_points' },
];
const InfoTabs = ({ value, name, balance = 0 }) => (
  <div className={styles.tab_box}>
    <div className={styles.account_name}>
      Tài khoản của
      <Typography variant="h5" className={styles.name}>
        {name}
      </Typography>
    </div>
    <MenuList>
      {tabs.map((tab) => (
        <Link href={tab.link} key={`tab-${uuidv4()}`}>
          <MenuItem
            button={false}
            classes={{ root: value === tab.id ? styles.tab_active : styles.tab_inactive }}
            value={tab.id}
          >
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <Typography variant="inherit">{tab.label}</Typography>
          </MenuItem>
        </Link>
      ))}
    </MenuList>
    <Typography>Ví - &nbsp; {formatCurrency(balance)}</Typography>
  </div>
);

export default InfoTabs;
