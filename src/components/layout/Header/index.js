import React, { memo } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { DateTimeUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { IconButton, Menu, Fade, Badge, Tooltip } from '@material-ui/core';
import { CardTravel, House, NewReleases, NotificationsNoneOutlined } from '@material-ui/icons';
import { PATH_NEWS, PATH_CAREER, PATH_SUPPLIER } from 'constants/Paths';
import { LOGO_THUOCSI } from 'constants/Images';
import { HeaderUser, SearchInput } from 'components/mocules';
import { LinkComp, ButtonHeader } from 'components/atoms';
import { useAuth, useNotify } from 'context';
import { useTranslation } from 'next-i18next';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import styles from './styles.module.css';

const LinkLogo = memo(() => (
  <LinkComp href="/">
    <Image className={styles.logo} href="/" src={LOGO_THUOCSI} width="164px" height="45px" />
  </LinkComp>
));

const SearchInpuEle = memo(() => <SearchInput className={styles.SearchInput} />);

const HeaderInfoEle = memo(() => (
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
          name="Đăng ký bán hàng cùng thuốc sỉ"
          href={PATH_SUPPLIER}
          color="#6c757d !important"
        >
          <House fontSize="small" />
        </LinkComp>
      </div>
    </div>
  </div>
));

const InfoHeader = memo(() => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user, isAuthenticated, toggleLogin, toggleSignUp, toggleRegisterGuest } = useAuth();
  const { notification, unread: unreadNotification, markAll, markReadByCode } = useNotify();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <HeaderInfoEle />
      <div className={styles.login}>
        <LinkLogo />
        {!isAuthenticated ? (
          <>
            <div className={styles.div_buttons}>
              <ButtonHeader
                variant="contained"
                btnType="warning"
                onClick={toggleLogin}
                color="#000"
              >
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
              <ButtonHeader
                variant="outlined"
                btnType="primary"
                color="white"
                onClick={toggleRegisterGuest}
                className="custombtn"
              >
                {t('tester.test')}
              </ButtonHeader>
            </div>
          </>
        ) : (
          <>
            <SearchInpuEle />
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
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                classes={{ paper: styles.notify_wrap }}
              >
                <span className={styles.arrow} />
                <div className={styles.notifyBox}>
                  <div className={styles.title_wrap}>
                    <div style={{ flexGrow: 1 }}>
                      <h6 className={styles.title}>Thông báo</h6>
                      {unreadNotification === 0 && (
                        <p className={styles.description}>Bạn không có thông báo mới</p>
                      )}
                    </div>
                    {notification.length !== 0 && (
                      <div>
                        <IconButton className={styles.markAll} onClick={() => markAll()}>
                          <DoneAllIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                  <hr key={uuidv4()} className={styles.divider} />
                  {notification.length > 0 &&
                    notification.map((item) => (
                      <LinkComp
                        key={uuidv4()}
                        className={
                          item.isRead
                            ? clsx(styles.notificationsItem, styles.read)
                            : clsx(styles.notificationsItem, styles.unRead)
                        }
                        href={item.link}
                        onClick={() => markReadByCode(item.code)}
                      >
                        <div className={styles.notifyIcon}>
                          <i className={`icomoon icon-loyalty + ${styles.icon}`} />
                        </div>
                        <div className={styles.notifyContent}>
                          <div className={styles.notifyContentTitle}>{item.title}</div>
                          <div className={styles.notifyContentDescription}>{item.description}</div>
                          <small className={styles.createdAt}>
                            <WatchLaterIcon style={{ marginRight: '4px' }} />
                            {DateTimeUtils.getTimeAgo(item.createdTime)}
                          </small>
                        </div>
                        <hr key={uuidv4()} className={styles.divider} />
                      </LinkComp>
                    ))}
                  {notification.length > 0 && (
                    <div style={{ padding: '8px' }}>
                      <LinkComp className={styles.viewAll} href="/notifications">
                        <span>Xem tất cả</span>
                      </LinkComp>
                    </div>
                  )}
                </div>
              </Menu>
              <Tooltip title="Thông báo" arrow>
                <IconButton className={styles.notiIcon} onClick={handleClick}>
                  <Badge
                    badgeContent={unreadNotification}
                    invisible={unreadNotification === 0}
                    color="secondary"
                  >
                    <NotificationsNoneOutlined />
                  </Badge>
                </IconButton>
              </Tooltip>
              <HeaderUser user={user} />
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default InfoHeader;
