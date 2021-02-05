import React from 'react';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { ProductCardBuy } from 'components/organisms';
import styles from '../styles.module.css';

const FooterWithAddToCart = ({product}) => (
  <div className={styles.fwc_wrapper}>
    <div className={styles.fwc_container}>
      <div className={styles.addtocartmb}>
        <ProductCardBuy {...product} product={product} />
      </div>
      <div>
        <Link href="/cart">
          <Button
            classes={{ label: styles.label, outlined: styles.outlined }}
            variant="outlined"
          >
            Xem giỏ hàng
          </Button>
        </Link>
      </div>
    </div>
  </div>
  );

export default React.memo(FooterWithAddToCart);
