import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { InfoFormControl } from 'components/atoms';
import InfoInput from '../InfoInput';
import GroupAddressSelect from '../GroupAddressSelect';
import styles from './styles.module.css';

const DeliveryForm = ({ province, district, ward, handleSetValue }) => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}> Thông tin giao hàng </h1>
    <Grid container spacing={2}>
      <InfoFormControl xs={12} label="Địa chỉ giao hàng" htmlFor="address">
        <InfoInput id="address" placeholder="11 Ngô Quyền, Tân Lợi, Tp. Buôn Ma Thuột, Đắk Lắk" />
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
    />
  </Paper>
);

export default DeliveryForm;
