import { useState } from 'react';
import { Grid } from '@material-ui/core';
import { AccountForm, EnterpriseForm, DeliveryForm } from 'components/mocules';
import { CustomerClient, isValid } from 'clients';
import { NotifyUtils } from 'utils';
import UpdateButton from './UpdateButton';
import validateForm from './validateForm';

const parseScopeName = (scope) => {
  if (scope === 'PHARMACY') {
    return 'Nhà Thuốc';
  }
  return '';
};

const AccountInfoFormContainer = ({ user }) => {
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
    scope: parseScopeName(scope),
    legalRepresentative,
    bussinessName: '',
    provinceCode,
    districtCode,
    wardCode,
    mst,
    address,
    province: provinceCode,
    district: districtCode,
    ward: wardCode,
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
      if(errL){
        setErr(errL);
        throw Error();
      }
      const res = await CustomerClient.updateProfile(value);
      if (!isValid(res)) throw Error(res?.message);
      NotifyUtils.success('Cập nhật thông tin thành công');
    } catch (error) {
      NotifyUtils.error(error?.message || 'Cập nhật thông tin thất bại');
    }
  };

  return (
    <Grid item container spacing={3}>
      <Grid item xs={12}>
        <AccountForm {...value} handleSetValue={handleSetValue} err={err} />
      </Grid>
      <Grid item xs={12}>
        <EnterpriseForm
          {...value}
          handleSetValue={handleSetValue}
          handleChangeAddress={handleChangeAddress}
          err={err}
        />
      </Grid>
      <Grid item xs={12}>
        <DeliveryForm
          {...value}
          handleSetValue={handleSetValue}
          handleChangeAddress={handleChangeAddress}
          err={err}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <UpdateButton handleUpdateProfile={handleUpdateProfile} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountInfoFormContainer;
