import React, { useState } from 'react';
import { Paper, FormControlLabel, Checkbox, Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useCart, useAuth } from 'context';
import clsx from 'clsx';
import { NotifyUtils, ValidateUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import {
  // CustomerClient,
  CheckoutClient,
  isValid,
} from 'clients';
import { THANKYOU_URL } from 'constants/Paths';
import { LinkComp, ButtonDefault } from 'components/atoms';

import styles from './styles.module.css';

// comp thanh toán , sticky
const CheckoutSticky = ({
  data,
  dataCustomer,
  onSetError,
  isMobile,
  onLoading,
  // savedInfo,
}) => {
  const {
    redeemCode = [],
    subTotalPrice = 0,
    totalPrice = 0,
    deliveryPlatformFee = 0,
    paymentMethodFee = 0,
    itemCount = 0,
    discount = 0,
    updateCart,
    redeemApplyResult = [],
  } = useCart();

  const { user } = useAuth();
  const router = useRouter();
  const [checkCondition, setCheckCondition] = useState({
    checked: true,
  });
  const deliveryData =
    dataCustomer.deliveryMethods.filter((item) => item.code === dataCustomer.deliveryMethod) || [];

  const subTitleDelivery = deliveryData?.[0]?.subTitle || null;
  const paymentData =
    dataCustomer.paymentMethods.filter((item) => item.code === dataCustomer.paymentMethod) || [];
  const subTitlePayment = paymentData?.[0]?.subTitle || null;

  const GreenCheckbox = React.memo((props) => (
    <Checkbox classes={{ root: styles.checkbox }} color="default" {...props} />
  ));

  const { canUse = false, code = '' } = redeemApplyResult[0] || {};

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
      Tôi đồng ý với
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

    if (res.customerWardCode === '0' && res.totalWard > 0) {
      NotifyUtils.error('Bạn chưa chọn phường/xã.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    onLoading(true);
    const formValue = {
      ...data,
      ...dataCustomer,
    };
    if (!validateSubmit(formValue)) {
      onLoading(false);
      return;
    }
    if (!checkCondition.checked) {
      onLoading(false);
      NotifyUtils.error(`Bạn chưa chấp nhận điều khoản sử dụng`);
      return;
    }

    const response = await CheckoutClient.Checkout(formValue);
    if (isValid(response)) {
      const { orderId } = response.data[0];
      updateCart();
      router.push(`${THANKYOU_URL}/${orderId}`);
    } else {
      onLoading(false);
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
        <ButtonDefault
          onClick={() => router.push('/cart')}
          className={styles.btn}
          title="Sửa đơn hàng"
        >
          Sửa
        </ButtonDefault>
      </div>
      <Paper className={styles.root} elevation={4}>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Tạm tính</div>
          <div className={styles.checkout_content}>{formatCurrency(subTotalPrice)}</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>
            <div className={styles.checkout_label_first}>
              {deliveryData?.[0]?.name || 'Phí vận chuyển'}
            </div>
            {subTitleDelivery && (
              <div className={styles.checkout_label_second}>{subTitleDelivery}</div>
            )}
          </div>
          <div className={styles.checkout_content}>{formatCurrency(deliveryPlatformFee)}</div>
        </div>
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>
            <div className={styles.checkout_label_first}>
              {paymentData?.[0]?.name || 'Phí thanh toán'}
            </div>
            {subTitlePayment && (
              <div className={styles.checkout_label_second}>{subTitlePayment}</div>
            )}
          </div>
          <div className={styles.checkout_content}>{formatCurrency(paymentMethodFee)}</div>
        </div>
        {canUse && redeemCode && redeemCode[0] && (
          <div className={clsx(styles.d_flex, styles.checkout_promo_code)}>
            <div>
              <FontAwesomeIcon className={styles.icon} icon={faTags} />
              <span>{code}</span>
            </div>
            <div className={styles.bank_info_content}>{`-${formatCurrency(discount)}`}</div>
          </div>
        )}
        <div className={styles.d_flex}>
          <div className={styles.checkout_label}>Thành tiền</div>
          <div className={styles.total}>{formatCurrency(Math.max(0, totalPrice))}</div>
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
          <Tooltip
            title={
              checkCondition.checked &&
              'Vui lòng đồng ý với điều khoản sử dụng trước khi thanh toán'
            }
          >
            <span>
              <ButtonDefault
                disabled={!checkCondition.checked}
                btnType="warning"
                className={styles.checkout_btn}
                onClick={handleSubmit}
              >
                Thanh toán
              </ButtonDefault>
            </span>
          </Tooltip>
        ) : (
          <div className={styles.sticky_checkout_bar_mobile}>
            <div className={styles.fwc_container}>
              <div className={styles.price}>{formatCurrency(subTotalPrice)}</div>
              <div>
                <ButtonDefault
                  disabled={!checkCondition.checked || user.isQuest}
                  btnType="warning"
                  onClick={handleSubmit}
                  classes={{
                    label: styles.label,
                    outlined: styles.outlined,
                    root: styles.root_btn,
                  }}
                >
                  Thanh toán
                </ButtonDefault>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSticky;
