import React from 'react';
import { Paper, Grid, FormHelperText } from '@material-ui/core';
import { InfoFormControl } from 'components/atoms';
import InfoInput from '../InfoInput';
import GroupAddressSelect from '../GroupAddressSelect';
import styles from './styles.module.css';

const DeliveryForm = ({ province, district, ward, handleSetValue, handleChangeAddress }) => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}> Thông tin giao hàng </h1>
    <Grid container spacing={2}>
      <InfoFormControl xs={12} label="Địa chỉ giao hàng" htmlFor="address">
        <InfoInput id="address" placeholder="Địa chỉ giao hàng" />
        <FormHelperText>Nhập địa chỉ, đường phố. Rồi chọn tỉnh/thành phố, phường/xã, quận/huyện</FormHelperText>
      </InfoFormControl>
    </Grid>
    <GroupAddressSelect
      idProvince="province"
      province={province}
      idDistrict="district"
      district={district}
      idWard="ward"
      ward={ward}
      handleSetValue={handleSetValue}
      handleChangeAddress={handleChangeAddress}
    />
  </Paper>
);

export default DeliveryForm;
