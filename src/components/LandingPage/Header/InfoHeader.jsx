import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconButton, makeStyles } from '@material-ui/core';
import { CardTravel, House, NewReleases } from '@material-ui/icons';
import ButtonLandingPage from '../../Buttons/ButtonLandingPage';

import PATHS from '../../../constants/Paths';

const useStyles = makeStyles(() => ({
  headerInfo: {
    backgroundColor: '#f4f7fc',
    justifyContent: 'flex-end !important',
    alignItems: 'center !important',
    display: 'flex',
    height: '32px',
    paddingRight: '32px',
  },
  link: {
    padding: '5px',
  },
  noDecoration: {
    textDecoration: 'none',
    fontSize: '12px',
  },
  smallButton: {
    fontSize: 'fontSize',
    padding: '3px',
  },
  Login: {
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between !important',
  },
  Logo: { padding: '15px' },
  DivButtons: {
    padding: '15px',
  },
  Buttons: {
    padding: '15px',
  },
}));

export default function InfoHeader() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.headerInfo}>
        <div className={classes.link}>
          <Link href={PATHS.PATH_NEWS}>
            <a className={classes.noDecoration} href="/">
              <IconButton className={classes.smallButton}>
                <NewReleases />
              </IconButton>
              Tin Tức
            </a>
          </Link>
        </div>
        <div className={classes.link}>
          <Link href={PATHS.PATH_CAREER}>
            <a className={classes.noDecoration} href="/">
              <IconButton className={classes.smallButton}>
                <CardTravel />
              </IconButton>
              Tuyển dụng | Recruitment
            </a>
          </Link>
        </div>
        <div className={classes.link}>
          <Link href={PATHS.PATH_SUPPLIER}>
            <a className={classes.noDecoration} href="/">
              <IconButton className={classes.smallButton}>
                <House />
              </IconButton>
              Đăng ký bán hàng cùng thuocsi
            </a>
          </Link>
        </div>
      </div>
      <div className={classes.Login}>
        <div className={classes.Logo}>
          <Image src="/images/logo_thuocsi.svg" width="164px" height="45px" />
        </div>
        <div className={classes.DivButtons}>
          <ButtonLandingPage name="Đăng Nhập" color="red" />
          <ButtonLandingPage name="Tạo Tài Khoản" />
          {/* <ButtonLandingPage name="Dùng Thử" /> */}
        </div>
      </div>
    </div>
  );
}
