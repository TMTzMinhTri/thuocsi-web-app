import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { AddressClient } from 'clients';
import AddressSelect from '../AddressSelect';

import styles from './styles.module.css';

const DEFAULT_PROVINCE_ARRAY = [{ label: 'Chọn Tinh/Thành phố ...', value: '0' }];
const DEFAULT_DISTRICT_ARRAY = [{ label: 'Chọn Quận/Huyện ...', value: '0' }];
const DEFAULT_WARD_ARRAY = [{ label: 'Chọn Phường/Xã ...', value: '0' }];

const ADDRESS_POS = {
  PROVINCE: 0,
  DISTRICT: 1,
  WARD: 2,
};

const GroupAddressSelect = ({
  province = '0',
  district = '0',
  ward = '0',
  idProvince,
  idDistrict,
  idWard,
  handleSetValue,
}) => {
  const [provinces, setProvinces] = useState(DEFAULT_PROVINCE_ARRAY);
  const [districts, setDistricts] = useState(DEFAULT_DISTRICT_ARRAY);
  const [wards, setWards] = useState(DEFAULT_WARD_ARRAY);
  const [pos, setPos] = useState(ADDRESS_POS.PROVINCE);

  useEffect(() => {
    async function getProvinces() {
      const res = await AddressClient.getProvinces();
      setProvinces([...DEFAULT_PROVINCE_ARRAY, ...res]);
      if (district !== '0') setPos(ADDRESS_POS.WARD);
      if (province !== '0') setPos(ADDRESS_POS.DISTRICT);
    }

    getProvinces();
  }, []);

  useEffect(() => {
    async function getDistricts() {
      const res = await AddressClient.getDistrictsByProvince(province);
      setPos(ADDRESS_POS.DISTRICT);
      setWards(DEFAULT_WARD_ARRAY);
      setDistricts([...DEFAULT_DISTRICT_ARRAY, ...res]);
    }
    if (province === DEFAULT_PROVINCE_ARRAY[0].value) {
      handleSetValue(idDistrict, DEFAULT_DISTRICT_ARRAY[0].value);
      setPos(ADDRESS_POS.PROVINCE);
      setDistricts(DEFAULT_DISTRICT_ARRAY);
    } else {
      getDistricts();
    }
  }, [province]);

  useEffect(() => {
    async function getWards() {
      const res = await AddressClient.getWardsByDistrict(district);
      setPos(ADDRESS_POS.WARD);
      setWards([...DEFAULT_WARD_ARRAY, ...res]);
    }
    if (
      district === DEFAULT_DISTRICT_ARRAY[0].value

    ) {
      if (province !== DEFAULT_PROVINCE_ARRAY[0].value) {
        setPos(ADDRESS_POS.DISTRICT);
      }
      handleSetValue(idWard, DEFAULT_WARD_ARRAY[0].value);
      setWards(DEFAULT_WARD_ARRAY);
    } else {
      getWards();
    }
  }, [district]);

  return (
    <Grid container spacing={3}>
      <AddressSelect
        label={<span className={styles.fw500}>Tỉnh/Thành phố</span>}
        id={idProvince}
        value={province}
        onChange={(e) => handleSetValue(idProvince, e.target.value)}
        options={provinces}
      />
      <AddressSelect
        id={idDistrict}
        value={district}
        onChange={(e) => handleSetValue(idDistrict, e.target.value)}
        options={districts}
        label={<span className={styles.fw500}>Quận/Huyện</span>}
        disabled={ADDRESS_POS.DISTRICT > pos}
      />

      <AddressSelect
        id={idWard}
        value={ward}
        onChange={(e) => handleSetValue(idWard, e.target.value)}
        options={wards}
        label={<span className={styles.fw500}>Phường/Xã</span>}
        disabled={ADDRESS_POS.WARD > pos}
      />
    </Grid>
  );
};

export default GroupAddressSelect;
