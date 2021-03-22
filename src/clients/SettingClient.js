import { SETTING_API } from 'constants/APIUri';
import { GET, getData } from './Clients';

export const getSettingList = async ({ ctx }) =>
  GET({ url: SETTING_API.SETTING_LIST, ctx, isBasic: true });

export const getMenu = async () => {
  const result = await GET({ url: '/menu', mock: true });
  return getData(result);
};

export default { getSettingList, getMenu };
