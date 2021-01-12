import { CORE_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

const getProvinces = async (ctx) => {
  const url = CORE_API.PROVINCE_LIST;
  const res = await GET({ url, ctx });
  if (!isValid(res)) {
    return [];
  }
  const provinces = res.data.map((province) => ({
    label: province.name,
    value: province.code,
  }));
  return provinces;
};

const getDistrictsByProvince = async (provinceCode) => {
  const url = `${CORE_API.DISTRICT}?provinceCode=${provinceCode}`;
  const res = await GET({ url });
  if (!isValid(res)) {
    return [];
  }
  const districts = res.data.map((district) => ({
    label: district.name,
    value: district.provinceCode,
  }));
  return districts;
};

const getWardsByDistrict = async (provinceCode) => {
  const url = `${CORE_API.ADMINISTRATIVE}?provinceCode=${provinceCode}`;
  const res = await GET({ url });
  if (!isValid(res)) {
    return [];
  }
  const wards = res.data.map((ward) => ({
    label: ward.name,
    value: ward.code,
  }));
  return wards;
};

export default {
  getProvinces,
  getDistrictsByProvince,
  getWardsByDistrict,
};
