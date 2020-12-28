import { GET } from './Clients';

const getProvinces = async () => {
  const url = '/provinces';
  const res = await GET({ url, mock: true });
  const provinces = res.data.map((province) => ({
    label: province.name,
    value: province.id,
  }));
  return provinces;
};

const getDistrictsByProvince = async (id) => {
  const url = `/provinces/${id}/districts`;
  const res = await GET({ url, mock: true });
  const districts = res.data.map((district) => ({
    label: district.name,
    value: district.id,
  }));
  return districts;
};

const getWardsByDistrict = async (id) => {
  const url = `/districts/${id}/wards`;
  const res = await GET({ url, mock: true });
  const wards = res.data.map((ward) => ({
    label: ward.name,
    value: ward.id,
  }));
  return wards;
};

export default {
  getProvinces,
  getDistrictsByProvince,
  getWardsByDistrict,
};
