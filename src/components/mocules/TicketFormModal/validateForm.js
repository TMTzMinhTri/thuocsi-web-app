import { ValidateUtils } from 'utils';

const validateForm = ({ note }) => {
  if (ValidateUtils.isEmpty(note)) throw Error('Bạn chưa nhập nội dung phản hồi');
};

export default validateForm;
