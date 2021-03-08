import { SettingClient } from 'clients';

export const getListSetting = async ({ ctx }) => {
  const res = await SettingClient.getSettingList({ ctx });
  return res;
};

export default { getListSetting };
