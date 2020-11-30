import React from 'react';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core';
import { CardTravel, House, NewReleases } from '@material-ui/icons';
import { ButtonLandingPage, LinkComp } from '../../atoms';

import { LOGO_THUOCSI_SVG, PATH_NEWS, PATH_CAREER, PATH_SUPPLIER } from '../../../constants';

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
          <LinkComp name="Tin Tức" href={PATH_NEWS} color="#6c757d !important">
            <NewReleases fontSize="small" />
          </LinkComp>
        </div>
        <div className={classes.link}>
          <LinkComp name="Tuyển dụng | Recruitment" href={PATH_CAREER} color="#6c757d !important">
            <CardTravel fontSize="small" />
          </LinkComp>
        </div>

        <div className={classes.link}>
          <LinkComp name="Tuyển dụng | Recruitment" href={PATH_SUPPLIER} color="#6c757d !important">
            <House fontSize="small" />
          </LinkComp>
        </div>
      </div>
      <div className={classes.Login}>
        <div className={classes.Logo}>
          <Image src={LOGO_THUOCSI_SVG} width="164px" height="45px" />
        </div>

        <div className={classes.DivButtons}>
          <ButtonLandingPage name="Đăng Nhập" color="red" />
          <ButtonLandingPage name="Tạo Tài Khoản" />
        </div>
      </div>
    </div>
  );
}
