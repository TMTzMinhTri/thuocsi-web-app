import React from 'react';
import { Paper, Grid, Button, InputAdornment, useMediaQuery } from '@material-ui/core';
import { InfoFormControl } from 'components/atoms';
import InfoInput from '../InfoInput';
import GroupAddressSelect from '../GroupAddressSelect';
import styles from './styles.module.css';

const ButtonUploadFile = () => (
  <InputAdornment>
    <Button color="default" variant="contained" classes={{ root: styles.upload_button }}>
      Browse
    </Button>
  </InputAdornment>
);

const EnterpriseForm = ({
  scope,
  legalRepresentative,
  bussinessName,
  mst,
  address,
  wardCode,
  districtCode,
  provinceCode,
  handleSetValue,
}) => {
  const maxWidthScope = useMediaQuery('(max-width:600px)');
  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}> Thông tin doanh nghiệp </h1>
      <Grid container spacing={2}>
        <InfoFormControl xs={maxWidthScope ? 12 : 3} label="Bạn là" htmlFor="scope">
          <InfoInput id="scope" value={scope} disabled />
        </InfoFormControl>

        <InfoFormControl xs={maxWidthScope ? 12 : 9} label="Tên nhà thuốc/phòng khám" htmlFor="legalRepresentative">
          <InfoInput
            id="legalRepresentative"
            placeholder="Dược Hoàng Vũ"
            value={legalRepresentative}
            onChange={(e) => handleSetValue('legalRepresentative', e.target.value)}
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
            placeholder="Chọn file"
            endAdornment={<ButtonUploadFile />}
            component="span"
            htmlFor="icon-button-file"
            style={{ paddingRight: 0, color: 'black' }}
            disabled
            onClick={() => {
              document.getElementById('input-file').click();
            }}
          />
        </InfoFormControl>
      </Grid>
      <h1 className={styles.title}> Thông tin xuất hoá đơn </h1>
      <Grid container spacing={2}>
        <InfoFormControl xs={12} label="Mã số thuế" htmlFor="mst">
          <InfoInput
            id="mst"
            placeholder="8026906145"
            value={mst}
            onChange={(e) => {
              handleSetValue('mst', e.target.value);
            }}
          />
        </InfoFormControl>
        <InfoFormControl xs={12} label="Địa chỉ nhà thuốc/phòng khám" htmlFor="address">
          <InfoInput
            id="address"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => {
              handleSetValue('address', e.target.value);
            }}
          />
        </InfoFormControl>
      </Grid>

      <GroupAddressSelect
        idProvince="provinceCode"
        province={provinceCode}
        idDistrict="districtCode"
        district={districtCode}
        idWard="wardCode"
        ward={wardCode}
        handleSetValue={handleSetValue}
      />
    </Paper>
  );
};

export default EnterpriseForm;
