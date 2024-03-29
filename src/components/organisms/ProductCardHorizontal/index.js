import React, { useRef } from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import { MISSING_IMAGE } from 'constants/Images';
import { useRouter } from 'next/router';
import { getPathProductBySlug } from 'constants/Paths';
import ProductCardContent from 'components/mocules/ProductCardContent';
import Image from 'next/image';
import ProductCardBuy from '../ProductCardBuy';

import styles from './styles.module.css';

const ProductCardHorizontal = ({ product, isMobile, type }) => {
  const router = useRouter();
  const searchInput = useRef(null);
  const { imagesProxy, slug, name } = product;

  const handleFocus = () => {
    searchInput.current.focus();
  };
  return (
    <div aria-hidden="true" onClick={handleFocus} className={styles.button_container}>
      <div className={styles.root_card}>
        <Card className={styles.product_card}>
          <div className={styles.product_image}>
            <CardActionArea onClick={() => router.push(getPathProductBySlug(slug))}>
              {/* <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="50"
                width="50"
                image={`${(imagesProxy && imagesProxy[0]) || MISSING_IMAGE}?size=50`}
                title="Contemplative Reptile"
              /> */}
              <Image
                src={`${(imagesProxy && imagesProxy[0]) || MISSING_IMAGE}?size=50`}
                alt={name && name}
                width={80}
                height={80}
                objectFit="contain"
                loading="lazy"
                title={name && name}
                className={styles.image}
              />
            </CardActionArea>
          </div>
          {isMobile ? (
            <div className={styles.rightBox}>
              <ProductCardContent tag cate {...product} isMobile={isMobile} />
              <ProductCardBuy
                searchInput={searchInput}
                {...product}
                product={product}
                type={type}
              />
            </div>
          ) : (
            <>
              <ProductCardContent tag cate {...product} />
              <ProductCardBuy
                searchInput={searchInput}
                {...product}
                product={product}
                type={type}
              />
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProductCardHorizontal;
