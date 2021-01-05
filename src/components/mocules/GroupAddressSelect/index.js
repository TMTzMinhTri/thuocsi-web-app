import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AddressClient } from 'clients';
import AddressSelect from '../AddressSelect';

import styles from './styles.module.css';

const ADDRESS_POS = {
  PROVINCE: 0,
  DISTRICT: 1,
  WARD: 2,
};

const GroupAddressSelect = ({
  province = 0,
  district = 0,
  ward,
  idProvince,
  idDistrict,
  idWard,
  handleSetValue,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([{ value: 0, label: 'Chọn Quận/Huyện ...' }]);
  const [wards, setWards] = useState([{ value: 0, label: 'Chọn Phường/Xã ...' }]);
  const [pos, setPos] = useState(ADDRESS_POS.PROVINCE);
  const router = useRouter();

  useEffect(() => {
    async function getProvinces() {
      try {
        const res = await AddressClient.getProvinces();
        const prov = [{ value: 0, label: 'Chọn Tinh/Thành phố ...' }, ...res];
        setProvinces(prov);
        setDistricts([{ value: 0, label: 'Chọn Quận/Huyện ...' }]);
        setWards([{ value: 0, label: 'Chọn Phường/Xã ...' }]);
      } catch {
        router.push('/');
      }
    }
    getProvinces();
  }, []);

  useEffect(() => {
    async function getDistricts() {
      const res = await AddressClient.getDistrictsByProvince(province);
      setDistricts([{ value: 0, label: 'Chọn Quận/Huyện ...' }, ...res]);
      setWards([{ value: 0, label: 'Chọn Phường/Xã ...' }]);
      setPos(ADDRESS_POS.DISTRICT);
    }
    if (String(province) !== '0') getDistricts();
    else {
      setPos(ADDRESS_POS.PROVINCE);
      setDistricts([{ value: 0, label: 'Chọn Quận/Huyện ...' }]);
      setWards([{ value: 0, label: 'Chọn Phường/Xã ...' }]);
    }
  }, [province]);

  useEffect(() => {
    async function getWards() {
      const res = await AddressClient.getWardsByDistrict(district);
      setWards([{ value: 0, label: 'Chọn Phường/Xã ...' }, ...res]);
      setPos(ADDRESS_POS.WARD);
    }

    if (String(district) !== '0') getWards();
    else {
      setWards([{ value: 0, label: 'Chọn Phường/Xã ...' }]);
    }
    if (String(district) === '0' && String(province) !== '0') { setPos(ADDRESS_POS.DISTRICT); }
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
