import { CORE_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

const getProvinces = async (ctx) => {
  const url = CORE_API.PROVINCE_LIST;
  const res = await GET({ url, ctx });
  // Example @dat.le
  if (!isValid(res)) {
    // if not valid => return empty []
    return [];
  }
  const provinces = res.data.map((province) => ({
    label: province.name,
    value: province.code,
  }));
  // return provinces  = []
  return provinces;
};

// TODO @dat.le : check res
const getDistrictsByProvince = async (provinceCode) => {
  const url = `${CORE_API.DISTRICT}?provinceCode=${provinceCode}`;
  const res = await GET({ url });
  const districts = res.data.map((district) => ({
    label: district.name,
    value: district.provinceCode,
  }));
  return districts;
};

// TODO @dat.le : check res
const getWardsByDistrict = async (provinceCode) => {
  const url = `${CORE_API.ADMINISTRATIVE}?provinceCode=${provinceCode}`;
  const res = await GET({ url });
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
