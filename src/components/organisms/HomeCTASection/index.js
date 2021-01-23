import React, { useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { useModal } from 'hooks';
import { Button } from 'components/atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import SignUpModal from '../SignUpModal';
import SignInModal from '../SignInModal';
import ForgetPasswordModal from '../ForgetPasswordModal';

import styles from './styles.module.css';

const HomeCTASection = () => {
  const [isShowingLogin, toggleLogin] = useModal();
  const [isShowingSignUp, toggleSignUp] = useModal();
  const [isShowingForgetPassword, toggleForgetPassword] = useModal();

  const handleChangeForget = useCallback(() => {
    toggleLogin();
    toggleForgetPassword();
  }, [toggleLogin, toggleForgetPassword]);

  const handleChangeSignUp = useCallback(() => {
    toggleLogin();
    toggleSignUp();
  }, [toggleLogin, toggleSignUp]);

  const handleChangeSignIn = useCallback(() => {
    toggleSignUp();
    toggleLogin();
  }, [toggleSignUp, toggleLogin]);

  return (
    <div className={styles.homeCTA}>
      <Grid className={styles.homeCTAOverlay} container>
        <Grid xs={12} item>
          <h4 className={styles.title}>Đăng nhập để tìm hiểu sản phẩm</h4>
        </Grid>
        <Grid className={styles.btnWrapper} display="flex" container item>
          <Button onClick={toggleLogin} backgroundColor="#f9b514" className={styles.customBtn}>
            <FontAwesomeIcon className={styles.noAuthIcon} icon={faSignInAlt} />
            đăng nhập
          </Button>
          <Button
            onClick={toggleSignUp}
            backgroundColor="#00b46e"
            color="#fff"
            className={styles.customBtn}
          >
            <FontAwesomeIcon className={styles.noAuthIcon} icon={faUser} />
            đăng kí
          </Button>
          <SignInModal
            visible={isShowingLogin}
            onClose={toggleLogin}
            onChangeForget={handleChangeForget}
            onChangeSignUp={handleChangeSignUp}
          />
          <ForgetPasswordModal visible={isShowingForgetPassword} onClose={toggleForgetPassword} />
          <SignUpModal
            visible={isShowingSignUp}
            onClose={toggleSignUp}
            onChangeSignIn={handleChangeSignIn}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeCTASection;
