import React from 'react';
import { Grid, Box, Container, Typography } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import clsx from 'clsx';

import useStyles from './style';

const Footer = () => {
  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <Box className={classes.globalStyle}>
      <Container maxWidth="lg">
        <Grid display="flex" justify="space-between" container>
          <Grid xs={6}>
            <Box>
              <Link href="/">
                <Image src="/images/footer/logo_footer.svg" width="164" height="40" />
              </Link>
            </Box>
            <Box mb={2}>
              <Typography className={classes.mb1}>
                <b>
                  <span className={classes.primaryColor}>thuocsi.vn</span>
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
                <Link href="https://buymed-storage.s3-ap-southeast-1.amazonaws.com/trading_license/1.+Trading+License+-+Buymed+(GC+20+June+2019)+(VN).pdf">
                  <span className={classes.link}> 0314758651/KD-0368</span>
                </Link>
              </span>
              <Link href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=52200">
                <Box mt={2}>
                  <Image src="/images/footer/logo_register.png" width="117" height="44" />
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
                    src="/images/footer/logo_ghtk.png"
                    width="128"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src="/images/footer/logo_ahamove.png"
                    width="107"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src="/images/footer/logo_grab.png"
                    width="79"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src="/images/footer/logo_ghn.png"
                    width="46"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src="/images/footer/logo_loza.png"
                    width="79"
                    height="32"
                    className={classes.footerDelivery}
                  />
                </Box>
                <Box className={classes.brandWrap}>
                  <Image
                    src="/images/footer/logo_ninja.png"
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
                <Icon
                  style={{
                    color: '#fff',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#dc4e41',
                    borderRadius: '50%',
                    fontSize: '16px',
                  }}
                  className="far fa-envelope"
                />
                <Link href="/">
                  <Typography className={clsx(classes.contact, classes.divider, classes.link)}>
                    hotro@thuocsi.vn
                  </Typography>
                </Link>
                <Icon
                  style={{
                    color: '#fff',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#3b5998',
                    borderRadius: '50%',
                    fontSize: '16px',
                  }}
                  className="fab fa-facebook-f"
                />
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box>
                  <Icon
                    style={{
                      color: '#fff',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#dc4e41',
                      borderRadius: '50%',
                      fontSize: '16px',
                    }}
                    className="fa fa-phone"
                  />
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
              <Image src="/images/footer/img_mobileapp.png" width="445" height="445" />
            </Box>

            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
              <Link href="https://apps.apple.com/vn/app/thuocsi/id1518730923">
                <Image
                  className={classes.link}
                  src="/images/footer/logo_appstore.png"
                  width="159"
                  height="48"
                />
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.buymed.app&hl=en_US">
                <Image
                  className={classes.link}
                  src="/images/footer/logo_googleplay.png"
                  width="162"
                  height="51"
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
