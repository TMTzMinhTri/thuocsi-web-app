import React from 'react';
import {
  Paper,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import styles from './styles.module.css';

const DeliveryMethod = ({ handleChange, selectedValue }) => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}>
      Hình thức giao hàng
    </h1>

    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel
          value="normal"
          control={<Radio classes={{ root: clsx(styles.checkbox, styles.checkbox_color) }} />}
          label={<b className={styles.fw500}>Giao hàng tiêu chuẩn</b>}
        />
        <FormControlLabel
          value="fast"
          disabled
          control={<Radio classes={{ root: styles.checkbox }} />}
          label={(
            <>
              <b className={styles.fw500}>Giao hàng nhanh</b> (Tính thêm{' '}
              <b className={styles.fw500}>30.000đ</b>)
            </>
            )}
        />
      </RadioGroup>
    </FormControl>

    <Alert className={styles.checkout_description} icon={false} severity="info">
      <p>
        <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
        Cam kết giao hàng <b>trong 24 giờ</b>
      </p>
      <p>
        <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
        Chỉ áp dụng cho đơn hàng <b>tại TP.HCM</b> , không áp dụng cho <b>huyện Củ Chi</b> và{' '}
        <b>huyện Cần Giờ</b>
      </p>
      <p>
        <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
        Chỉ áp dụng cho giá trị đơn hàng dưới <b>5 triệu đồng</b>
      </p>
      <p>
        <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
        Không áp dụng giao hàng nhanh <b>ngày thứ bảy, chủ nhật</b> và các ngày <b>lễ tết</b>.
      </p>
    </Alert>
  </Paper>
);

export default DeliveryMethod;
