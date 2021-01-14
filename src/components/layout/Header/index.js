import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { useModal } from 'hooks';
import { IconButton } from '@material-ui/core';
import { CardTravel, House, NewReleases, NotificationsNoneOutlined } from '@material-ui/icons';
import { PATH_NEWS, PATH_CAREER, PATH_SUPPLIER } from 'constants/Paths';
import { LOGO_THUOCSI } from 'constants/Images';
import { SignUpModal, SignInModal, ForgetPasswordModal } from 'components/organisms';
import { HeaderUser, SearchInput } from 'components/mocules';
import { LinkComp, ButtonHeader } from 'components/atoms';
import { useAuth } from 'context';
import { i18n } from 'i18n-lib';
import styles from './styles.module.css';

const InfoHeader = memo(({ t }) => {
  const [isShowingLogin, toggleLogin] = useModal();
  const [isShowingSignUp, toggleSignUp] = useModal();
  const [isShowingForgetPassword, toggleForgetPassword] = useModal();
  const { user, isAuthenticated } = useAuth();

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
    <div>
      <div className={styles.header_info}>
        <div className={styles.header_info_wrap}>
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
            <LinkComp
              name="Tuyển dụng | Recruitment"
              href={PATH_SUPPLIER}
              color="#6c757d !important"
            >
              <House fontSize="small" />
            </LinkComp>
          </div>
        </div>
      </div>
      <div className={styles.login}>
        <LinkComp href="/">
          <Image className={styles.logo} href="/" src={LOGO_THUOCSI} width="164px" height="45px" />
        </LinkComp>
        {!isAuthenticated ? (
          <>
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

            <div className={styles.div_buttons}>
              <ButtonHeader variant="contained" btnType="warning" onClick={toggleLogin}>
                {t('login')}
              </ButtonHeader>
              <ButtonHeader
                variant="contained"
                btnType="primary"
                color="white"
                onClick={toggleSignUp}
              >
                {t('register')}
              </ButtonHeader>
            </div>
          </>
        ) : (
          <>
            <SearchInput className={styles.SearchInput} />
            <div className={styles.rSection}>
              <IconButton className={styles.notiIcon}>
                <NotificationsNoneOutlined />
              </IconButton>
              <HeaderUser user={user} />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default i18n.withTranslation()(InfoHeader);
