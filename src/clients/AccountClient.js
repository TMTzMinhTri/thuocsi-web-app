import { ACCOUNT_API } from 'constants/APIUri';
import { GET } from './Clients';

export const getAccountInfo = async ({ ctx }) => GET({ url: ACCOUNT_API.GET_ACCOUNT_INFO, ctx });

export default { getAccountInfo };
