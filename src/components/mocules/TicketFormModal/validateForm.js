import { ValidateUtils } from 'utils';

const validateForm = ({ feedBackContent }) => {
  if (ValidateUtils.isEmpty(feedBackContent)) throw Error('Bạn chưa nhập nội dung phản hồi');
};

export default validateForm;
