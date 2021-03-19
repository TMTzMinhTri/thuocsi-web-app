import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { AccountForm, EnterpriseForm } from 'components/mocules';
import { CustomerClient, isValid } from 'clients';
import { NotifyUtils } from 'utils';
import { i18n } from 'i18n-lib';
import UpdateButton from './UpdateButton';
import validateForm from './validateForm';
import styles from './styles.module.css';

const AccountInfoFormContainer = ({ user, t }) => {
  const {
    name,
    phone,
    email,
    provinceCode,
    wardCode,
    districtCode,
    address,
    scope,
    mst,
    legalRepresentative,
    customerID,
  } = user;
  const [value, setValue] = useState({
    name,
    phone,
    email,
    password: '',
    scope: t(`scope.${scope}`),
    legalRepresentative,
    bussinessName: '',
    provinceCode,
    districtCode,
    wardCode,
    mst,
    address,
    deliveryProvinceCode: provinceCode,
    deliveryDistrictCode: districtCode,
    deliveryWardCode: wardCode,
    customerID,
  });

  const [err, setErr] = useState({});
  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };

  const handleChangeAddress = (idProvince, idDistrict, idWard, province, district, ward) => {
    setValue({ ...value, [idProvince]: province, [idDistrict]: district, [idWard]: ward });
  };

  const handleUpdateProfile = async () => {
    try {
      const errL = validateForm(value);
      if (Object.keys(errL).length !== 0) {
        setErr(errL);
        throw Error('Thông tin chưa đúng');
      }
      const res = await CustomerClient.updateProfile(value);
      if (!isValid(res)) throw Error(res?.message);
      NotifyUtils.success('Cập nhật thông tin thành công');
      setErr({});
    } catch (error) {
      NotifyUtils.error(error?.message || 'Cập nhật thông tin thất bại');
    }
  };

  return (
    <Grid className={styles.container} item container spacing={3}>
      <Grid item xs={12}>
        <AccountForm {...value} handleSetValue={handleSetValue} err={err} />
      </Grid>
      <Grid item xs={12}>
        <EnterpriseForm
          {...value}
          handleSetValue={handleSetValue}
          handleChangeAddress={handleChangeAddress}
          error={{
            province: err.provinceCode,
            district: err.districtCode,
            ward: err.wardCode,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        {/* <DeliveryForm
          {...value}
          handleSetValue={handleSetValue}
          handleChangeAddress={handleChangeAddress}
          error={{
            province: err.deliveryProvinceCode,
            district: err.deliveryDistrictCode,
            ward: err.deliveryWardCode,
          }}
        /> */}
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <UpdateButton handleUpdateProfile={handleUpdateProfile} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default i18n.withTranslation('common')(React.memo(AccountInfoFormContainer));
