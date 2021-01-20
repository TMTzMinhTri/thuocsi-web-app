import React from 'react';
import {
  Paper,
  Grid,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import InfoFormControl from '../../atoms/InfoFormControl';
import InfoInput from '../InfoInput';
import GroupAddressSelect from '../GroupAddressSelect';
import styles from './styles.module.css';

const GreenCheckbox = (props) => <Checkbox classes={{ root: styles.checkbox }} color="default" {...props} />;

const DeliveryInfoForm = ({
  customerName,
  customerEmail,
  customerPhone,
  customerShippingAddress,
  customerWardCode,
  customerDistrictCode,
  customerProvinceCode,
  handleSetValue,
}) => {
  const [savedInfo, setSavedInfo] = React.useState({
    checked: true,
  });
  const maxWidthScope = useMediaQuery('(max-width:600px)');
  const handleChange = (event) => {
    setSavedInfo({ ...savedInfo, [event.target.name]: event.target.checked });
  };
  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}>
        Thông tin giao hàng
        <small className={styles.text_muted}>
          <FontAwesomeIcon icon={faInfoCircle} />Lưu ý: những ô có dấu{' '}
          <span className={styles.required}>*</span> là thông tin bắt buộc
        </small>
      </h1>
      <Grid container>
        <InfoFormControl xs={12} isRequired label={<span className={styles.fw500}>Họ Tên khách hàng</span>} htmlFor="customerName">
          <InfoInput
            id="customerName"
            placeholder="Trần Thị B"
            value={customerName}
            onChange={(e) => handleSetValue('customerName', e.target.value)}
          />
        </InfoFormControl>
        <Grid container spacing={2}>
          <InfoFormControl
            xs={maxWidthScope ? 12 : 3}
            isRequired
            label={<span className={styles.fw500}>Số Điện Thoại</span>}
            htmlFor="customerPhone"
          >
            <InfoInput
              id="customerPhone"
              placeholder="0912233311"
              value={customerPhone}
              onChange={(e) => handleSetValue('customerPhone', e.target.value)}
            />
          </InfoFormControl>

          <InfoFormControl xs={maxWidthScope ? 12 : 9} label={<span className={styles.fw500}>Email</span>} htmlFor="customerEmail">
            <InfoInput
              id="customerEmail"
              placeholder="tranthib@email.com"
              value={customerEmail}
              onChange={(e) => handleSetValue('customerEmail', e.target.value)}
            />
          </InfoFormControl>
        </Grid>

        <InfoFormControl xs={12} label={<span className={styles.fw500}>Địa chỉ nhà thuốc/phòng khám</span>} isRequired htmlFor="customerShippingAddress">
          <InfoInput
            id="customerShippingAddress"
            placeholder="11 Ngô Quyền, Tân Lợi, Tp. Buôn Ma Thuột, Đắk Lắk"
            value={customerShippingAddress}
            onChange={(e) => {
              handleSetValue('customerShippingAddress', e.target.value);
            }}
          />
        </InfoFormControl>

        <GroupAddressSelect
          idProvince="customerProvinceCode"
          province={customerProvinceCode}
          idDistrict="customerDistrictCode"
          district={customerDistrictCode}
          idWard="customerWardCode"
          ward={customerWardCode}
          handleSetValue={handleSetValue}
        />
        <FormControlLabel
          control={<GreenCheckbox checked={savedInfo.checked} onChange={handleChange} name="checked" />}
          label={<span className={styles.fw500}>Lưu lại thông tin</span>}
        />
      </Grid>
    </Paper>
  );
};

export default DeliveryInfoForm;
