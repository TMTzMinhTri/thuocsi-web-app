import React, { useState } from 'react';
import { Paper, FormHelperText, InputAdornment, IconButton, Grid } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { InfoFormControl } from 'components/atoms';
import InfoInput from '../InfoInput';
import styles from './styles.module.css';

const AccountForm = ({ name, email, phone, password, handleSetValue, err }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  console.log(err)
  const IconEndPassword = () => (
    <InputAdornment className={styles.padding_none}>
      <IconButton onClick={handleClickShowPassword}>
        {isShowPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}> Thông tin tài khoản </h1>
      <Grid container>
        <InfoFormControl xs={12} isRequired label="Họ Tên khách hàng" htmlFor="name" error={err.name}>
          <InfoInput
            id="name"
            placeholder="Họ và tên"
            value={name}
            error={err.name}
            onChange={(e) => handleSetValue('name', e.target.value)}
          />
        </InfoFormControl>

        <InfoFormControl xs={12} isRequired label="Số Điện Thoại" htmlFor="phone" error={err.phone}>
          <InfoInput
            id="phone"
            placeholder="Số điện thoại"
            value={phone}
            error={err.phone}
            onChange={(e) => handleSetValue('phone', e.target.value)}
          />
        </InfoFormControl>

        <InfoFormControl xs={12} isRequired label="Email" htmlFor="email" error={err.email}>
          <InfoInput
            id="email"
            placeholder="Email"
            value={email}
            error={err.email}
            onChange={(e) => handleSetValue('email', e.target.value)}
          />
        </InfoFormControl>

        <InfoFormControl xs={12} isRequired label="Mật khẩu mới" htmlFor="password">
          <InfoInput
            id="password"
            type={isShowPassword ? 'text' : 'password'}
            endAdornment={<IconEndPassword />}
            value={password}
            onChange={(e) => handleSetValue('password', e.target.value)}
          />
          <FormHelperText>Mật khẩu dài tối thiểu 6 ký tự</FormHelperText>
        </InfoFormControl>
      </Grid>
    </Paper>
  );
};

export default AccountForm;
