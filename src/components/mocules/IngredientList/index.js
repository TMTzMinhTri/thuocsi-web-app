import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import styles from './styles.module.css';

const IngredientList = ({ ingredients = [], word = '#' }) => {
  const [values, setValues] = useState([]);
  useEffect(() => {
    if (word === '#') setValues(ingredients);
    else {
      const ws = ingredients.filter(
        (ingredient) => ingredient?.name?.charAt(0).toUpperCase() === word,
      );
      setValues(ws);
    }
  }, [word]);
  return (
    <div>
      <div className={styles.total}>
        <i>Hiển thị {values.length} kết quả tìm kiếm cho</i>
        <strong> {word === '#' ? 'Tất cả' : `Tiền tố ${word}`} </strong>
      </div>
      <Grid container className={styles.container} spacing={2}>
        {values.map((val) => (
          <Grid item xs={3}>
            <Link href={`ingredients/${val.slug}`}>
              <div className={styles.ingredient}> {val?.name} </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default IngredientList;
