import { ValidateUtils } from 'utils';

const validateForm = ({ note, imageUrls }) => {
  if (ValidateUtils.isEmpty(note)) throw Error('Bạn chưa nhập nội dung phản hồi');
  if (ValidateUtils.isEmpty(imageUrls)) throw Error('Vui lòng gửi hình ảnh phản hồi');
};

export default validateForm;
