import React from 'react';
import { Box, Button } from '@material-ui/core';
import Link from 'next/link';
import { ProductCardBuy } from 'components/organisms';
import styles from '../styles.module.css';

const FooterWithAddToCart = ({product}) => (
  <div className={styles.fwc_wrapper}>
    <Box display="flex" alignItems="center" width="100%">
      <Box flexGrow={1} className={styles.addtocartmb}>
        <ProductCardBuy {...product} product={product} />
      </Box>
      <Box>
        <Link href="/cart">
          <Button
            classes={{ label: styles.label, outlined: styles.outlined, root: styles.root }}
            variant="outlined"
          >
            Xam giỏ hàng
          </Button>
        </Link>
      </Box>
    </Box>
  </div>
  );

export default React.memo(FooterWithAddToCart);
