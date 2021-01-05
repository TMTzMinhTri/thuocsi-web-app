import React from 'react';
import {
  Paper,
  Grid,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { InfoInput, InfoFormControl } from 'components/atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import GroupAddressSelect from '../GroupAddressSelect';
import styles from './styles.module.css';

const GreenCheckbox = (props) => <Checkbox classes={{ root: styles.checkbox }} color="default" {...props} />;

const DeliveryInfoForm = ({
  name,
  email,
  phone,
  bussinessAddress,
  billWard,
  billDistrict,
  billProvince,
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
        <InfoFormControl xs={12} isRequired label={<span className={styles.fw500}>Họ Tên khách hàng</span>} htmlFor="name">
          <InfoInput
            id="name"
            placeholder="Trần Thị B"
            value={name}
            onChange={(e) => handleSetValue('name', e.target.value)}
          />
        </InfoFormControl>
        <Grid container spacing={2}>
          <InfoFormControl
            xs={maxWidthScope ? 12 : 3}
            isRequired
            label={<span className={styles.fw500}>Số Điện Thoại</span>}
            htmlFor="phone"
          >
            <InfoInput
              id="phone"
              placeholder="0912233311"
              value={phone}
              onChange={(e) => handleSetValue('phone', e.target.value)}
            />
          </InfoFormControl>

          <InfoFormControl xs={maxWidthScope ? 12 : 9} label={<span className={styles.fw500}>Email</span>} htmlFor="email">
            <InfoInput
              id="email"
              placeholder="tranthib@email.com"
              value={email}
              onChange={(e) => handleSetValue('email', e.target.value)}
            />
          </InfoFormControl>
        </Grid>

        <InfoFormControl xs={12} label={<span className={styles.fw500}>Địa chỉ nhà thuốc/phòng khám</span>} isRequired htmlFor="address">
          <InfoInput
            id="address"
            placeholder="11 Ngô Quyền, Tân Lợi, Tp. Buôn Ma Thuột, Đắk Lắk"
            value={bussinessAddress}
            onChange={(e) => {
              handleSetValue('bussinessAddress', e.target.value);
            }}
          />
        </InfoFormControl>

        <GroupAddressSelect
          idProvince="billProvince"
          province={billProvince}
          idDistrict="billDistrict"
          district={billDistrict}
          idWard="billWard"
          ward={billWard}
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
