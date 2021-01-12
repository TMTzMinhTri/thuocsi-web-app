import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { useModal } from 'hooks';
import clsx from 'clsx';
import { DateTimeUtils } from 'utils';
import { IconButton, Menu, Fade, Badge } from '@material-ui/core';
import { CardTravel, House, NewReleases, NotificationsNoneOutlined } from '@material-ui/icons';
import { PATH_NEWS, PATH_CAREER, PATH_SUPPLIER } from 'constants/Paths';
import { LOGO_THUOCSI } from 'constants/Images';
import { SignUpModal, SignInModal, ForgetPasswordModal } from 'components/organisms';
import { HeaderUser, SearchInput } from 'components/mocules';
import { useAuth, useNotify } from 'context';
import { LinkComp, Button } from '../../atoms';
import styles from './styles.module.css';

const InfoHeader = memo(() => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isShowingLogin, toggleLogin] = useModal();
  const [isShowingSignUp, toggleSignUp] = useModal();
  const [isShowingForgetPassword, toggleForgetPassword] = useModal();
  const { user, isAuthenticated } = useAuth();
  const { getNotifcations, notification } = useNotify();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getNotifcations();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <Button variant="contained" btnType="warning" onClick={toggleLogin}>
                Đăng nhập
              </Button>
              <Button variant="contained" btnType="primary" color="white" onClick={toggleSignUp}>
                Tạo Tài Khoản
              </Button>
            </div>
          </>
        ) : (
          <>
            <SearchInput className={styles.SearchInput} />
            <div className={styles.rSection}>
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                classes={{ paper: styles.notify_wrap }}
              >
                {notification.map((item) => (
                  <LinkComp
                    key={item.id}
                    className={
                      item.read
                        ? clsx(styles.notificationsItem, styles.read)
                        : clsx(styles.notificationsItem, styles.unRead)
                }
                    href={item.slug}
                  >
                    <div className={styles.notifyIcon}>
                      <i className={`icomoon icon-loyalty + ${styles.icon}`} />
                    </div>
                    <div className={styles.notifyContent}>
                      <div className={styles.notifyContentTitle}>{item.title}</div>
                      <small className={styles.createdAt}>
                        {DateTimeUtils.getTimeAgo(item.create_at)}
                      </small>
                    </div>
                  </LinkComp>
                ))}

              </Menu>
              <IconButton className={styles.notiIcon} onClick={handleClick}>
                <Badge badgeContent={notification.length} invisible={false} color="secondary">

                  <NotificationsNoneOutlined />
                </Badge>

              </IconButton>
              <HeaderUser user={user} />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default InfoHeader;
