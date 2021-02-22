import { AddressClient, isValid } from 'clients';

const getProvinces = async (ctx) => {
  const provincesRes = await AddressClient.getProvinces(ctx);
  if (!isValid(provincesRes)) {
    return [];
  }
  return provincesRes.data.map(({ name, code }) => ({ label: name, value: code }));
};

const getDistrictsByProvince = async (provinceCode) => {
  const res = await AddressClient.getDistrictsByProvince(provinceCode);
  if (!isValid(res)) {
    return [];
  }
  return res.data.map(({ name: label, code: value }) => ({ label, value }));
};

export const getWardsByDistrict = async (districtCode) => {
  const res = await AddressClient.getWardsByDistrict(districtCode);
  if (!isValid(res)) {
    return [];
  }
  return res.data.map(({ name: label, code: value }) => ({ label, value }));
};

export default { getProvinces, getDistrictsByProvince, getWardsByDistrict };
