import React from 'react';
import { Box, Grid, Button } from '@material-ui/core';

import LinkComp from '../LinkComp';
import useStyles from './styles';

const CommonQuestion = () => {
  const classes = useStyles();
  return (
    <Box className={classes.Wrapper}>
      <Box maxWidth="1140px" m="auto">
        <Box component="h2">Câu hỏi thường gặp</Box>
        <Grid container>
          <Grid style={{ display: 'flex' }} direction="column" item sm={6}>
            <LinkComp className={classes.link} href="/">
              Cách đăng ký và đăng nhập tài khoản tại thuocsi.vn
            </LinkComp>
            <LinkComp className={classes.link} href="/">
              Cách đăng ký và đăng nhập tài khoản tại thuocsi.vn
            </LinkComp>
            <LinkComp className={classes.link} href="/">
              Cách đăng ký và đăng nhập tài khoản tại thuocsi.vn
            </LinkComp>
          </Grid>
          <Grid style={{ display: 'flex' }} direction="column" item sm={6}>
            <LinkComp className={classes.link} href="/">
              Cách đăng ký và đăng nhập tài khoản tại thuocsi.vn
            </LinkComp>
            <LinkComp className={classes.link} href="/">
              Cách đăng ký và đăng nhập tài khoản tại thuocsi.vn
            </LinkComp>
            <LinkComp className={classes.link} href="/">
              Cách đăng ký và đăng nhập tài khoản tại thuocsi.vn
            </LinkComp>
          </Grid>
        </Grid>
        <Box>
          <Button className={classes.buttonOutlined} href="/" variant="outlined">
            Xem tất cả câu hỏi
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CommonQuestion;
