import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useModal } from 'hooks';
import {
  LINK_LICENSE,
  LINK_REGISTER,
  LOGO_AHAMOVE,
  LOGO_GHN,
  LOGO_GHTK,
  LOGO_LOZA,
  LOGO_GRAB,
  LOGO_NINJA,
  LOGO_FOOTER_REGISTER,
  LOGO_FOOTER_SVG,
} from 'constants/Images';
import { Dialog } from 'components/mocules';
import styles from '../styles.module.css';

const FooterLeftItem = () => {
  const router = useRouter();
  const [open, toggleOpen] = useModal();
  const [dialogUrl, setDialogUrl] = useState('');
  const handleToggleOpen = (url) => {
    setDialogUrl(url);
    toggleOpen();
  };
  return (
    <Grid item xs={6}>
      <div>
        <Link href="/">
          <Image src={LOGO_FOOTER_SVG} width="164" height="40" />
        </Link>
      </div>
      <div>
        <Typography className={styles.mb1}>
          <b>
            <span className={styles.primary_color}>
              <Link href="/">thuocsi.vn</Link>
            </span> là website thuộc sở hữu của công ty TNHH Buymed.
          </b>
        </Typography>
      </div>
      <div className={clsx(styles.info_wrap, styles.mb3)}>
        <b>Công Ty TNHH Buymed</b>
        <span>
          Địa Chỉ: <b>248A Nơ Trang Long, Phuờng 12, Quận Bình Thạnh, Hồ Chí Minh</b>
        </span>
        <span>
          Số Chứng Nhận Đăng Ký Kinh Doanh: <b>0314758651, Cấp Ngày 29/11/2017</b>,
        </span>
        <span>Tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ Chí Minh</span>
        <span>
          Số Giấy Phép Sàn Thương Mại Điện Tử:
          <Link href={LINK_LICENSE}>
            <span className={styles.link}> 0314758651/KD-0368</span>
          </Link>
        </span>
        <a href={LINK_REGISTER}>
          <div className={styles.mt2}>
            <Image src={LOGO_FOOTER_REGISTER} width="117" height="44" />
          </div>
        </a>
      </div>
      <div className={styles.mb3}>
        <p className={styles.footer_header}>THÔNG TIN CHUNG</p>
        <Grid container>
          <Grid sm={6} item>
            <Link href="/about-us">
              <Typography
                className={[router.pathname === '/about-us' ? styles.active : '', styles.link]}
              >
                Giới thiệu về thuocsi.vn
              </Typography>
            </Link>
            <Link href="/how-to-order">
              <Typography className={styles.link}>Hướng dẫn đặt hàng</Typography>
            </Link>
            <div className="foo" onClick={() => handleToggleOpen('privacy-policy')} role="button" aria-hidden="true">
              <Typography className={styles.link}>Chính sách bảo mật</Typography>
            </div>
            <Link href="/faq">
              <Typography className={styles.link}>Câu hỏi thường gặp (Q&A)</Typography>
            </Link>
            <div className="foo" onClick={() => handleToggleOpen('general-policy')} role="button" aria-hidden="true">
              <Typography className={styles.link}>Chính sách quy định chung</Typography>
            </div>
            <a className={styles.alink} href="/career" target="_blank">
              <Typography className={styles.link}>Tuyển dụng | Recruitment</Typography>
            </a>
          </Grid>
          <Grid sm={6} item>
            <>
              <div className="foo" onClick={() => handleToggleOpen('conditions-of-use')} role="button" aria-hidden="true">
                <Typography className={styles.link}>Điều khoản sử dụng</Typography>
              </div>
              <div className="foo" onClick={() => handleToggleOpen('dispute-resolution')} role="button" aria-hidden="true">
                <Typography className={styles.link}>Cơ chế giải quyết tranh chấp</Typography>
              </div>
              <div className="foo" onClick={() => handleToggleOpen('terms-and-condition')} role="button" aria-hidden="true">
                <Typography className={styles.link}>Thỏa thuận về dịch vụ TMDT</Typography>
              </div>
              <div className="foo" role="button" aria-hidden="true">
                <Typography className={styles.link}>Quy chế hoạt động</Typography>
              </div>
              <a className={styles.alink} href="/register-with-us" target="_blank">
                <Typography className={styles.link}>Đăng ký bán hàng cùng thuocsi</Typography>
              </a>
            </>
          </Grid>
        </Grid>
      </div>
      <div>
        <p className={styles.footer_header}>DỊCH VỤ GIAO HÀNG</p>
        <div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_GHTK} width="128" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_AHAMOVE} width="107" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_GRAB} width="79" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_GHN} width="46" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_LOZA} width="79" height="32" className={styles.footer_delivery} />
          </div>
          <div className={styles.brand_wrap}>
            <Image src={LOGO_NINJA} width="79" height="32" className={styles.footer_delivery} />
          </div>
        </div>
      </div>
      {open
        && (
        <Dialog
          open={open}
          handleClose={toggleOpen}
          url={dialogUrl}
          maxWidth="md"
        />
        )}
    </Grid>
  );
};

export default React.memo(FooterLeftItem);
