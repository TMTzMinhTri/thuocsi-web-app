import { useState } from 'react';
import { CloudUpload } from '@material-ui/icons';
import { isValid } from 'clients';
import NotifyUtils from 'utils/NotifyUtils';
import RUG, { DropArea } from 'react-upload-gallery';
import { UploadImageService } from 'services';

const UploadImages = (props) => {
  const { onChange, images = [], limit = 6 } = props;
  const [imageUrls, setImageUrls] = useState([]);

  const customRequest = ({ uid, file, action, onSuccess, onError }) => {
    const image = file;
    const copyImageUrls = imageUrls;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const blob = new Blob([reader.result]);
      const limitSize = blob.size / 1024 / 1024;
      if (limitSize > 2) {
        NotifyUtils.error('Kích thước quá lớn');
        onError(uid, {
          action,
          response: reader.result,
        });
      } else {
        UploadImageService.upload({ data: reader.result })
          .then((result) => {
            if (!isValid(result)) {
              NotifyUtils.error(result.message);
              onError(uid, {
                action,
                status: result.message,
                response: reader.result,
              });
            }
            onSuccess(uid, result);
            copyImageUrls.push(result.data[0]);
            setImageUrls(copyImageUrls);
            onChange(copyImageUrls);
          })
          .catch((error) => {
            onError(uid, {
              action,
              status: error.request,
              response: error.response,
            });
          });
      }
    };

    return {
      abort() {},
    };
  };
  const handleDelete = (image) => {
    let arr = imageUrls;
    arr = arr.filter((item) => item !== image.source);
    setImageUrls(arr);
    onChange(arr);
  };
  return (
    <RUG
      rules={{
        limit,
      }}
      accept={['jpg', 'jpeg', 'png']}
      source={(response) => response.data[0]}
      onDeleted={(image) => handleDelete(image)}
      initialState={images}
      onWarning={(type, rules) => {
        switch (type) {
          case 'accept':
            NotifyUtils.error(`Chỉ chấp nhận định dạng ${rules.accept.join(', ')}`);
            break;
          case 'limit':
            NotifyUtils.error(`Cho phép tối đa ${rules.limit} ảnh`);
            break;
          case 'size':
            NotifyUtils.error(`Cho phép kích thước tối đa ${rules.size}Kb`);
            break;
          default:
        }
      }}
      header={({ openDialogue }) => (
        <DropArea>
          {(isDrag) => (
            <div
              className={`rug-handle ${isDrag ? '__dragging' : ''}`}
              onClick={openDialogue}
              onKeyDown={openDialogue}
              aria-hidden="true"
            >
              <CloudUpload className={`rug-handle-icon ${isDrag ? '__arrow' : ''}`} />
              <div className="rug-handle-info">
                <div className="rug-handle-drop-text">Kéo thả hoặc nhấp vào đây để tải ảnh</div>
                <div className="rug-handle-limit-message">(Được phép tải tối đa {limit} ảnh)</div>
              </div>
            </div>
          )}
        </DropArea>
      )}
      customRequest={customRequest}
    />
  );
};

export default UploadImages;
