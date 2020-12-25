import React from 'react';
import { Paper, Grid, Button, InputAdornment } from '@material-ui/core';
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

const ButtonUploadFile = () => (
  <InputAdornment>
    <Button color="default" variant="contained">
      Browser
    </Button>
  </InputAdornment>
);

const EnterpriseForm = ({
  scope,
  drugstoreName,
  bussinessName,
  taxId,
  bussinessAddress,
  billWard,
  billDistrict,
  billProvince,
  handleSetValue,
}) => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}> Thông tin doanh nghiệp </h1>
    <Grid container spacing={2}>
      <InfoFormControl xs={3} label="Bạn là" htmlFor="scope">
        <InfoInput id="scope" value={scope} disabled />
      </InfoFormControl>

      <InfoFormControl xs={9} label="Tên nhà thuốc/phòng khám" htmlFor="drugstoreName">
        <InfoInput
          id="drugstoreName"
          placeholder="Dược Hoàng Vũ"
          value={drugstoreName}
          onChange={(e) => handleSetValue('drugstoreName', e.target.value)}
        />
      </InfoFormControl>

      <InfoFormControl xs={12} label="Tên người đại diện pháp luật" htmlFor="bussinessName">
        <InfoInput
          id="bussinessName"
          placeholder="Trần Thị B"
          value={bussinessName}
          onChange={(e) => handleSetValue('bussinessName', e.target.value)}
        />
      </InfoFormControl>

      <InfoFormControl
        xs={12}
        label="Giấy phép kinh doanh phòng khám/nhà thuốc"
        htmlFor="license"
        variant="contained"
      >
        <InfoInput
          id="license"
          endAdornment={<ButtonUploadFile />}
          component="span"
          htmlFor="icon-button-file"
        />
      </InfoFormControl>
    </Grid>
    <h1 className={styles.title}> Thông tin xuất hoá đơn </h1>
    <Grid container spacing={2}>
      <InfoFormControl xs={12} label="Mã số thuế" htmlFor="taxId">
        <InfoInput
          id="taxId"
          placeholder="8026906145"
          value={taxId}
          onChange={(e) => {
            handleSetValue('taxId', e.target.value);
          }}
        />
      </InfoFormControl>
      <InfoFormControl xs={12} label="Địa chỉ nhà thuốc/phòng khám" htmlFor="address">
        <InfoInput
          id="address"
          placeholder="11 Ngô Quyền, Tân Lợi, Tp. Buôn Ma Thuột, Đắk Lắk"
          value={bussinessAddress}
          onChange={(e) => {
            handleSetValue('bussinessAddress', e.target.value);
          }}
        />
      </InfoFormControl>
    </Grid>

    <Grid container spacing={3}>
      <AddressSelect
        label="Tỉnh/Thành phố"
        id="billProvince"
        value={billProvince}
        onChange={(e) => handleSetValue('billProvince', e.target.value)}
        options={provinceOptions}
      />
      <AddressSelect
        id="billDistrict"
        value={billDistrict}
        onChange={(e) => handleSetValue('billDistrict', e.target.value)}
        options={districtOptions}
        label="Quận/Huyện"
      />

      <AddressSelect
        id="billWard"
        value={billWard}
        onChange={(e) => handleSetValue('billWard', e.target.value)}
        options={wardOptions}
        label="Phường/Xã"
      />
    </Grid>
  </Paper>
);

export default EnterpriseForm;
