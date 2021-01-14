import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useCart } from 'context';
import clsx from 'clsx';
import FormarCurrency from 'utils/FormarCurrency';

import styles from './styles.module.css';

const CheckoutSticky = ({ selectedValue = '' }) => {
  const { itemCount = 0, total = 0 } = useCart();
  const [transferValue, setTransferValue] = React.useState(0);
  const [totalValue, setTotalValue] = React.useState(total);
  const router = useRouter();

  React.useEffect(() => {
    if (selectedValue === 'transfer') {
      const transferFee = (total * 0.5) / 100;
      setTransferValue(Math.round(transferFee));
      const totalRes = Math.round(total - transferFee);
      setTotalValue(totalRes);
    } else {
      setTransferValue(0);
      setTotalValue(total);
    }
  }, [selectedValue, total]);

  return (
    <div className={styles.checkout_sticky}>
      <div className={styles.checkout_title}>
        <h1>
          Đơn Hàng <small>({itemCount} sản phẩm)</small>
        </h1>
        <Button onClick={() => router.push('/cart')} className={styles.btn}>
          Sửa
        </Button>
      </div>
      <Paper className={styles.root} elevation={4}>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Tạm tính</div>
          <div className={styles.checkout_content}>{FormarCurrency(total)}</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Phí vận chuyển</div>
          <div className={styles.checkout_content}>0 đ</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Giảm 0.5% cho đơn hàng chuyển khoản trước.</div>
          <div className={styles.checkout_content}>
            {selectedValue === 'transfer' ? `-${FormarCurrency(transferValue)}` : FormarCurrency(transferValue)}
          </div>
        </div>
        <div className={clsx(styles.d_flex, styles.checkout_promo_code)}>
          <div>
            <FontAwesomeIcon className={styles.icon} icon={faTags} />
            <span>NEWBIE300K1</span>
          </div>
          <div className={styles.bank_info_content}>-300.000đ</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Thành tiền</div>
          <div className={styles.total}>{FormarCurrency(totalValue)}</div>
        </div>
      </Paper>

      <div className={styles.text_right}>
        <p>
          Vui lòng kiểm tra kỹ thông tin giao hàng, hình thức thanh toán và nhấn nút "Thanh Toán" để
          hoàn tất đặt hàng.
        </p>
        <Button className={styles.checkout_btn}>Thanh toán</Button>
      </div>
    </div>
  );
};

export default CheckoutSticky;
