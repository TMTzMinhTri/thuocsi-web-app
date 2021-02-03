import React from 'react';
import { Paper, FormControlLabel, RadioGroup, Radio, FormControl } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import styles from './styles.module.css';

const FastDelivery = (
  <>
    <b className={styles.fw500}>Giao hàng nhanh</b>
    {/* (Tính thêm{' '}
    <b className={styles.fw500}>30.000đ</b>) */}
  </>
);

const FastMovingDelivery = (
  <>
    <b className={styles.fw500}>Giao hàng siêu tốc</b>
    {/* (Tính thêm{' '}
    <b className={styles.fw500}>30.000đ</b>) */}
  </>
);

const DeliveryMethod = ({ handleChange, selectedValue, isValid = false }) => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}>Hình thức giao hàng</h1>

    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={selectedValue} onChange={handleChange}>
        <FormControlLabel
          value="standard"
          control={<Radio classes={{ root: clsx(styles.checkbox, styles.checkbox_color) }} />}
          label={<b className={styles.fw500}>Giao hàng tiêu chuẩn</b>}
        />
        <FormControlLabel
          value="quick"
          disabled={!isValid}
          control={<Radio classes={{ root: styles.checkbox }} />}
          label={FastDelivery}
        />
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

        <FormControlLabel
          value="fast_moving"
          disabled={!isValid}
          control={<Radio classes={{ root: styles.checkbox }} />}
          label={FastMovingDelivery}
        />
        <Alert className={styles.checkout_description} icon={false} severity="info">
          <p>
            <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
            Nếu đặt hàng <b>trong 12 giờ</b>, cam kết giao trong ngày
          </p>
          <p>
            <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
            Nếu đặt hàng <b>sau 12 giờ</b>, cam kết giao <b> trước 12h ngày hôm sau </b>
          </p>
          <p>
            <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
            Chỉ áp dụng cho đơn hàng <b>tại TP.HCM</b> , không áp dụng cho <b>huyện Củ Chi</b> và{' '}
            <b>huyện Cần Giờ</b>
          </p>
          <p>
            <FontAwesomeIcon className={styles.icon} icon={faInfoCircle} />
            Không áp dụng giao hàng nhanh <b>ngày thứ bảy, chủ nhật</b> và các ngày <b>lễ tết</b>.
          </p>
        </Alert>
      </RadioGroup>
    </FormControl>
  </Paper>
);

export default DeliveryMethod;
