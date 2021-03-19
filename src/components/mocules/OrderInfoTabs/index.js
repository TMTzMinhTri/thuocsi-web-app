import React from 'react';
import { withStyles, Grid, Tabs, Tab, Paper } from '@material-ui/core';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { Button } from 'components/atoms';
import { v4 as uuidV4 } from 'uuid';
import { useRouter } from 'next/router';
import styled from 'styled-components';
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

const ComeHomeButton = styled(Button)`
  color: #fff !important;
  background-color: #00b46e !important;
  border-color: #00b46e !important;
  border: 1px solid transparent !important;
  padding: 0.375rem 0.75rem !important;
  font-size: 1rem !important;
  line-height: 1.5 !important;
  border-radius: 50px !important;
  text-transform: none !important;
`;

const tabs = [
  { label: 'Tất cả', value: ENUM_ORDER_STATUS.ALL },
  { label: 'Chờ Xác Nhận', value: ENUM_ORDER_STATUS.PENDING },
  { label: 'Đã Xác Nhận', value: ENUM_ORDER_STATUS.CONFIRM },
  { label: 'Đang Giao', value: ENUM_ORDER_STATUS.DELIVERY },
  { label: 'Hoàn Tất', value: ENUM_ORDER_STATUS.COMPLETED },
  { label: 'Huỷ', value: ENUM_ORDER_STATUS.CANCEL },
];

export default function OrderInfoTabs({ user, orders, status, bankInfo, reasonsList }) {
  const router = useRouter();

  const handleChangeOrderStatus = (statusR) => {
    router.push(`${router.pathname}?status=${statusR}`);
  };

  const handleComehome = () => {
    router.push('/');
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} className={styles.tabs}>
        <Paper elevation={0}>
          <Tabs
            value={status}
            textColor="primary"
            centered
            classes={{ indicator: styles.indicator }}
          >
            {tabs.map((tab) => (
              <CustomTab
                key={uuidV4()}
                label={tab.label}
                disableFocusRipple
                disableRipple
                onClick={() => handleChangeOrderStatus(tab.value)}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Paper>
      </Grid>
      {orders.length === 0 ? (
        <Grid item xs={12} container justify="center">
          <div className={styles.not_order_container}>
            <div className={styles.not_order_title}>Không có đơn hàng</div>
            <div>
              <ComeHomeButton onClick={handleComehome}> Về trang đặt hàng nhanh </ComeHomeButton>
            </div>
          </div>
        </Grid>
      ) : (
        <Grid item xs={12}>
          {orders.map((order) => (
            <OrderRow
              {...order}
              key={uuidV4()}
              user={user}
              handleSetOrderStatus={handleChangeOrderStatus}
              bankInfo={bankInfo}
              reasonsList={reasonsList}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
}
