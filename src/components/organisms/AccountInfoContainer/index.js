import { useState } from 'react';
import { Grid } from '@material-ui/core';
import { AccountForm, EnterpriseForm, DeliveryForm } from 'components/mocules';
import UpdateButton from './UpdateButton';

const parseScopeName = (scope) => {
  if (scope === 'PHARMACY') {
    return 'Nhà Thuốc';
  }
  return '';
};

const AccountInfoFormContainer = ({ user }) => {
  const [value, setValue] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    password: '',
    scope: parseScopeName(user.scope),
    drugstoreName: '',
    bussinessName: '',
    billProvince: 0,
    billDistrict: 0,
    billWard: 0,
    taxId: '',
    bussinessAddress: '',
    province: 0,
    district: 0,
    ward: 0,
  });
  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };
  return (
    <Grid item>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AccountForm {...value} handleSetValue={handleSetValue} />
        </Grid>
        <Grid item xs={12}>
          <EnterpriseForm {...value} handleSetValue={handleSetValue} />
        </Grid>
        <Grid item xs={12}>
          <DeliveryForm {...value} handleSetValue={handleSetValue} />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <UpdateButton />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountInfoFormContainer;
