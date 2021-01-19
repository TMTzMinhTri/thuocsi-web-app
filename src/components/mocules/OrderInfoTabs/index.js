import React from 'react';
import { withStyles, Grid, Tabs, Tab, Paper } from '@material-ui/core';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import OrderRow from './OrderRow';
import styles from './styles.module.css';

const CustomTab = withStyles({
  root: {
    textTransform: 'none',
  },
  selected: {
    color: '#00b46e!important',
    fontWeight: 'bold',
  },
})(Tab);

export default function OrderInfoTabs({ orders, handleSetOrderStatus, user }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} className={styles.tabs}>
        <Paper elevation={0}>
          <Tabs
            value={value}
            textColor="primary"
            onChange={handleChange}
            centered
            classes={{ indicator: styles.indicator }}
          >
            <CustomTab
              label="Tất Cả"
              disableFocusRipple
              disableRipple
              onClick={() => handleSetOrderStatus(ENUM_ORDER_STATUS.ALL)}
            />
            <CustomTab
              label="Chờ Xác Nhận"
              disableFocusRipple
              disableRipple
              onClick={() => handleSetOrderStatus(ENUM_ORDER_STATUS.PENDING)}
            />
            <CustomTab
              label="Hoàn Tất"
              disableFocusRipple
              disableRipple
              onClick={() => handleSetOrderStatus(ENUM_ORDER_STATUS.COMPLETED)}
            />
            <CustomTab
              label="Huỷ"
              disableFocusRipple
              disableRipple
              onClick={() => handleSetOrderStatus(ENUM_ORDER_STATUS.CANCEL)}
            />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {orders.map((order) => (
          <OrderRow {...order} key={order.orderID} name={user?.name} phone={user?.phone} />
        ))}
      </Grid>
    </Grid>
  );
}
