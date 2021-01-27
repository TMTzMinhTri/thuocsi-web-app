import React from 'react';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import styles from './styles.module.css';

const IngredientList = ({ ingredients = [], text = '' }) => {
  const listIngredients = ingredients.map((val) => (
    <Grid item xs={3} key={val.slug}>
      <Link href={`ingredients/${val.slug}`}>
        <div className={styles.ingredient}> {val?.name} </div>
      </Link>
    </Grid>
  ));
  return (
    <div>
      <div className={styles.total}>
        <i>Hiển thị {ingredients.length} kết quả tìm kiếm cho</i>
        <strong> {text === '' ? 'Tất cả' : text} </strong>
      </div>
      <Grid container className={styles.container} spacing={2}>
        {listIngredients}
      </Grid>
    </div>
  );
};

export default IngredientList;
