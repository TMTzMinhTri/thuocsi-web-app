import React from 'react';
import { Paper, Grid, Button, InputAdornment, NativeSelect } from '@material-ui/core';
import { InputInfo, InfoFormControl } from 'components/atoms';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './styles.module.css';

const ButtonUploadFile = () => (
  <InputAdornment>
    <Button color="default" variant="contained">
      Browser
    </Button>
  </InputAdornment>
);

const EnterpriseForm = () => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}> Thông tin doanh nghiệp </h1>
    <Grid container spacing={2}>
      <InfoFormControl xs={3} label="Bạn là" htmlFor="nameIs">
        <InputInfo id="nameIs" value="Nhà thuốc" disabled />
      </InfoFormControl>

      <InfoFormControl xs={9} label="Tên nhà thuốc/phòng khám" htmlFor="drugstoreName">
        <InputInfo id="drugstoreName" placeholder="Dược Hoàng Vũ" />
      </InfoFormControl>

      <InfoFormControl xs={12} label="Tên người đại diện pháp luật" htmlFor="bussinessName">
        <InputInfo id="bussinessName" placeholder="Trần Thị B" />
      </InfoFormControl>

      <InfoFormControl xs={12} label="Giấy phép kinh doanh phòng khám/nhà thuốc" htmlFor="license">
        <InputInfo
          id="license"
          endAdornment={<ButtonUploadFile />}
          component="span"
          variant="contained"
        />
      </InfoFormControl>
    </Grid>
    <h1 className={styles.title}> Thông tin xuất hoá đơn </h1>
    <Grid container spacing={2}>
      <InfoFormControl xs={12} label="Mã số thuế" htmlFor="taxId">
        <InputInfo id="taxId" placeholder="8026906145" />
      </InfoFormControl>
      <InfoFormControl xs={12} label="Địa chỉ nhà thuốc/phòng khám" htmlFor="address">
        <InputInfo id="address" placeholder="11 Ngô Quyền, Tân Lợi, Tp. Buôn Ma Thuột, Đắk Lắk" />
      </InfoFormControl>
    </Grid>

    <Grid container spacing={3}>
      <InfoFormControl xs={4} label="Tỉnh/Thành phố" htmlFor="province" isRequired>
        <NativeSelect id="province" input={<InputInfo />} IconComponent={ExpandMoreIcon}>
          <option value="" aria-label="None">
            Chọn Tỉnh/Thành Phố...
          </option>
          <option value={10}>Tp.Hồ Chí Minh</option>
          <option value={20}>Hà Nội</option>
          <option value={30}>Đồng Nai</option>
        </NativeSelect>
      </InfoFormControl>

      <InfoFormControl xs={4} label="Quận/Huyện" htmlFor="district" isRequired>
        <NativeSelect id="district" input={<InputInfo />} IconComponent={ExpandMoreIcon}>
          <option value="" aria-label="None">
            Chọn Quận/Huyện...
          </option>
          <option value={10}>Quận 1</option>
          <option value={20}>Quận 2</option>
          <option value={30}>Quận 3</option>
        </NativeSelect>
      </InfoFormControl>

      <InfoFormControl xs={4} label="Phường/Xã" htmlFor="ward" isRequired>
        <NativeSelect id="ward" input={<InputInfo />} IconComponent={ExpandMoreIcon}>
          <option value="" aria-label="None">
            Chọn Phường/Xã...
          </option>
          <option value={10}>Phường Long Bình Tân</option>
          <option value={20}>Phường Hoà Bình</option>
          <option value={30}>Phường Thống Nhất</option>
        </NativeSelect>
      </InfoFormControl>
    </Grid>
  </Paper>
);

export default EnterpriseForm;
