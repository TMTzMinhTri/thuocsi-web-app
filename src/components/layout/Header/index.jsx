import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { useModal } from 'hooks';

import { CardTravel, House, NewReleases } from '@material-ui/icons';
import { PATH_NEWS, PATH_CAREER, PATH_SUPPLIER } from 'constants/Paths';
import { LOGO_THUOCSI } from 'constants/Images';
import { SignUpModal, SignInModal, ForgetPasswordModal } from 'components/organisms';
import { LinkComp, Button } from '../../atoms';
import styles from './styles.module.css';

const InfoHeader = memo(() => {
  const [isShowingLogin, toggleLogin] = useModal();
  const [isShowingSignUp, toggleSignUp] = useModal();
  const [isShowingForgetPassword, toggleForgetPassword] = useModal();

  const handleChangeForget = useCallback(() => {
    toggleLogin();
    toggleForgetPassword();
  }, [toggleLogin, toggleForgetPassword]);

  const handleChangeSignIn = useCallback(() => {
    toggleSignUp();
    toggleLogin();
  }, [toggleSignUp, toggleLogin]);
  return (
    <div>
      <div className={styles.header_info}>
        <div className={styles.link}>
          <LinkComp name="Tin Tức" href={PATH_NEWS} color="#6c757d !important">
            <NewReleases fontSize="small" />
          </LinkComp>
        </div>
        <div className={styles.link}>
          <LinkComp name="Tuyển dụng | Recruitment" href={PATH_CAREER} color="#6c757d !important">
            <CardTravel fontSize="small" />
          </LinkComp>
        </div>

        <div className={styles.link}>
          <LinkComp name="Tuyển dụng | Recruitment" href={PATH_SUPPLIER} color="#6c757d !important">
            <House fontSize="small" />
          </LinkComp>
        </div>
      </div>
      <div className={styles.login}>
        <div className={styles.logo}>
          <Image src={LOGO_THUOCSI} width="164px" height="45px" />
        </div>

        <SignInModal
          visible={isShowingLogin}
          onClose={toggleLogin}
          onChangeForget={handleChangeForget}
        />

        <ForgetPasswordModal visible={isShowingForgetPassword} onClose={toggleForgetPassword} />

        <SignUpModal
          visible={isShowingSignUp}
          onClose={toggleSignUp}
          onChangeSignIn={handleChangeSignIn}
        />

        <div className={styles.div_buttons}>
          <Button variant="contained" type="warning" onClick={toggleLogin}>
            Đăng nhập
          </Button>
          <Button variant="contained" type="success" color="white" onClick={toggleSignUp}>
            Tạo Tài Khoản
          </Button>
        </div>
      </div>
    </div>
  );
});

export default InfoHeader;
