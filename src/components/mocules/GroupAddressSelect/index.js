import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { AddressService } from 'services';
import { v4 as uuidV4 } from 'uuid';
import AddressSelect from '../AddressSelect';

import styles from './styles.module.css';

const DEFAULT_PROVINCE = { label: 'Chọn Tinh/Thành phố ...', value: '0' };
const DEFAULT_DISTRICT = { label: 'Chọn Quận/Huyện ...', value: '0' };
const DEFAULT_WARD = { label: 'Chọn Phường/Xã ...', value: '0' };
const UNFIND_WARD = { value: null };

const getProvinces = async () => {
  const provinces = await AddressService.getProvinces();
  return [DEFAULT_PROVINCE, ...provinces];
};

const getDistricts = async (prv) => {
  const dists = await AddressService.getDistrictsByProvince(prv);
  return [DEFAULT_DISTRICT, ...dists];
};

const getWards = async (dist) => {
  const wards = await AddressService.getWardsByDistrict(dist);
  if (wards.length === 0) {
    return [UNFIND_WARD];
  }
  return [DEFAULT_WARD, ...wards];
};

const GroupAddressSelect = ({
  province = DEFAULT_PROVINCE.value,
  district = DEFAULT_DISTRICT.value,
  ward = DEFAULT_WARD.value,
  idProvince,
  idDistrict,
  idWard,
  handleChangeAddress,
  setAddress: handleSetAdress,
  error = {},
}) => {
  const [address, setAddress] = useState({
    provinces: [DEFAULT_PROVINCE],
    districts: [DEFAULT_DISTRICT],
    wards: [DEFAULT_WARD],
  });

  useEffect(() => {
    handleSetAdress(address);
  }, [address]);

  useEffect(() => {
    const loadData = async () => {
      const provinces = await getProvinces();

      const addressinfo = {
        provinces,
        districts: [DEFAULT_DISTRICT],
        wards: [DEFAULT_WARD],
      };

      if (province !== DEFAULT_PROVINCE.value) {
        addressinfo.districts = await getDistricts(province);
      }

      if (district !== DEFAULT_DISTRICT.value) {
        addressinfo.wards = (await getWards(district)) || null;
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

    setAddress({
      ...address,
      wards: [DEFAULT_WARD],
      districts: prv !== DEFAULT_PROVINCE.value ? await getDistricts(prv) : [DEFAULT_DISTRICT],
    });
  };

  const handleChangeDistrict = async (e) => {
    const districtCode = e.target.value;

    handleChangeAddress(idProvince, idDistrict, idWard, province, districtCode, DEFAULT_WARD.value);

    setAddress({
      ...address,
      wards:
        districtCode !== DEFAULT_DISTRICT.value ? await getWards(districtCode) : [DEFAULT_WARD],
    });
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
        disabled={address.districts.length === 1}
        error={error.district}
      />

      <AddressSelect
        id={uuidV4()}
        value={ward || 0}
        onChange={handleChangeWard}
        options={address.wards}
        label={<span className={styles.fw500}>Phường/Xã</span>}
        disabled={address.wards.length === 1}
        error={error.ward}
        isRequired={ward !== null}
      />
    </Grid>
  );
};

export default GroupAddressSelect;
