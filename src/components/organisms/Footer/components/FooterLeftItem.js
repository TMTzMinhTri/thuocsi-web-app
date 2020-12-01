import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';

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
import styles from '../styles.module.css';

const FooterLeftItem = () => (
  <Grid item xs={6}>
    <Box>
      <a href="/aaa">
        <Image src={LOGO_FOOTER_SVG} width="164" height="40" />
      </a>
    </Box>
    <Box>
      <Typography className={styles.mb1}>
        <b>
          <span className={styles.primary_color}>thuocsi.vn </span>
          là website thuộc sở hữu của công ty TNHH Buymed.
        </b>
      </Typography>
    </Box>
    <Box className={styles.mb3} display="flex" flexDirection="column" alignItems="flex-start">
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
        <Box mt={2}>
          <Image src={LOGO_FOOTER_REGISTER} width="117" height="44" />
        </Box>
      </a>
    </Box>
    <Box className={styles.mb3}>
      <p className={styles.footer_header}>THÔNG TIN CHUNG</p>
      <Grid container>
        <Grid sm={6} item>
          <Link href="/1">
            <Typography className={styles.link}>Giới thiệu về thuocsi.vn</Typography>
          </Link>
          <Link href="/2">
            <Typography className={styles.link}>Hướng dẫn đặt hàng</Typography>
          </Link>
          <Link href="/3">
            <Typography className={styles.link}>Chính sách bảo mật</Typography>
          </Link>
          <Link href="/4">
            <Typography className={styles.link}>Câu hỏi thường gặp (Q&A)</Typography>
          </Link>
          <Link href="/5">
            <Typography className={styles.link}>Chính sách quy định chung</Typography>
          </Link>
          <Link href="/6">
            <Typography className={styles.link}>Tuyển dụng | Recruitment</Typography>
          </Link>
        </Grid>
        <Grid sm={6} item>
          <>
            <Link href="/7">
              <Typography className={styles.link}>Điều khoản sử dụng</Typography>
            </Link>
            <Link href="/8">
              <Typography className={styles.link}>Cơ chế giải quyết tranh chấp</Typography>
            </Link>
            <Link href="/9">
              <Typography className={styles.link}>Thỏa thuận về dịch vụ TMDT</Typography>
            </Link>
            <Link href="/10">
              <Typography className={styles.link}>Quy chế hoạt động</Typography>
            </Link>
            <Link href="/11">
              <Typography className={styles.link}>Đăng ký bán hàng cùng thuocsi</Typography>
            </Link>
          </>
        </Grid>
      </Grid>
    </Box>
    <Box>
      <p className={styles.footer_header}>DỊCH VỤ GIAO HÀNG</p>
      <Box>
        <Box className={styles.brand_wrap}>
          <Image src={LOGO_GHTK} width="128" height="32" className={styles.footer_delivery} />
        </Box>
        <Box className={styles.brand_wrap}>
          <Image src={LOGO_AHAMOVE} width="107" height="32" className={styles.footer_delivery} />
        </Box>
        <Box className={styles.brand_wrap}>
          <Image src={LOGO_GRAB} width="79" height="32" className={styles.footer_delivery} />
        </Box>
        <Box className={styles.brand_wrap}>
          <Image src={LOGO_GHN} width="46" height="32" className={styles.footer_delivery} />
        </Box>
        <Box className={styles.brand_wrap}>
          <Image src={LOGO_LOZA} width="79" height="32" className={styles.footer_delivery} />
        </Box>
        <Box className={styles.brand_wrap}>
          <Image src={LOGO_NINJA} width="79" height="32" className={styles.footer_delivery} />
        </Box>
      </Box>
    </Box>
  </Grid>
);

export default React.memo(FooterLeftItem);
