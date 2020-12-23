import React from 'react';
import { withStyles, Grid, Tabs, Tab, Paper, makeStyles } from '@material-ui/core';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import OrderRow from './OrderRow';

const useStyles = makeStyles({
  indicator: {
    display: 'none',
  },
});

const CustomTab = withStyles({
  root: {
    textTransform: 'none',
  },
  selected: {
    color: '#00b46e!important',
    fontWeight: 'bold',
  },
})(Tab);

export default function OrderInfoTabs({ orders, handleSetOrderStatus }) {
  const [value, setValue] = React.useState(2);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper square elevation={4}>
          <Tabs
            value={value}
            textColor="primary"
            onChange={handleChange}
            centered
            classes={{ indicator: classes.indicator }}
          >
            <CustomTab
              label="Tất Cả"
              disableFocusRipple
              disableRipple
              onClick={() => handleSetOrderStatus(ENUM_ORDER_STATUS.ALL)}
              selected
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
          <OrderRow {...order} />
        ))}
      </Grid>
    </Grid>
  );
}
