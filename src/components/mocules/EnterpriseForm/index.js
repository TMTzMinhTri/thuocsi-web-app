import React from 'react';
import { Paper, Grid, Button, InputAdornment } from '@material-ui/core';
import { InfoInput, InfoFormControl } from 'components/atoms';
import GroupAddressSelect from '../GroupAddressSelect';
import styles from './styles.module.css';

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
      <input type="file" hidden id="input-file" />
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
          onClick={() => {
            document.getElementById('input-file').click();
          }}
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

    <GroupAddressSelect
      idProvince="billProvince"
      province={billProvince}
      idDistrict="billDistrict"
      district={billDistrict}
      idWard="billWard"
      ward={billWard}
      handleSetValue={handleSetValue}
    />
  </Paper>
);

export default EnterpriseForm;
