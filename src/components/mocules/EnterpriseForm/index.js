import React, { useState, useEffect } from 'react';
import { Paper, Grid, Button, InputAdornment } from '@material-ui/core';
import { InfoInput, InfoFormControl } from 'components/atoms';
import { AddressClient } from 'clients';
import AddressSelect from '../AddressSelect';
import styles from './styles.module.css';

const ADDRESS_POS = {
  PROVINCE: 0,
  DISTRICT: 1,
  WARD: 2,
};

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
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [pos, setPos] = useState(ADDRESS_POS.PROVINCE);

  useEffect(() => {
    async function getProvinces() {
      const res = await AddressClient.getProvinces();
      setProvinces(res);
    }
    getProvinces();
  }, []);

  useEffect(() => {
    async function getDistricts() {
      const res = await AddressClient.getDistrictsByProvince(billProvince);
      setDistricts(res);
      setPos(ADDRESS_POS.DISTRICT);
      console.log(res);
    }
    if (billProvince !== 0) getDistricts();
  }, [billProvince]);

  useEffect(() => {
    async function getWards() {
      const res = await AddressClient.getWardsByDistrict(billDistrict);
      setWards(res);
      setPos(ADDRESS_POS.WARD);
    }
    if (billDistrict !== 0) getWards();
  }, [billDistrict]);

  return (
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

      <Grid container spacing={3}>
        <AddressSelect
          label="Tỉnh/Thành phố"
          id="billProvince"
          value={billProvince}
          onChange={(e) => handleSetValue('billProvince', e.target.value)}
          options={provinces}
        />
        <AddressSelect
          id="billDistrict"
          value={billDistrict}
          onChange={(e) => handleSetValue('billDistrict', e.target.value)}
          options={districts}
          label="Quận/Huyện"
          disabled={ADDRESS_POS.DISTRICT > pos}
        />

        <AddressSelect
          id="billWard"
          value={billWard}
          onChange={(e) => handleSetValue('billWard', e.target.value)}
          options={wards}
          label="Phường/Xã"
          disabled={ADDRESS_POS.WARD > pos}
        />
      </Grid>
    </Paper>
  );
};

export default EnterpriseForm;
