import { AuthClient, getFirst, isValid } from 'clients';

const wrapInfo = (info) => ({
  ...info,
  isActive: info.status === 'ACTIVE',
  createdTime: null,
  lastUpdatedTime: null,
});

export const getAccount = async (ctx) => {
  let userRes = null;
  if (ctx) {
    userRes = await AuthClient.getUserWithContext(ctx);
  } else {
    userRes = await AuthClient.getUser();
  }
  if (!isValid(userRes)) {
    return userRes;
  }

  const info = getFirst(userRes);

  const wrapData = wrapInfo(info);
  console.log('wraper info ', wrapData);
  // change data
  return {
    status: userRes.status,
    message: userRes.message,
    data: [wrapData],
  };
};

export const login = async () => {};

export default { getAccount };
