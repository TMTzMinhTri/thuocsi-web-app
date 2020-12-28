import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { AddressClient } from 'clients';
import AddressSelect from '../AddressSelect';

const ADDRESS_POS = {
  PROVINCE: 0,
  DISTRICT: 1,
  WARD: 2,
};

const GroupAddressSelect = ({
  province,
  district,
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

  useEffect(() => {
    async function getProvinces() {
      const res = await AddressClient.getProvinces();
      setProvinces(res);
    }
    getProvinces();
  }, []);

  useEffect(() => {
    async function getDistricts() {
      const res = await AddressClient.getDistrictsByProvince(province);
      setDistricts(res);
      setWards([{ value: 0, label: 'Chọn Phường/Xã ...' }]);
      setPos(ADDRESS_POS.DISTRICT);
    }
    if (province !== 0) getDistricts();
  }, [province]);

  useEffect(() => {
    async function getWards() {
      const res = await AddressClient.getWardsByDistrict(district);
      setWards(res);
      setPos(ADDRESS_POS.WARD);
    }
    if (district !== 0) getWards();
  }, [district]);
  return (
    <Grid container spacing={3}>
      <AddressSelect
        label="Tỉnh/Thành phố"
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
        label="Quận/Huyện"
        disabled={ADDRESS_POS.DISTRICT > pos}
      />

      <AddressSelect
        id={idWard}
        value={ward}
        onChange={(e) => handleSetValue(idWard, e.target.value)}
        options={wards}
        label="Phường/Xã"
        disabled={ADDRESS_POS.WARD > pos}
      />
    </Grid>
  );
};

export default GroupAddressSelect;
