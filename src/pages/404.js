import React from 'react';
import { Typography, Grid, Container } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import Button from 'components/atoms/Button';

import styled from 'styled-components';

const Error404 = ({ className }) => (
  <Container className={`${className}`}>
    <Grid container style={{ width: '100%' }}>
      <Grid item container xs={12}>
        <Grid align="center" item xs={12}>
          <Image height="100px" width="100px" src="/images/logo_thuocsi_2.png" />
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Có chuyện gì đó đã xảy ra...
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" variant="subtitle2">
            Mã lỗi: 404
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" variant="subtitle2" className="weightLow">
            Có vẻ như đã có lỗi xảy ra.
          </Typography>
          <br />
          {/* <Typography align="center" variant="subtitle2" className="weightLow">
            Liên hệ ngay với chúng tôi thông qua số điện thoại: 02 873 008 840 nếu bạn cần trợ giúp
            ngay lập tức
          </Typography> */}
        </Grid>
        <Grid align="center" item xs={12}>
          Hoặc quay lại trang chủ:
          <br />
          <ul className="list">
            <li>
              <Link href="/">
                <Button color="#fff">Quay lại trang chủ</Button>
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

const StyledError404 = styled(Error404)`
  background-color: transparent !important;
  padding: 15px !important;
  top: calc(50% - 170px);
  bottom: calc(50% - 170px);
  position: absolute;
  max-width: 100%;

  .boldText {
    font-weight: 500;
    font-size: 60px;
    color: red;
  }

  .weightLow {
    font-weight: 400;
  }

  .list {
    list-style-type: none;
    padding-inline-start: 0px;
    margin-top: 10px;
  }

  .lottie {
    height: 500px;
    width: 400px;
  }
`;

export default StyledError404;
