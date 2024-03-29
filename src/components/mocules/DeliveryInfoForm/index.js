import React from 'react';
import {
  Paper,
  Grid,
  useMediaQuery,
  // FormControlLabel,
  // Checkbox,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import InfoFormControl from 'components/atoms/InfoFormControl';
import { v4 as uuidv4 } from 'uuid';
import InfoInput from '../InfoInput';
import GroupAddressSelect from '../GroupAddressSelect';
import styles from './styles.module.css';

// const GreenCheckbox = (props) => (
//   <Checkbox classes={{ root: styles.checkbox }} color="default" {...props} />
// );

const DeliveryInfoForm = ({
  customerName,
  customerEmail,
  customerPhone,
  customerShippingAddress,
  customerWardCode,
  customerDistrictCode,
  customerProvinceCode,
  handleSetValue,
  name,
  phone,
  address,
  handleChangeAddress,
  setTotalWard,
  // handleChangeCheckbox,
  setError,
  // isChecked = false,
}) => {
  const maxWidthScope = useMediaQuery('(max-width:600px)');

  // STATUS: PENDING
  // const checkBox = (
  //   <GreenCheckbox
  //     checked={isChecked}
  //     onChange={(e) => handleChangeCheckbox(e)}
  //     name="saveInfoShipping"
  //   />
  // );

  return (
    <Paper className={styles.root} elevation={2}>
      <h1 className={styles.title}>
        Thông tin giao hàng
        <small className={styles.text_muted}>
          <FontAwesomeIcon icon={faInfoCircle} />
          <span className={styles.text}>Lưu ý: những ô có dấu </span>
          <span className={styles.required}>*</span> là thông tin bắt buộc
        </small>
      </h1>
      <Grid container>
        <InfoFormControl
          xs={12}
          isRequired
          label={<span className={styles.fw500}>Họ tên khách hàng</span>}
          htmlFor="customerName"
        >
          <InfoInput
            error={name}
            id="customerName"
            placeholder="Họ và tên"
            value={customerName || ''}
            onChange={(e) => {
              if (e.target.value !== '') {
                setError(true);
              }
              handleSetValue('customerName', e.target.value);
            }}
          />
        </InfoFormControl>
        <Grid className={styles.grid_fix} container spacing={2}>
          <InfoFormControl
            xs={maxWidthScope ? 12 : 3}
            isRequired
            label={<span className={styles.fw500}>Số điện thoại</span>}
            htmlFor="customerPhone"
          >
            <InfoInput
              error={phone}
              id="customerPhone"
              placeholder="số điện thoại"
              value={customerPhone || ''}
              onChange={(e) => handleSetValue('customerPhone', e.target.value)}
            />
          </InfoFormControl>

          <InfoFormControl
            xs={maxWidthScope ? 12 : 9}
            label={<span className={styles.fw500}>Email</span>}
            htmlFor="customerEmail"
          >
            <InfoInput
              id="customerEmail"
              placeholder="email "
              value={customerEmail || ''}
              onChange={(e) => handleSetValue('customerEmail', e.target.value)}
            />
          </InfoFormControl>
        </Grid>

        <InfoFormControl
          xs={12}
          label={<span className={styles.fw500}>Địa chỉ nhà thuốc/phòng khám</span>}
          isRequired
          htmlFor="customerShippingAddress"
        >
          <InfoInput
            error={address}
            id="customerShippingAddress"
            placeholder="Địa chỉ nhà thuốc"
            value={customerShippingAddress || ''}
            onChange={(e) => {
              if (e.target.value !== '') {
                setError(true);
              }
              handleSetValue('customerShippingAddress', e.target.value);
            }}
          />
        </InfoFormControl>

        <GroupAddressSelect
          id={uuidv4()}
          idProvince="customerProvinceCode"
          province={customerProvinceCode}
          idDistrict="customerDistrictCode"
          district={customerDistrictCode}
          idWard="customerWardCode"
          ward={customerWardCode}
          handleSetValue={handleSetValue}
          handleChangeAddress={handleChangeAddress}
          setTotalWard={setTotalWard}
        />
        {/* STATUS: PENDING
        <FormControlLabel
          control={checkBox}
          className={styles.save_info_cb}
          label={<span className={styles.fw500}>Lưu lại thông tin</span>}
        /> 
        */}
      </Grid>
    </Paper>
  );
};

export default DeliveryInfoForm;
