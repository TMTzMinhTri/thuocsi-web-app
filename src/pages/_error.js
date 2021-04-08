import React, { useEffect } from 'react';
import { Typography, Grid, Container, Button } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import { useRollbar } from 'hooks';
import { useAuth } from 'context';
import styles from '../styles/error.module.css';

function Error({ statusCode, buildId = '' }) {
  const rollbar = useRollbar();
  const { user } = useAuth();
  useEffect(() => {
    rollbar.configure({
      payload: {
        person: {
          id: user?.customerID || '-----',
          username: user?.username || 'visitors',
        },
        buildId,
      },
    });
    rollbar.critical(statusCode);
  }, []);

  return (
    <Container className={styles.pageError}>
      <Grid container style={{ width: '100%' }}>
        <Grid item container xs={12}>
          <Grid align="center" item xs={12}>
            <span className={styles.n4}>5</span>
            <Image height="100px" width="100px" src="/images/logo_thuocsi_2.png" />
            <span className={styles.n4}>0</span>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              {statusCode
                ? `Lỗi ${statusCode} xảy ra từ phía hệ thống`
                : 'Lỗi xảy ra từ phía trình duyệt'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="subtitle2" className={styles.weightLow}>
              Nếu bạn cần trợ giúp hãy liên hệ với chúng tôi qua facebook messenger thuocsi
            </Typography>
          </Grid>
          <Grid align="center" item xs={12}>
            Hoặc quay lại trang chủ:
            <br />
            <ul className={styles.list}>
              <li className={styles.link}>
                <Link href="/">
                  <Button variant="contained" color="primary">
                    Quay lại trang chủ
                  </Button>
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Error;
