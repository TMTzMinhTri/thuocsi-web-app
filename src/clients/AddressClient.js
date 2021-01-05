import { GET } from './Clients';

const getProvinces = async (ctx) => {
  const url = '/core/master-data/v1/province/list';
  const res = await GET({ url, isAuth: true, ctx });
  const provinces = res.data.map((province) => ({
    label: province.name,
    value: province.code,
  }));
  return provinces;
};

const getDistrictsByProvince = async (id) => {
  const url = `/core/master-data/v1/district?provinceCode=${id}`;
  const res = await GET({ url, isAuth: true });
  const districts = res.data.map((district) => ({
    label: district.name,
    value: district.provinceCode,
  }));
  return districts;
};

const getWardsByDistrict = async (id) => {
  const url = `/core/master-data/v1/administrative/list?provinceCode=${id}`;
  const res = await GET({ url, isAuth: true });
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
