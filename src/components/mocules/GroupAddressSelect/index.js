import { Grid } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';
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
  province = DEFAULT_PROVINCE_ARRAY[0].value,
  district = DEFAULT_DISTRICT_ARRAY[0].value,
  ward = DEFAULT_WARD_ARRAY[0].value,
  idProvince,
  idDistrict,
  idWard,
  handleSetValue,
}) => {
  const [provinces, setProvinces] = useState(DEFAULT_PROVINCE_ARRAY);
  const [districts, setDistricts] = useState(DEFAULT_DISTRICT_ARRAY);
  const [wards, setWards] = useState(DEFAULT_WARD_ARRAY);
  const [pos, setPos] = useState(ADDRESS_POS.PROVINCE);
  const isProvinceChange = useRef(true);
  const isDistrictChange = useRef(true);

  async function getProvinces() {
    const res = await AddressClient.getProvinces();
    setProvinces([...DEFAULT_PROVINCE_ARRAY, ...res]);
  }

  async function getDistricts() {
    const res = await AddressClient.getDistrictsByProvince(province);
    setDistricts([...DEFAULT_DISTRICT_ARRAY, ...res]);
  }

  async function getWards() {
    const res = await AddressClient.getWardsByDistrict(district);
    setWards([...DEFAULT_WARD_ARRAY, ...res]);
  }

  useEffect(() => {
    getProvinces();
    if (province !== DEFAULT_PROVINCE_ARRAY[0].value) {
      setPos(ADDRESS_POS.DISTRICT);
    }

    if (district !== DEFAULT_DISTRICT_ARRAY[0].value) {
      setPos(ADDRESS_POS.WARD);
    }
  }, []);

  useEffect(() => {
    if (isProvinceChange.current) {
      isProvinceChange.current = false;
    } else {
      handleSetValue(idDistrict, DEFAULT_DISTRICT_ARRAY[0].value);
      handleSetValue(idWard, DEFAULT_WARD_ARRAY[0].value);
    }

    if (province === DEFAULT_PROVINCE_ARRAY[0].value) {
      setPos(ADDRESS_POS.PROVINCE);
      setDistricts(DEFAULT_DISTRICT_ARRAY);
      setWards(DEFAULT_WARD_ARRAY);
    } else {
      setPos(ADDRESS_POS.DISTRICT);
      setWards(DEFAULT_WARD_ARRAY);
    }
  }, [province]);

  useEffect(() => {
    if (isDistrictChange.current) {
      isDistrictChange.current = false;
    } else {
      handleSetValue(idWard, DEFAULT_WARD_ARRAY[0].value);
    }

    if (district === DEFAULT_PROVINCE_ARRAY[0].value) {
      setPos(ADDRESS_POS.DISTRICT);
      setWards(DEFAULT_WARD_ARRAY);
    } else {
      setPos(ADDRESS_POS.WARD);
    }
  }, [district]);

  useEffect(() => {
    if (pos === ADDRESS_POS.PROVINCE) {
      getProvinces();
    }
    if (pos === ADDRESS_POS.DISTRICT) {
      getDistricts();
    }
    if (pos === ADDRESS_POS.WARD) {
      getWards();
    }
  }, [pos]);
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
