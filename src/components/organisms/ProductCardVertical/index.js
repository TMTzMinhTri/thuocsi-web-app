import React from 'react';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import { useRouter } from 'next/router';
import { MISSING_IMAGE } from 'constants/Images';
import { getPathProductBySlug } from 'constants/Paths';
import { ProductCardContent, StatusProduct } from 'components/mocules';
import ProductCardBuy from '../ProductCardBuy';
import styles from './styles.module.css';

const ProductCardVertical = ({ product, type, category, tag, cart, onIncrement, value }) => {
  const { name, imageUrls } = product;
  const router = useRouter();
  return (
    <div className={styles.root_card}>
      <StatusProduct {...product} />
      <Card className={styles.product_card}>
        <div>
          <CardActionArea
            onClick={() => router.push(getPathProductBySlug(product.slug))}
            className={styles.product_image}
          >
            <CardMedia
              component="img"
              alt={name && name}
              height="140"
              image={(imageUrls && imageUrls[0]) || MISSING_IMAGE}
              title={name && name}
            />
          </CardActionArea>
          <ProductCardContent tag={tag} cate={category} row {...product} />
        </div>
        <div>
          <ProductCardBuy
            value={value}
            product={product}
            onIncrement={onIncrement}
            cart={cart}
            type={type}
            row
            {...product}
          />
        </div>
      </Card>
    </div>
  );
};

export default ProductCardVertical;
