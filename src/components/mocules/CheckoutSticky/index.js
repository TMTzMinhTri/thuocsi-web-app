import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useCart } from 'context';
import clsx from 'clsx';
import { NotifyUtils, ValidateUtils } from 'utils';
import { CheckoutClient, isValid } from 'clients';

import FormarCurrency from 'utils/FormarCurrency';

import styles from './styles.module.css';

const CheckoutSticky = ({ selectedValue = '', data }) => {
  const { itemCount = 0, total = 0 } = useCart();
  const [transferValue, setTransferValue] = React.useState(0);
  const [totalValue, setTotalValue] = React.useState(total);
  const router = useRouter();

  const validateSubmit = (res) => {
    if (!res.name) {
      NotifyUtils.error('Bạn chưa điền tên.');
      return false;
    }

    if (!res.phone) {
      NotifyUtils.error('Bạn chưa điền số điện thoại.');
      return false;
    }

    if (!ValidateUtils.validatePhone(res.phone)) {
      NotifyUtils.error('Bạn chưa điền đúng định dạng số điện thoại.');
      return false;
    }

    if (!res.address) {
      NotifyUtils.error('Bạn chưa điền địa chỉ.');
      return false;
    }

    if (res.billProvince === '0') {
      NotifyUtils.error('Bạn chưa chọn tỉnh/thành phố.');
      return false;
    }

    if (res.billDistrict === '0') {
      NotifyUtils.error('Bạn chưa chọn Quận.');
      return false;
    }

    if (res.billWard === '0') {
      NotifyUtils.error('Bạn chưa chọn phường/xã.');
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    if (selectedValue === 'bank') {
      const transferFee = (total * 0.5) / 100;
      setTransferValue(Math.round(transferFee));
      const totalRes = Math.round(total - transferFee);
      setTotalValue(totalRes);
    } else {
      setTransferValue(0);
      setTotalValue(total);
    }
  }, [selectedValue, total]);

  const handleSubmit = async () => {
    const formValue = {
      ...data,
      totalPrice: totalValue,
      redeemCode: '',
      note: '',
    };
    if (!validateSubmit(formValue)) {
      return;
    }

    const response = await CheckoutClient.Checkout(formValue);
    if (isValid(response)) {
      const { orderID } = response.data[0];
      router.push(`/thankyou/${orderID}`);
    } else {
      NotifyUtils.error(`Thanh toán không thành công chi tiết : ${response.message || 'Lỗi hệ thống'}`);
    }
  };

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
        <Button onClick={handleSubmit} className={styles.checkout_btn}>Thanh toán</Button>
      </div>
    </div>
  );
};

export default CheckoutSticky;
