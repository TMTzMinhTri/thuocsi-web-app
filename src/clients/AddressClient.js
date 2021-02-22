import { CORE_API } from 'constants/APIUri';
import { GET } from './Clients';

const getProvinces = async (ctx) => GET({ url: CORE_API.PROVINCE_LIST, ctx });

const getDistrictsByProvince = async (provinceCode) =>
  GET({
    url: CORE_API.DISTRICT,
    params: {
      provinceCode,
    },
  });

const getWardsByDistrict = async (districtCode) =>
  GET({ url: CORE_API.ADMINISTRATIVE, params: { districtCode } });

export default {
  getProvinces,
  getDistrictsByProvince,
  getWardsByDistrict,
};
