import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import Image from 'next/image';
import {
  LOGO_SEEDSTAR,
  LOGO_TCCS,
  LOGO_PITCHPALACE,
  LOGO_NTTDATA,
  LOGO_ECHELON,
  LOGO_E27,
  LOGO_FORBES,
  LOGO_INVESTGLOBAL,
} from '../../../constants/Images';

import useStyles from './style';

const Media = () => {
  const classes = useStyles();
  return (
    <div className={classes.mediaWrapper}>
      <Box fontWeight="fontWeightBold">
        <Typography variant="h4" align="center">
          Truyền thông nói gì về thuocsi.vn
        </Typography>
      </Box>

      <Grid direction="column" container>
        <Grid className={classes.container} container item xs={12} alignItems="center">
          <Grid className={classes.hoverLink} item xs={3}>
            <Image src={LOGO_SEEDSTAR} width="168" height="76" />
          </Grid>
          <Grid className={classes.hoverLink} item xs={3}>
            <Image src={LOGO_TCCS} width="162" height="99" />
          </Grid>
          <Grid className={classes.hoverLink} item xs={3}>
            <Image src={LOGO_PITCHPALACE} width="182" height="190" />
          </Grid>
          <Grid className={classes.hoverLink} item xs={3}>
            <Image src={LOGO_NTTDATA} width="166" height="203" />
          </Grid>
        </Grid>
        <Grid className={classes.container} container item xs={12} alignItems="center">
          <Grid className={classes.hoverLink} item xs={3}>
            <Image className={classes.dark} src={LOGO_ECHELON} width="165" height="103" />
          </Grid>
          <Grid className={classes.hoverLink} item xs={3}>
            <Image src={LOGO_INVESTGLOBAL} width="166" height="166" />
          </Grid>
          <Grid className={classes.hoverLink} item xs={3}>
            <Image src={LOGO_FORBES} width="166" height="94" />
          </Grid>
          <Grid className={classes.hoverLink} item xs={3}>
            <Image src={LOGO_E27} width="166" height="166" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Media;
