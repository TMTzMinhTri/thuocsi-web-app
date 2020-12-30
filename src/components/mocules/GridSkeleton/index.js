import React from 'react';
import { ProductHorizontalSkeleton } from 'components/atoms';
import { Grid } from '@material-ui/core';
import styles from './style.module.css';

const GridSkeletonProductHorizontal = ({ counts = [] }) => {
  const rows = [];
  for (let i = 0; i < counts; i += 1) {
    rows.push(
      <Grid xl={2} lg={3} md={4} xs={6} className={styles.item} key={i} item>
        <ProductHorizontalSkeleton />
      </Grid>,
    );
  }
  return (
    <Grid item className={styles.root} xs={12}>
      <Grid container justify="flex-start" alignItems="stretch" direction="row" spacing={2}>
        {rows}
      </Grid>
    </Grid>
  );
};

export default GridSkeletonProductHorizontal;
