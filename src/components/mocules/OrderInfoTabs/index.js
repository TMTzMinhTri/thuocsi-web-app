import React from 'react';
import { makeStyles, withStyles, Grid, Tabs, Tab, Paper, Button } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import styles from './styles.module.css';

const useStyles = makeStyles({
  indicator: {
    display: 'none',
  },
  root: {
    padding: '15px',
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

const PrintInvoiceButton = withStyles({
  root: {
    color: ' #212529',
    border: '1px solid #f9b514',
    borderRadius: '20px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    width: '10rem',
    margin: '0.25em',
    backgroundColor: '#f9b514',
    textTransform: 'none',
  },
})(Button);

const EditOrderButton = withStyles({
  root: {
    color: '#00b46e',
    border: '1px solid #00b46e',
    borderRadius: '20px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    width: '10rem',
    margin: '0.25em',
    textTransform: 'none',
  },
})(Button);

const ResponseButton = withStyles({
  root: {
    color: '#17a2b8',
    border: '1px solid #17a2b8',
    borderRadius: '20px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    width: '10rem',
    margin: '0.25em',
    textTransform: 'none',
  },
})(Button);

export default function OrderInfoTabs() {
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
            <CustomTab label="Tất Cả" disableFocusRipple disableRipple />
            <CustomTab label="Chờ Xác Nhận" disableFocusRipple disableRipple />
            <CustomTab label="Hoàn Tất" disableFocusRipple disableRipple />
            <CustomTab label="Huỷ" disableFocusRipple disableRipple />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper square className={classes.root} elevation={4}>
          <Grid container spacing={4}>
            <Grid item xs={5}>
              <div>
                <h4 className={styles.order_id}>#197180 &nbsp; &nbsp;</h4>
                <Button color="default" variant="contained">
                  Chờ xác nhận
                </Button>
              </div>
              <div>
                <span className={styles.order_detail_label}>Sản phẩm: </span> 5
              </div>
              <div>
                <span className={styles.order_detail_label}>Ngày mua: </span>18/12/2020 13:37:48
              </div>
              <div>
                <span className={styles.order_detail_label}> Dự kiến giao ngày: </span>Thứ
                tư(23/12/2020)
              </div>
            </Grid>

            <Grid item xs={3} direction="row">
              <div className={styles.price}> 3.024.100đ</div>
            </Grid>

            <Grid item xs={3}>
              <Grid>
                <PrintInvoiceButton startIcon={<PrintIcon />}> Xuất hoá đơn </PrintInvoiceButton>
              </Grid>
              <Grid>
                <EditOrderButton> Sửa đơn hàng </EditOrderButton>
              </Grid>
              <Grid>
                <ResponseButton startIcon={<InsertCommentIcon />}> Gửi phản hồi</ResponseButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
