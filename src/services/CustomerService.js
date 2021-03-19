import { CustomerClient, isValid, LIMIT_DEFAULT, OFFSET_DEFAULT } from 'clients';
import { invalid } from 'utils/ResponseUtils';
import { isEmpty } from 'utils/ValidateUtils';
import DateTimeUtils from 'utils/DateTimeUtils';

export const getReferralList = async ({ offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT }) => {
  const params = { offset, limit };
  const res = await CustomerClient.getReferral({ params });
  if (isValid(res)) {
    res.data = res.data.map((referral) => {
      const { timeSendSMS = null, smsTotalSent = 0, expireTime } = referral;
      const dateLastSend = new Date(timeSendSMS).getTime();
      const curTime = new Date().getTime();
      let message = '';
      // check > 3h
      let canResendSMS = true;
      if (curTime - dateLastSend <= 10800000) {
        canResendSMS = false;
        message = 'Chưa thể gửi lại. Trong vòng 3 giờ, bạn chỉ có thể gửi 1 tin SMS!';
      }

      if (smsTotalSent >= 5) {
        canResendSMS = false;
        message = 'Không thể gửi. Bạn không thể gửi quá 5 lần!';
      }

      if (DateTimeUtils.compareTime(expireTime, Date.now()) < 0) {
        canResendSMS = false;
        message = 'Không thể gửi. Bạn đã quá thời hạn gửi đến số điện thoại này!';
      }

      return { ...referral, canResendSMS, message };
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
