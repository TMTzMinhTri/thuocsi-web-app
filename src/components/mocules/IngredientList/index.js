import React from 'react';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import styles from './styles.module.css';

const IngredientList = ({ ingredients = [], text = '' }) => (
  <div>
    <div className={styles.total}>
      <i>Hiển thị {ingredients.length} kết quả tìm kiếm cho</i>
      <strong> {text === '' ? 'Tất cả' : text} </strong>
    </div>
    <Grid container className={styles.container} spacing={2}>
      {ingredients.map((val) => (
        <Grid item xs={3}>
          <Link href={`ingredients/${val.slug}`}>
            <div className={styles.ingredient}> {val?.name} </div>
          </Link>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default IngredientList;
