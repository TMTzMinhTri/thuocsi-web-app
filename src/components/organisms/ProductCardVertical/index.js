import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import { useRouter } from 'next/router';
import { MISSING_IMAGE } from 'constants/Images';
import { getPathProductBySlug } from 'constants/Paths';
import { ProductCardContent, StatusProduct } from 'components/mocules';
import Image from 'next/image';
import ProductCardBuy from '../ProductCardBuy';
import styles from './styles.module.css';

const ProductCardVertical = ({ product, type, category, tag, cart, onIncrement }) => {
  const { name, imagesProxy } = product;

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
            {/* <CardMedia
              component="img"
              alt={name && name}
              height="140"
              image={`${(imagesProxy && imagesProxy[0]) || MISSING_IMAGE}?size=200`}
              title={name && name}
            /> */}

            <Image
              src={`${(imagesProxy && imagesProxy[0]) || MISSING_IMAGE}?size=200`}
              alt={name && name}
              width={227}
              height={143}
              objectFit="contain"
              loading="lazy"
              title={name && name}
              className={styles.image}
            />
          </CardActionArea>
          <ProductCardContent tag={tag} cate={category} row {...product} />
        </div>
        <div>
          <ProductCardBuy
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
