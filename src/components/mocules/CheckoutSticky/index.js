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

const CheckoutSticky = ({ selectedValue = '', data, cart, dataCustomer }) => {
  const { shippingFee = 0, redeemCode, subTotalPrice, totalPrice, totalDiscount = 0 } = cart[0];
  const { itemCount = 0 } = useCart();
  const [transferValue, setTransferValue] = React.useState(0);
  const router = useRouter();

  const validateSubmit = (res) => {
    if (!res.customerName) {
      NotifyUtils.error('Bạn chưa điền tên.');
      return false;
    }

    if (!res.customerPhone) {
      NotifyUtils.error('Bạn chưa điền số điện thoại.');
      return false;
    }

    if (!ValidateUtils.validatePhone(res.customerPhone)) {
      NotifyUtils.error('Bạn chưa điền đúng định dạng số điện thoại.');
      return false;
    }

    if (!res.customerShippingAddress) {
      NotifyUtils.error('Bạn chưa điền địa chỉ.');
      return false;
    }

    if (res.customerProvinceCode === '0') {
      NotifyUtils.error('Bạn chưa chọn tỉnh/thành phố.');
      return false;
    }

    if (res.customerDistrictCode === '0') {
      NotifyUtils.error('Bạn chưa chọn Quận.');
      return false;
    }

    if (res.customerWardCode === '0') {
      NotifyUtils.error('Bạn chưa chọn phường/xã.');
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    if (selectedValue === 'CK') {
      const transferFee = (totalPrice * 0.5) / 100;
      setTransferValue(Math.round(transferFee));
    } else {
      setTransferValue(0);
    }
  }, [selectedValue, totalPrice]);

  const handleSubmit = async () => {
    const formValue = {
      ...data,
      ...dataCustomer,
    };
    if (!validateSubmit(formValue)) {
      return;
    }

    const response = await CheckoutClient.Checkout(formValue);
    if (isValid(response)) {
      const { orderNo } = response.data[0];
      router.push(`/thankyou/${orderNo}`);
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
          <div className={styles.checkout_content}>{FormarCurrency(subTotalPrice)}</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Phí vận chuyển</div>
          <div className={styles.checkout_content}>{FormarCurrency(shippingFee)}</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Giảm 0.5% cho đơn hàng chuyển khoản trước.</div>
          <div className={styles.checkout_content}>
            {selectedValue === 'CK' ? `-${FormarCurrency(transferValue)}` : FormarCurrency(0)}
          </div>
        </div>
        {redeemCode
        && (
        <div className={clsx(styles.d_flex, styles.checkout_promo_code)}>
          <div>
            <FontAwesomeIcon className={styles.icon} icon={faTags} />
            <span>{redeemCode}</span>
          </div>
          <div className={styles.bank_info_content}>{`-${FormarCurrency(totalDiscount)}`}</div>
        </div>
        )}
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Thành tiền</div>
          <div className={styles.total}>{FormarCurrency(totalPrice)}</div>
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
