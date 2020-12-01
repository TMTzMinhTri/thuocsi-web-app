import React from 'react';
import Image from 'next/image';
import { CardTravel, House, NewReleases } from '@material-ui/icons';
import { ButtonLandingPage, LinkComp } from '../../atoms';

import { LOGO_THUOCSI_SVG, PATH_NEWS, PATH_CAREER, PATH_SUPPLIER } from '../../../constants';
import styles from './styles.module.css';

export default function InfoHeader() {
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
          <Image src={LOGO_THUOCSI_SVG} width="164px" height="45px" />
        </div>

        <div className={styles.div_buttons}>
          <ButtonLandingPage name="Đăng Nhập" color="red" />
          <ButtonLandingPage name="Tạo Tài Khoản" />
        </div>
      </div>
    </div>
  );
}
