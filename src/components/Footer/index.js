import React from 'react';
import { Grid, Box, Container, Typography } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import Facebook from '@material-ui/icons/Facebook';
import EmailOutlined from '@material-ui/icons/EmailOutlined';
import Call from '@material-ui/icons/Call';
import clsx from 'clsx';

import useStyles from './style';
import {
  LINK_APPLESTORE,
  LINK_GOOGLEPLAY,
  LINK_LICENSE,
  LINK_REGISTER,
  LOGO_AHAMOVE,
  LOGO_GHN,
  LOGO_GHTK,
  LOGO_LOZA,
  LOGO_GRAB,
  LOGO_NINJA,
  LOGO_MOBILE,
  LOGO_GOOGLEPLAY,
  LOGO_APPSTORE,
  LOGO_FOOTER_REGISTER,
  LOGO_FOOTER_SVG,
} from '../../constants/Images';

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.globalStyle}>
      <Container maxWidth="lg">
        <Grid display="flex" justify="space-between" container>
          <Grid item xs={6}>
            <Box>
              <Link href="/aaa">
                <Image src={LOGO_FOOTER_SVG} width="164" height="40" />
              </Link>
            </Box>
            <Box>
              <Typography className={classes.mb1}>
                <b>
                  <span className={classes.primaryColor}>thuocsi.vn </span>
                  là website thuộc sở hữu của công ty TNHH Buymed.
                </b>
              </Typography>
            </Box>
            <Box
              className={classes.mb3}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
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
                  <span className={classes.link}> 0314758651/KD-0368</span>
                </Link>
              </span>
              <Link href={LINK_REGISTER}>
                <Box mt={2}>
                  <Image src={LOGO_FOOTER_REGISTER} width="117" height="44" />
                </Box>
              </Link>
            </Box>
            <Box className={classes.mb3}>
              <p className={classes.footerHeader}>THÔNG TIN CHUNG</p>
              <Grid container>
                <Grid sm={6} item>
                  <Link href="/1">
                    <Typography className={classes.link}>Giới thiệu về thuocsi.vn</Typography>
                  </Link>
                  <Link href="/2">
                    <Typography className={classes.link}>Hướng dẫn đặt hàng</Typography>
                  </Link>
                  <Link href="/3">
                    <Typography className={classes.link}>Chính sách bảo mật</Typography>
                  </Link>
                  <Link href="/4">
                    <Typography className={classes.link}>Câu hỏi thường gặp (Q&A)</Typography>
                  </Link>
                  <Link href="/5">
                    <Typography className={classes.link}>Chính sách quy định chung</Typography>
                  </Link>
                  <Link href="/6">
                    <Typography className={classes.link}>Tuyển dụng | Recruitment</Typography>
                  </Link>
                </Grid>
                <Grid sm={6} item>
                  <>
                    <Link href="/7">
                      <Typography className={classes.link}>Điều khoản sử dụng</Typography>
                    </Link>
                    <Link href="/8">
                      <Typography className={classes.link}>Cơ chế giải quyết tranh chấp</Typography>
                    </Link>
                    <Link href="/9">
                      <Typography className={classes.link}>Thỏa thuận về dịch vụ TMDT</Typography>
                    </Link>
                    <Link href="/10">
                      <Typography className={classes.link}>Quy chế hoạt động</Typography>
                    </Link>
                    <Link href="/11">
                      <Typography className={classes.link}>
                        Đăng ký bán hàng cùng thuocsi
                      </Typography>
                    </Link>
                  </>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <p className={classes.footerHeader}>DỊCH VỤ GIAO HÀNG</p>
              <Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src={LOGO_GHTK}
                    width="128"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src={LOGO_AHAMOVE}
                    width="107"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src={LOGO_GRAB}
                    width="79"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image src={LOGO_GHN} width="46" height="32" className={classes.footerDelivery} />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src={LOGO_LOZA}
                    width="79"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src={LOGO_NINJA}
                    width="79"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={5} item>
            <Box>
              <p className={classes.footerHeader}>LIÊN HÊ</p>
              <Box mb={2} display="flex" flexDirection="row" alignItems="center">
                <Box
                  style={{
                    color: '#fff',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#dc4e41',
                    borderRadius: '50%',
                  }}
                >
                  <EmailOutlined style={{ width: '20x', height: '20px' }} />
                </Box>
                <Link href="/">
                  <Typography className={clsx(classes.contact, classes.divider, classes.link)}>
                    hotro@thuocsi.vn
                  </Typography>
                </Link>
                <Facebook style={{ color: '#3b5998', fontSize: 30 }} />
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box>
                  <Box
                    style={{
                      color: '#fff',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#dc4e41',
                      borderRadius: '50%',
                    }}
                  >
                    <Call
                      style={{
                        width: '22px',
                        height: '22px',
                      }}
                    />
                  </Box>
                </Box>
                <Link href="tel:02873008840">
                  <Typography className={clsx(classes.contact, classes.link)}>
                    02 873 008 840
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Box>
              <small>Từ T2 đến T6: 8:00 - 18:00</small>
            </Box>
            <Box>
              <Image src={LOGO_MOBILE} width="445" height="445" />
            </Box>

            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
              <Link href={LINK_APPLESTORE}>
                <Image className={classes.link} src={LOGO_APPSTORE} width="159" height="48" />
              </Link>
              <Link href={LINK_GOOGLEPLAY}>
                <Image className={classes.link} src={LOGO_GOOGLEPLAY} width="162" height="51" />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
