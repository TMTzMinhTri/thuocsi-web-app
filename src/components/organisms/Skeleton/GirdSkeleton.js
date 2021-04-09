import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { ProductHorizontalSkeleton } from 'components/mocules';
import { Grid } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.css';

const Paging = () => (
  <div className={styles.pagingSkeleton}>
    <Skeleton variant="circle" width={32} height={32} />
    <Skeleton variant="circle" width={32} height={32} />
    <Skeleton variant="circle" width={32} height={32} />
    <Skeleton variant="circle" width={32} height={32} />
  </div>
);

const GridSkeletonProductHorizontal = ({
  counts = [],
  hasPagingTop = false,
  hasPagingBottom = false,
}) => {
  const rows = [];
  for (let i = 0; i < counts; i += 1) {
    rows.push(
      <Grid xl={2} lg={3} md={4} xs={6} className={styles.item} key={uuidv4()} item>
        <ProductHorizontalSkeleton />
      </Grid>,
    );
  }
  return (
    <Grid item className={styles.root} xs={12}>
      {hasPagingTop && <Paging />}
      <Grid container justify="flex-start" alignItems="stretch" direction="row" spacing={2}>
        {rows}
      </Grid>
      {hasPagingBottom && <Paging />}
    </Grid>
  );
};

export default GridSkeletonProductHorizontal;
