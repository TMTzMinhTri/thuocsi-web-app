import React from 'react';
import { Paper, Grid, useMediaQuery, FormControlLabel, Checkbox } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import InfoFormControl from 'components/atoms/InfoFormControl';
import InfoInput from '../InfoInput';
import GroupAddressSelect from '../GroupAddressSelect';
import styles from './styles.module.css';

const GreenCheckbox = (props) => (
  <Checkbox classes={{ root: styles.checkbox }} color="default" {...props} />
);

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
  handleChangeCheckbox,
  savedInfo,
}) => {
  const maxWidthScope = useMediaQuery('(max-width:600px)');

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
          label={<span className={styles.fw500}>Họ Tên khách hàng</span>}
          htmlFor="customerName"
        >
          <InfoInput
            error={name}
            id="customerName"
            placeholder="Họ và tên"
            value={customerName}
            onChange={(e) => handleSetValue('customerName', e.target.value)}
          />
        </InfoFormControl>
        <Grid className={styles.grid_fix} container spacing={2}>
          <InfoFormControl
            xs={maxWidthScope ? 12 : 3}
            isRequired
            label={<span className={styles.fw500}>Số Điện Thoại</span>}
            htmlFor="customerPhone"
          >
            <InfoInput
              error={phone}
              id="customerPhone"
              placeholder="số điện thoại"
              value={customerPhone}
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
              value={customerEmail}
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
          handleChangeAddress={handleChangeAddress}
        />
        <FormControlLabel
          control={(
            <GreenCheckbox
              checked={savedInfo?.checked}
              onChange={(e) => handleChangeCheckbox(e)}
              name="checked"
            />
          )}
          className={styles.save_info_cb}
          label={<span className={styles.fw500}>Lưu lại thông tin</span>}
        />
      </Grid>
    </Paper>
  );
};

export default DeliveryInfoForm;
