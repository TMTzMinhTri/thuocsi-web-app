import React from 'react';
import { Paper, Grid, FormHelperText } from '@material-ui/core';
import { InfoFormControl } from 'components/atoms';
import { v4 as uuidv4 } from 'uuid';
import InfoInput from '../InfoInput';
import GroupAddressSelect from '../GroupAddressSelect';
import styles from './styles.module.css';

const DeliveryForm = ({
  deliveryProvinceCode,
  deliveryDistrictCode,
  deliveryWardCode,
  handleSetValue,
  handleChangeAddress,
  error,
}) => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}> Thông tin giao hàng </h1>
    <Grid container spacing={2} className={styles.addressGrid}>
      <InfoFormControl xs={12} label="Địa chỉ giao hàng" htmlFor="address">
        <InfoInput id="address" placeholder="Địa chỉ giao hàng" />
        <FormHelperText>
          Nhập địa chỉ, đường phố. Rồi chọn tỉnh/thành phố, phường/xã, quận/huyện
        </FormHelperText>
      </InfoFormControl>
    </Grid>
    <GroupAddressSelect
      id={uuidv4()}
      idProvince="province"
      province={deliveryProvinceCode}
      idDistrict="district"
      district={deliveryDistrictCode}
      idWard="ward"
      ward={deliveryWardCode}
      handleSetValue={handleSetValue}
      handleChangeAddress={handleChangeAddress}
      error={error}
    />
  </Paper>
);

export default DeliveryForm;
