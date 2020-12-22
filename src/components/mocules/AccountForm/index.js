import React, { useState } from 'react';
import { Paper, FormHelperText, InputAdornment, IconButton, Grid } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { InputInfo, InfoFormControl } from 'components/atoms';
import styles from './styles.module.css';

const AccountForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
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
        <InfoFormControl xs={12} isRequired label="Họ Tên khách hàng" htmlFor="name">
          <InputInfo id="name" placeholder="Trần Thị B" />
        </InfoFormControl>

        <InfoFormControl xs={12} isRequired label="Số Điện Thoại" htmlFor="phone">
          <InputInfo id="phone" placeholder="0912233311" />
        </InfoFormControl>

        <InfoFormControl xs={12} isRequired label="Email" htmlFor="email">
          <InputInfo id="email" placeholder="dat.le@thuocsi.vn" />
        </InfoFormControl>

        <InfoFormControl xs={12} isRequired label="Mật khẩu mới" htmlFor="newPassword">
          <InputInfo
            id="newPassword"
            type={isShowPassword ? 'text' : 'password'}
            endAdornment={<IconEndPassword />}
          />
          <FormHelperText>Mật khẩu dài tối thiểu 6 ký tự</FormHelperText>
        </InfoFormControl>
      </Grid>
    </Paper>
  );
};

export default AccountForm;
