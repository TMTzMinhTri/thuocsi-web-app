import { useState } from 'react';
import { CloudUpload } from '@material-ui/icons';
import { isValid } from 'clients';
import NotifyUtils from 'utils/NotifyUtils';
import RUG, { DropArea } from 'react-upload-gallery';
import { UploadImageService } from 'services';

const UploadImages = (props) => {
  const { onChange, images = [] } = props;
  const [imageUrls, setImageUrls] = useState([]);

  const customRequest = ({ uid, file, action, onSuccess, onError }) => {
    const image = file;
    const copyImageUrls = imageUrls;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      UploadImageService.upload({ data: reader.result })
        .then((result) => {
          if (!isValid(result)) {
            NotifyUtils.error(result.message);
          }
          onSuccess(uid, result);
          copyImageUrls.push(result.data[0]);
          setImageUrls(copyImageUrls);
          onChange(copyImageUrls)
        })
        .catch((error) => {
          onError(uid, {
            action,
            status: error.request,
            response: error.response,
          });
        });
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
      accept={['jpg', 'jpeg', 'png']}
      source={(response) => response.data[0]}
      onDeleted={(image) => handleDelete(image)}
      initialState={images}
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
                <div className="rug-handle-drop-text">Kéo thả để tải ảnh</div>
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
