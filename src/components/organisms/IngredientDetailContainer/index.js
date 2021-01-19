import React from 'react';
import { Grid, Divider } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { ProductDetailTabs } from 'components/mocules';
import ProductCardVertical from '../ProductCardVertical';
import styles from './styles.module.css';

export const tabsProductData = [
  { id: 1, label: 'Thông tin chung', value: '1' },
  { id: 2, label: 'Chỉ định', value: '2' },
  { id: 3, label: 'Liều lượng - Cách dùng', value: '3' },
  { id: 4, label: 'Chống chỉ định', value: '4' },
  { id: 5, label: 'Tương tác thuốc', value: '5' },
  { id: 6, label: 'Bảo quản', value: '6' },
  { id: 7, label: 'Quá liều', value: '7' },
  { id: 8, label: 'Dược lực học', value: '8' },
  { id: 9, label: 'Dược động học', value: '9' },
];

const IngredientDetailContainer = ({ ingredient, products }) => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 style={{ textAlign: 'center' }}> {ingredient.name} </h1>{' '}
      </Grid>
      <Grid item style={{ padding: '0 10vw' }}>
        <ProductDetailTabs
          product={ingredient}
          data={tabsProductData}
          value={value}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider style={{ marginTop: '30px!important' }} />
      </Grid>
      <Grid item xs={12}>
        <div className={styles.title}>
          <h1>Danh sách các thuốc có {ingredient.name}</h1>
        </div>
      </Grid>
      <Grid container spacing={1}>
        {products.map((item) => (
          <Grid key={uuidv4()} item xl={2} lg={3} md={4} xs={6} className={styles.customGrid}>
            <ProductCardVertical
              key={`products-${item.sku}`}
              product={item}
              value={item.quantity || 0}
              tag
              category
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default IngredientDetailContainer;
