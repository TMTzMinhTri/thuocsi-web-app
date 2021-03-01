import { AddressClient, isValid } from 'clients';

const getProvinces = async (ctx) => {
  const provincesRes = await AddressClient.getProvinces(ctx);
  if (!isValid(provincesRes)) {
    return [];
  }
  const provinces = provincesRes.data
    .map(({ name: label, code: value }) => ({ label, value }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return provinces;
};

const getDistrictsByProvince = async (provinceCode) => {
  const res = await AddressClient.getDistrictsByProvince(provinceCode);
  if (!isValid(res)) {
    return [];
  }
  return res.data
    .map(({ name: label, code: value }) => ({ label, value }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

export const getWardsByDistrict = async (districtCode) => {
  const res = await AddressClient.getWardsByDistrict(districtCode);
  if (!isValid(res)) {
    return [];
  }
  return res.data
    .map(({ name: label, code: value }) => ({ label, value }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

export default { getProvinces, getDistrictsByProvince, getWardsByDistrict };
