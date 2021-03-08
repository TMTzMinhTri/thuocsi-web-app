// import { SETTING_API } from 'constants/APIUri';
import { GET } from './Clients';

export const getSettingList = async ({ ctx }) =>
  GET({ url: "/setting", mock: true , ctx, isBasic: true });

export default { getSettingList };
