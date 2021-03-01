import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { AddressService } from 'services';
import { v4 as uuidV4 } from 'uuid';
import AddressSelect from '../AddressSelect';

import styles from './styles.module.css';

const DEFAULT_PROVINCE = { label: 'Chọn Tinh/Thành phố ...', value: '0' };
const DEFAULT_DISTRICT = { label: 'Chọn Quận/Huyện ...', value: '0' };
const DEFAULT_WARD = { label: 'Chọn Phường/Xã ...', value: '0' };

const getProvinces = async () => {
  const provinces = await AddressService.getProvinces();
  return [DEFAULT_PROVINCE, ...provinces];
};

const getDistricts = async (prv) => {
  const dists = await AddressService.getDistrictsByProvince(prv);
  return [DEFAULT_DISTRICT, ...dists];
};

const getWards = async (dist) => {
  const wads = await AddressService.getWardsByDistrict(dist);
  return [DEFAULT_WARD, ...wads];
};

const ADDRESS_POS = {
  PROVINCE: 0,
  DISTRICT: 1,
  WARD: 2,
};

const GroupAddressSelect = ({
  province = DEFAULT_PROVINCE.value,
  district = DEFAULT_DISTRICT.value,
  ward = DEFAULT_WARD.value,
  idProvince,
  idDistrict,
  idWard,
  handleChangeAddress,
  error = {},
}) => {
  const [address, setAddress] = useState({
    provinces: [DEFAULT_PROVINCE],
    districts: [DEFAULT_DISTRICT],
    wards: [DEFAULT_WARD],
    position: ADDRESS_POS.PROVINCE,
  });

  useEffect(() => {
    const loadData = async () => {
      const provinces = await getProvinces();

      const addressinfo = {
        provinces,
        districts: [DEFAULT_DISTRICT],
        wards: [DEFAULT_WARD],
        position: ADDRESS_POS.PROVINCE,
      };

      if (province !== DEFAULT_PROVINCE.value) {
        addressinfo.position = ADDRESS_POS.DISTRICT;
        addressinfo.districts = await getDistricts(province);
      }

      if (district !== DEFAULT_DISTRICT.value) {
        addressinfo.position = ADDRESS_POS.WARD;
        addressinfo.wards = await getWards(district);
      }
      setAddress(addressinfo);
    };

    loadData();
  }, []);

  const handleChangeProvince = async (e) => {
    const prv = e.target.value;

    handleChangeAddress(
      idProvince,
      idDistrict,
      idWard,
      prv,
      DEFAULT_DISTRICT.value,
      DEFAULT_WARD.value,
    );

    if (prv === DEFAULT_PROVINCE.value) {
      address.position = ADDRESS_POS.PROVINCE;
      address.districts = [DEFAULT_DISTRICT];
    } else {
      address.districts = await getDistricts(prv);
      address.position = ADDRESS_POS.DISTRICT;
    }

    address.wards = [DEFAULT_WARD];
    setAddress(address);
  };

  const handleChangeDistrict = async (e) => {
    const dist = e.target.value;
    handleChangeAddress(idProvince, idDistrict, idWard, province, dist, DEFAULT_WARD.value);

    if (dist === DEFAULT_DISTRICT.value) {
      address.position = ADDRESS_POS.DISTRICT;
      address.wards = [DEFAULT_WARD];
    } else {
      address.position = ADDRESS_POS.WARD;
      address.wards = await getWards(dist);
    }
    setAddress(address);
  };

  const handleChangeWard = async (e) => {
    handleChangeAddress(idProvince, idDistrict, idWard, province, district, e.target.value);
  };

  return (
    <Grid className={styles.address_field} container spacing={3} style={{ marginTop: '10px' }}>
      <AddressSelect
        label={<span className={styles.fw500}>Tỉnh/Thành phố</span>}
        id={uuidV4()}
        value={province || 0}
        onChange={handleChangeProvince}
        options={address.provinces}
        error={error.province}
      />
      <AddressSelect
        id={uuidV4()}
        value={district || 0}
        onChange={handleChangeDistrict}
        options={address.districts}
        label={<span className={styles.fw500}>Quận/Huyện</span>}
        disabled={ADDRESS_POS.DISTRICT > address.position}
        error={error.district}
      />

      <AddressSelect
        id={uuidV4()}
        value={ward || 0}
        onChange={handleChangeWard}
        options={address.wards}
        label={<span className={styles.fw500}>Phường/Xã</span>}
        disabled={ADDRESS_POS.WARD > address.position}
        error={error.ward}
      />
    </Grid>
  );
};

export default GroupAddressSelect;
