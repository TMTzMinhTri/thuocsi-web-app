import React from 'react';
import { Box, Button } from '@material-ui/core';
import Link from 'next/link';

import { FormarCurrency } from 'utils';
import { useCart } from 'context';
import styles from '../styles.module.css';

const FooterWithCart = () => {
  const { itemCount, total = 0 } = useCart();
  return (
    <div className={styles.fwc_wrapper}>
      <Box display="flex" alignItems="center" width="100%">
        <Box flexGrow={1}>
          <div className={styles.total}>
            {FormarCurrency(total)}
          </div>
        </Box>
        <Box>
          <Link href="/cart">
            <Button
              classes={{ label: styles.label, outlined: styles.outlined, root: styles.root }}
              variant="outlined"
            >
              Giỏ hàng ({itemCount})
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default React.memo(FooterWithCart);
