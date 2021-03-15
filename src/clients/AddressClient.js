import { CORE_API } from 'constants/APIUri';
import { invalid } from 'utils/ResponseUtils';
import { isEmpty } from 'utils/ValidateUtils';
import { GET } from './Clients';

const getProvinces = async (ctx) => GET({ url: CORE_API.PROVINCE_LIST, ctx, isBasic: true });

const getDistrictsByProvince = async (provinceCode) =>
  GET({
    url: CORE_API.DISTRICT,
    params: {
      provinceCode,
    },
  });

const getWardsByDistrict = async (districtCode = '') => {
  if (isEmpty(districtCode)) {
    return invalid('DistrictCode not found');
  }
  return GET({ url: CORE_API.ADMINISTRATIVE, params: { districtCode } });
};

export default {
  getProvinces,
  getDistrictsByProvince,
  getWardsByDistrict,
};
