import React from 'react';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import styles from './styles.module.css';

const ManufacturerList = ({ manufacturers = [], text = '' }) => (
  <div>
    <div className={styles.total}>
      <i>Hiển thị {manufacturers.length} kết quả tìm kiếm cho</i>
      <strong> {text === '' ? 'Tất cả' : text} </strong>
    </div>
    <Grid container className={styles.container} spacing={2}>
      {manufacturers.map((val) => (
        <Grid item xs={3} key={val.slug}>
          <Link href={`manufacturers/${val.slug}`}>
            <div className={styles.manufacturer}> {val?.name} </div>
          </Link>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default ManufacturerList;
