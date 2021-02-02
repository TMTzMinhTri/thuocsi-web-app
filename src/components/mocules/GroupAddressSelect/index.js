import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { AddressClient } from 'clients';
import { v4 as uuidV4 } from 'uuid';
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
  handleChangeAddress,
}) => {
  const [address, setAddress] = useState({
    provinces: DEFAULT_PROVINCE_ARRAY,
    districts: DEFAULT_DISTRICT_ARRAY,
    wards: DEFAULT_WARD_ARRAY,
    position: ADDRESS_POS.PROVINCE,
  });

  async function getProvinces() {
    const res = await AddressClient.getProvinces();
    return [...DEFAULT_PROVINCE_ARRAY, ...res];
  }

  async function getDistricts(prv) {
    const res = await AddressClient.getDistrictsByProvince(prv);
    return [...DEFAULT_DISTRICT_ARRAY, ...res];
  }

  async function getWards(dist) {
    const res = await AddressClient.getWardsByDistrict(dist);
    return [...DEFAULT_WARD_ARRAY, ...res];
  }

  useEffect(() => {
    async function loadData() {
      const provinces = await getProvinces();
      let districts = DEFAULT_DISTRICT_ARRAY;
      let wards = DEFAULT_WARD_ARRAY;
      let position = ADDRESS_POS.PROVINCE;
      if (province !== DEFAULT_PROVINCE_ARRAY[0].value) {
        position = ADDRESS_POS.DISTRICT;
        districts = await getDistricts(province);
      }
      if (district !== DEFAULT_DISTRICT_ARRAY[0].value) {
        position = ADDRESS_POS.WARD;
        wards = await getWards(district);
      }
      setAddress({
        provinces,
        districts,
        wards,
        position,
      });
    }
    loadData();
  }, []);

  const handleChangeProvince = async (e) => {
    const prv = e.target.value;
    handleChangeAddress(
      idProvince,
      idDistrict,
      idWard,
      prv,
      DEFAULT_DISTRICT_ARRAY[0].value,
      DEFAULT_WARD_ARRAY[0].value,
    );

    if (prv === DEFAULT_PROVINCE_ARRAY[0].value) {
      setAddress({
        ...address,
        position: ADDRESS_POS.PROVINCE,
        districts: DEFAULT_DISTRICT_ARRAY,
        wards: DEFAULT_WARD_ARRAY,
      });
    } else {
      const districts = await getDistricts(prv);
      setAddress({
        ...address,
        position: ADDRESS_POS.DISTRICT,
        districts,
        wards: DEFAULT_WARD_ARRAY,
      });
    }
  };

  const handleChangeDistrict = async (e) => {
    const dist = e.target.value;
    handleChangeAddress(
      idProvince,
      idDistrict,
      idWard,
      province,
      dist,
      DEFAULT_WARD_ARRAY[0].value,
    );

    if (dist === DEFAULT_DISTRICT_ARRAY[0].value) {
      setAddress({
        ...address,
        position: ADDRESS_POS.DISTRICT,
        wards: DEFAULT_WARD_ARRAY,
      });
    } else {
      const wards = await getWards(dist);
      setAddress({
        ...address,
        position: ADDRESS_POS.WARD,
        wards,
      });
    }
  };

  const handleChangeWard = async (e) => {
    handleChangeAddress(idProvince, idDistrict, idWard, province, district, e.target.value);
  };

  return (
    <Grid className={styles.address_field} container spacing={3} style={{marginTop: '10px'}}>
      <AddressSelect
        label={<span className={styles.fw500}>Tỉnh/Thành phố</span>}
        id={uuidV4()}
        value={province}
        onChange={handleChangeProvince}
        options={address.provinces}
      />
      <AddressSelect
        id={uuidV4()}
        value={district}
        onChange={handleChangeDistrict}
        options={address.districts}
        label={<span className={styles.fw500}>Quận/Huyện</span>}
        disabled={ADDRESS_POS.DISTRICT > address.position}
      />

      <AddressSelect
        id={uuidV4()}
        value={ward}
        onChange={handleChangeWard}
        options={address.wards}
        label={<span className={styles.fw500}>Phường/Xã</span>}
        disabled={ADDRESS_POS.WARD > address.position}
      />
    </Grid>
  );
};

export default GroupAddressSelect;
