import { CustomerClient, isValid, LIMIT_DEFAULT, OFFSET_DEFAULT } from 'clients';
import { invalid } from 'utils/ResponseUtils';
import { isEmpty } from 'utils/ValidateUtils';

export const getReferralList = async ({ offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT }) => {
  const params = { offset, limit };
  const res = await CustomerClient.getReferral({ params });
  if (isValid(res)) {
    res.data = res.data.map((referral) => {
      const { lastUpdatedTime, status } = referral;
      const dateLastSend = new Date(lastUpdatedTime).getTime();
      const curTime = new Date().getTime();

      // check > 3h
      const canResendSMS = status === 'NEW' && curTime - dateLastSend > 10800000;
      return { ...referral, canResendSMS };
    });
  }

  return res;
};

export const sendSms = async ({ phoneNumber }) => {
  if (isEmpty(phoneNumber)) {
    return invalid('Số điện thoại không đúng định dạng');
  }
  const res = await CustomerClient.sendSms({ phoneNumber });

  if (!isValid(res)) {
    return res;
  }

  return res;
};

export const retrySendSMS = async ({ code }) => {
  const res = await CustomerClient.retrySendSms({ code });
  return res;
};

export default { getReferralList, sendSms, retrySendSMS };
