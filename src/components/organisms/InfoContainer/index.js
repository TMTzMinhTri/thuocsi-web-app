import React from 'react';
import { makeStyles, Tabs, Tab } from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Share as ShareIcon,
  LocalOffer as LocalOfferIcon,
} from '@material-ui/icons';
import AccountInfoFormContainer from '../AccountInfoContainer';
import OrderInfoContainer from '../OrderInfoContainer';

const TabPanel = ({ value, index, children }) => <>{value === index ? children : null}</>;

const tabs = [
  { label: 'Thông tin tài khoản', icon: <AccountCircleIcon />, id: 1 },
  { label: 'Giới thiệu bạn bè', icon: <AssignmentTurnedInIcon />, id: 2 },
  { label: 'Mã giảm giá của tôi', icon: <ShareIcon />, id: 3 },
  { label: 'Điểm tích luỹ', icon: <LocalOfferIcon />, id: 4 },
];

const useStyles = makeStyles(() => ({
  tabRoot: {
    width: '100%',
    height: '40px!important',
    padding: '0',
    minHeight: '40px!important',
  },
  tabSelected: {
    color: '#00b46e',
  },
  root: {
    flexGrow: 1,
    backgroundColor: 'inherit',
    display: 'flex',
  },
  tabs: {
    width: '35%',
  },
  indicator: {
    display: 'none',
  },
  tabWrapper: {
    '& > span': {
      display: 'flex',
      flexDirection: 'row!important',
      justifyContent: 'flex-start',
      height: '40px',

      '& > svg': {
        marginRight: '10px',
      },
    },
    textTransform: 'none!important',
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        classes={{ indicator: classes.indicator }}
      >
        {tabs.map((tab, index) => (
          <Tab
            label={tab.label}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
            fullWidth
            icon={tab.icon}
            centered="false"
            className={classes.tabWrapper}
            disableFocusRipple
            disableRipple
            classes={{
              root: classes.tabRoot,
              wrapper: classes.tabWrapper,
              selected: classes.tabSelected,
            }}
            key={`tab-${tab.id}`}
          />
        ))}
      </Tabs>

      <TabPanel value={value} index={0}>
        <AccountInfoFormContainer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderInfoContainer />
      </TabPanel>
    </div>
  );
}
