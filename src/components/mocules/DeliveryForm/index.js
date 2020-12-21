import React from 'react';
import { Paper, Grid, NativeSelect } from '@material-ui/core';
import { InputInfo, InfoFormControl } from 'components/atoms';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './styles.module.css';

const DeliveryForm = () => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}> Thông tin giao hàng </h1>
    <Grid container spacing={2}>
      <InfoFormControl xs={12} label="Địa chỉ giao hàng" htmlFor="address">
        <InputInfo id="address" placeholder="11 Ngô Quyền, Tân Lợi, Tp. Buôn Ma Thuột, Đắk Lắk" />
      </InfoFormControl>
    </Grid>

    <Grid container spacing={3}>
      <InfoFormControl xs={4} label="Tỉnh/Thành phố" htmlFor="province" isRequired>
        <NativeSelect id="province" input={<InputInfo />} IconComponent={ExpandMoreIcon}>
          <option value="" aria-label="None">
            Chọn Tỉnh/Thành Phố...
          </option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </InfoFormControl>

      <InfoFormControl xs={4} label="Quận/Huyện" htmlFor="district" isRequired>
        <NativeSelect id="district" input={<InputInfo />} IconComponent={ExpandMoreIcon}>
          <option value="" aria-label="None">
            Chọn Quận/Huyện...
          </option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </InfoFormControl>

      <InfoFormControl xs={4} label="Phường/Xã" htmlFor="ward" isRequired>
        <NativeSelect id="ward" input={<InputInfo />} IconComponent={ExpandMoreIcon}>
          <option value="" aria-label="None">
            Chọn Phường/Xã...
          </option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </InfoFormControl>
    </Grid>
  </Paper>
);

export default DeliveryForm;
