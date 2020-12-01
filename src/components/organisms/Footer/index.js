import React from 'react';
import { Grid, Box, Container } from '@material-ui/core';

import Copyright from 'components/mocules/Copyright';
import FooterLeftItem from './components/FooterLeftItem';
import FooterRightItem from './components/FooterRightItem';
import styles from './styles.module.css';

const FooterComp = () => (
  <footer>
    <Box className={styles.global_style}>
      <Container maxWidth="lg">
        <Grid display="flex" justify="space-between" container>
          <FooterLeftItem />
          <FooterRightItem />
        </Grid>
      </Container>
    </Box>
    <Copyright />
  </footer>
);

export default React.memo(FooterComp);
