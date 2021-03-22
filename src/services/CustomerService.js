import { CustomerClient, isValid, LIMIT_DEFAULT, OFFSET_DEFAULT } from 'clients';
import { invalid } from 'utils/ResponseUtils';
import { isEmpty } from 'utils/ValidateUtils';
import DateTimeUtils from 'utils/DateTimeUtils';

export const getReferralList = async ({ offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT }) => {
  const params = { offset, limit };
  const res = await CustomerClient.getReferral({ params });
  if (isValid(res)) {
    res.data = res.data.map((referral) => {
      const { lastTimeSendSMS = null, smsTotalSent = 0, expireTime } = referral;

      // check expired
      if (DateTimeUtils.compareTime(expireTime, Date.now()) < 0) {
        return {
          ...referral,
          canResendSMS: false,
          message: 'Không thể gửi. Bạn đã quá thời hạn gửi đến số điện thoại này!',
        };
      }

      // check send total
      if (smsTotalSent >= 5) {
        return {
          ...referral,
          canResendSMS: false,
          message: 'Không thể gửi. Bạn không thể gửi quá 5 lần!',
        };
      }
      // check > 3h
      const dateLastSend = new Date(lastTimeSendSMS).getTime();
      const curTime = new Date().getTime();
      if (curTime - dateLastSend <= 10800000) {
        return {
          ...referral,
          canResendSMS: false,
          message: 'Chưa thể gửi lại. Trong vòng 3 giờ, bạn chỉ có thể gửi 1 tin SMS!',
        };
      }

      return { ...referral, canResendSMS: true };
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
