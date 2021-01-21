import { useState } from 'react';
import { Input } from 'components/atoms';
import { Button, Grid } from '@material-ui/core';
import { NotifyUtils, ValidateUtils } from 'utils';
import styles from './styles.module.css';
import ReferralTable from './ReferralTable';

const ReferralList = ({ referrals }) => {
  const [phone, setPhone] = useState('');
  const handleSendSMS = () => {
    try {
      if (ValidateUtils.isEmpty(phone)) throw Error('số điện thoại không đươc rỗng');
      if (!ValidateUtils.validatePhone(phone)) throw Error('số điện thoại sai định dạng');
      NotifyUtils.success('Gửi SMS giới thiệu thành công');
    } catch (error) {
      NotifyUtils.error(error?.message || 'Gửi SMS không thành công');
    }
  };
  return (
    <Grid item container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={4}>
            <Input placeholder="Nhập số điện thoại bạn bè" className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Grid>
          <Grid item className={styles.button_container}>
            <Button className={styles.button} onClick={handleSendSMS}> Gửi SMS giới thiệu </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <ReferralTable referrals={referrals} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReferralList;
