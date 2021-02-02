import React from 'react';
import { Paper, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useCart } from 'context';
import clsx from 'clsx';
import { NotifyUtils, ValidateUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { CheckoutClient, isValid } from 'clients';
import { THANKYOU_URL } from 'constants/Paths';
import { LinkComp } from 'components/atoms';

import styles from './styles.module.css';

const CheckoutSticky = ({ selectedValue = '', data, cart, dataCustomer, onSetError, isMobile }) => {
  const { shippingFee = 0, redeemCode, subTotalPrice, totalPrice, discount = 0 } = cart[0];
  const { itemCount = 0, updateCart, total = 0 } = useCart();
  const [transferValue, setTransferValue] = React.useState(0);
  const router = useRouter();

  const [checkCondition, setCheckCondition] = React.useState({
    checked: false,
  });

  const GreenCheckbox = React.memo((props) => (
    <Checkbox classes={{ root: styles.checkbox }} color="default" {...props} />
  ));

  const handleCheckCondition = (event) => {
    setCheckCondition({ ...checkCondition, [event.target.name]: event.target.checked });
  };

  const GreenCheckBoxElement = (
    <GreenCheckbox
      checked={checkCondition.checked}
      onChange={handleCheckCondition}
      name="checked"
    />
  );
  const LabelConfirm = (
    <span className={styles.check_agree_txt}>
      Tôi đồng ý với{' '}
      <LinkComp href="/condition" color="#00b46e" target>
        Điều khoản sử dụng
      </LinkComp>
    </span>
  );

  const validateSubmit = (res) => {
    if (!res.customerName) {
      NotifyUtils.error('Bạn chưa điền tên.');
      onSetError('name', true);
      return false;
    }

    if (!res.customerPhone) {
      NotifyUtils.error('Bạn chưa điền số điện thoại.');
      onSetError('phone', true);

      return false;
    }

    if (!ValidateUtils.validatePhone(res.customerPhone)) {
      NotifyUtils.error('Bạn chưa điền đúng định dạng số điện thoại.');
      onSetError('phone', true);

      return false;
    }

    if (!res.customerShippingAddress) {
      NotifyUtils.error('Bạn chưa điền địa chỉ.');
      onSetError('address', true);
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
    if (!checkCondition.checked) {
      NotifyUtils.error(`Bạn chưa chấp nhận điều khoản sử dụng`);
      return;
    }

    const response = await CheckoutClient.Checkout(formValue);
    if (isValid(response)) {
      const { orderId } = response.data[0];
      // update
      updateCart();
      router.push(`${THANKYOU_URL}/${orderId}`);
    } else {
      NotifyUtils.error(
        `Thanh toán không thành công chi tiết : ${response.message || 'Lỗi hệ thống'}`,
      );
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
          <div className={styles.checkout_content}>{formatCurrency(totalPrice)}</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Phí vận chuyển</div>
          <div className={styles.checkout_content}>{formatCurrency(shippingFee)}</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Giảm 0.5% cho đơn hàng chuyển khoản trước</div>
          <div className={styles.checkout_content}>
            {selectedValue === 'CK' ? `-${formatCurrency(transferValue)}` : formatCurrency(0)}
          </div>
        </div>
        {redeemCode && redeemCode.length > 0 && (
          <div className={clsx(styles.d_flex, styles.checkout_promo_code)}>
            <div>
              <FontAwesomeIcon className={styles.icon} icon={faTags} />
              <span>{redeemCode}</span>
            </div>
            <div className={styles.bank_info_content}>{`-${formatCurrency(discount)}`}</div>
          </div>
        )}
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Thành tiền</div>
          <div className={styles.total}>{formatCurrency(Math.max(0, subTotalPrice))}</div>
        </div>
      </Paper>

      <div className={styles.text_right}>
        {!isMobile && (
          <p>
            Vui lòng kiểm tra kỹ thông tin giao hàng, hình thức thanh toán và nhấn nút "Thanh Toán"
            để hoàn tất đặt hàng.
          </p>
        )}

        <div className={styles.condition}>
          <FormControlLabel control={GreenCheckBoxElement} label={LabelConfirm} />
          <div className={styles.list_note}>
            <p>1. Thuocsi có thể hủy đơn hàng của bạn nếu chênh lệch hơn 5% giá trị sản phẩm.</p>
            <p>
              2. Số lượng sản phẩm khi giao có thể không đảm bảo đúng nhu cầu ban đầu tùy thuộc vào
              nhà cung cấp.
            </p>
          </div>
        </div>
        {!isMobile ? (
          <Button onClick={handleSubmit} className={styles.checkout_btn}>
            Thanh toán
          </Button>
        ) : (
          <div className={styles.sticky_checkout_bar_mobile}>
            <div className={styles.fwc_container}>
              <div className={styles.price}>{formatCurrency(total)}</div>
              <div>
                <Button
                  classes={{
                    label: styles.label,
                    outlined: styles.outlined,
                    root: styles.root_btn,
                  }}
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSticky;
