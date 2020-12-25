import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { InfoInput, InfoFormControl } from 'components/atoms';
import AddressSelect from '../AddressSelect';
import styles from './styles.module.css';

const provinceOptions = [
  {
    value: '',
    label: 'Chọn Tỉnh/Thành Phố...',
  },
  {
    value: 10,
    label: 'TP.Hồ Chí Minh',
  },
  {
    value: 20,
    label: 'Hà Nội',
  },
];

const districtOptions = [
  {
    value: '',
    label: 'Chọn Tỉnh/Thành Phố...',
  },
  {
    value: 10,
    label: 'Quận 1',
  },
  {
    value: 20,
    label: 'Quận 4',
  },
];

const wardOptions = [
  {
    value: '',
    label: 'Chọn Tỉnh/Thành Phố...',
  },
  {
    value: 10,
    label: 'Phường Long Bình Tân',
  },
  {
    value: 20,
    label: 'Phường Long Bình',
  },
];

const DeliveryForm = () => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}> Thông tin giao hàng </h1>
    <Grid container spacing={2}>
      <InfoFormControl xs={12} label="Địa chỉ giao hàng" htmlFor="address">
        <InfoInput id="address" placeholder="11 Ngô Quyền, Tân Lợi, Tp. Buôn Ma Thuột, Đắk Lắk" />
      </InfoFormControl>
    </Grid>

    <Grid container spacing={3}>
      <AddressSelect label="Tỉnh/Thành phố" id="province" options={provinceOptions} />

      <AddressSelect label="Quận/Huyện" id="district" options={districtOptions} />

      <AddressSelect label="Phường/Xã" id="ward" options={wardOptions} />
    </Grid>
  </Paper>
);

export default DeliveryForm;
