import React from 'react';
import { Grid } from '@material-ui/core';
import { ButtonHeader } from 'components/atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from 'context';

import styles from './styles.module.css';

const HomeCTASection = () => {
  const { toggleLogin, toggleSignUp } = useAuth();
  return (
    <div className={styles.homeCTA}>
      <Grid className={styles.homeCTAOverlay} container>
        <Grid xs={12} item>
          <h4 className={styles.title}>Đăng nhập để tìm hiểu sản phẩm</h4>
        </Grid>
        <Grid className={styles.btnWrapper} display="flex" container item>
          <ButtonHeader
            onClick={toggleLogin}
            btnType="warning"
            className={styles.customBtn}
            color="#000"
          >
            <FontAwesomeIcon className={styles.noAuthIcon} icon={faSignInAlt} />
            đăng nhập
          </ButtonHeader>
          <ButtonHeader onClick={toggleSignUp} btnType="primary" className={styles.customBtn}>
            <FontAwesomeIcon className={styles.noAuthIcon} icon={faUser} />
            Tạo tài khoản
          </ButtonHeader>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeCTASection;
