import React from 'react';
import { Box, Button } from '@material-ui/core';
import Link from 'next/link';

import { FormarCurrency } from 'utils';
import { useCart } from 'context';
import { useRouter } from 'next/router';
import styles from '../styles.module.css';

const FooterWithCart = () => {
  const { itemCount, total = 0 } = useCart();
  const router = useRouter();
  return (
    <div className={styles.fwc_wrapper}>
      <Box display="flex" alignItems="center" width="100%">
        <Box flexGrow={1}>
          <div className={styles.total}>{FormarCurrency(total)}</div>
        </Box>
        <Box>
          {router.pathname === '/cart' ? (
            <Link href="/checkout">
              <Button
                classes={{
                  label: styles.label,
                  outlined: styles.outlined,
                  root: styles.btn_checkout,
                }}
                variant="outlined"
              >
                Tiếp tục
              </Button>
            </Link>
          ) : (
            <Link href="/cart">
              <Button
                classes={{ label: styles.label, outlined: styles.outlined, root: styles.root }}
                variant="outlined"
              >
                Giỏ hàng ({itemCount})
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default React.memo(FooterWithCart);
