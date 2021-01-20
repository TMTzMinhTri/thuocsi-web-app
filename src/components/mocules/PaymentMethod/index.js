import React from 'react';
import {
  Paper,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';

import styles from './styles.module.css';

const PaymentMethod = ({ handleChange, selectedValue }) => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}>Hình thức thanh toán</h1>

    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        <FormControlLabel
          value="COD"
          control={<Radio classes={{ root: clsx(styles.checkbox, styles.checkbox_color) }} />}
          label={<b className={styles.fw500}>Thanh toán tiền mặt khi nhận hàng</b>}
        />
        <FormControlLabel
          value="CK"
          control={<Radio classes={{ root: clsx(styles.checkbox, styles.checkbox_color) }} />}
          label={(
            <b className={styles.fw500}>
              Chuyển khoản <a href="https://thuocsi.zendesk.com/hc/vi/articles/360029773811-Thanh-to%C3%A1n-b%E1%BA%B1ng-h%C3%ACnh-th%E1%BB%A9c-chuy%E1%BB%83n-kho%E1%BA%A3n-nh%C6%B0-th%E1%BA%BF-n%C3%A0o-">(Hướng dẫn chuyển khoản)</a>
            </b>
            )}
        />
      </RadioGroup>
    </FormControl>

    <span className={styles.text_muted}>Giảm 0.5% cho đơn hàng chuyển khoản trước.</span>

    <Alert className={styles.bank_info} icon={false} severity="info">
      <div className={styles.d_flex}>
        <div className={styles.bank_info_label}>Chủ tài khoản</div>
        <div className={styles.bank_info_content}>Công Ty TNHH Buymed</div>
      </div>
      <div className={styles.d_flex}>
        <div className={styles.bank_info_label}>Số tài khoản</div>
        <div className={styles.bank_info_content}>1913 45430 30020</div>
      </div>
      <div className={styles.d_flex}>
        <div className={styles.bank_info_label}>Ngân hàng</div>
        <div className={styles.bank_info_content}>Ngân hàng Techcombank - Chi nhánh Bắc Hải</div>
      </div>
      <div className={styles.d_flex}>
        <div className={styles.bank_info_label}>Nội dung</div>
        <div className={styles.bank_info_content}>Mã đơn hàng - Tên nhà thuốc</div>
      </div>
    </Alert>
  </Paper>
);

export default PaymentMethod;
