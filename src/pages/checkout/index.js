/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Grid, TextareaAutosize, Paper, FormControlLabel, Checkbox } from '@material-ui/core';
import {
  Template,
  DeliveryInfoForm,
  DeliveryMethod,
  PaymentMethod,
  CheckoutSticky,
  LoadingScreen,
} from 'components';
import { LinkComp } from 'components/atoms';
import { doWithServerSide, CartClient } from 'clients';
import { useCart, withLogin } from 'context';
import { useRouter } from 'next/router';
import { NotifyUtils } from 'utils';
import { CART_URL } from 'constants/Paths';

import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  try {
    return doWithServerSide(ctx, async () => {
      const [cart] = await Promise.all([CartClient.loadDataCart(ctx)]);
      return {
        props: {
          cart,
        },
      };
    });
  } catch (error) {
    return {
      props: {},
    };
  }
}

const CheckoutPage = ({ user = {}, isMobile, cart }) => {
  const router = useRouter();
  const { itemCount = 0 } = useCart();
  // validate user isActive
  if (!user.isActive) {
    NotifyUtils.info('Tài khoản chưa được kích hoạt');
    router.push(CART_URL);
    return <LoadingScreen />;
  }

  const { note: noteValue } = cart[0];

  const title = `${itemCount} Sản phẩm trong giỏ hàng nhé!`;
  const [checkCondition, setCheckCondition] = React.useState({
    checked: true,
  });

  const [selectedPaymentValue, setSelectedPaymentValue] = React.useState('COD');
  const [selectedDeliveryValue, setSelectedDeliveryValue] = React.useState('NORMAL');
  const [note, setNote] = React.useState(noteValue);
  const [value, setValue] = useState({
    customerName: user.name || '',
    customerPhone: user.phone || '',
    customerEmail: user.email || '',
    customerShippingAddress: user.address || '',
    customerDistrictCode: user.districtCode || '0',
    customerProvinceCode: user.provinceCode || '0',
    customerWardCode: user.wardCode || '0',
  });

  const [error, setError] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const dataCustomer = {
    paymentMethod: selectedPaymentValue,
    shippingType: selectedDeliveryValue,
    note,
  };

  if (!cart || cart?.length === 0) {
    NotifyUtils.info('Vui lòng đặt hàng trước khi thanh toán');
    router.push('/');
    return <LoadingScreen />;
  }

  const handlePaymentChange = (event) => {
    setSelectedPaymentValue(event);
  };

  const handleDeliveryChange = (event) => {
    setSelectedDeliveryValue(event);
  };

  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };

  const handleSetError = (key, val) => {
    setError({ ...value, [key]: val });
  };

  const handleSetNote = (e) => {
    setNote(e.target.value);
  };

  const GreenCheckbox = (props) => (
    <Checkbox classes={{ root: styles.checkbox }} color="default" {...props} />
  );

  const handleCheckCondition = (event) => {
    setCheckCondition({ ...checkCondition, [event.target.name]: event.target.checked });
  };

  return (
    <Template title={title} isMobile={isMobile}>
      <div className={styles.wrapper_gray}>
        <div className={styles.payment_wrapper}>
          <Grid spacing={4} container>
            <Grid item xs={12} md={8}>
              <DeliveryInfoForm {...error} {...value} handleSetValue={handleSetValue} />
              <DeliveryMethod
                selectedValue={selectedDeliveryValue}
                handleChange={handleDeliveryChange}
              />
              <PaymentMethod
                selectedValue={selectedPaymentValue}
                handleChange={handlePaymentChange}
              />

              <Paper className={styles.root} elevation={4}>
                <h4>Ghi chú khác</h4>
                <p>
                  Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên
                  dưới. Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể
                </p>
                <TextareaAutosize
                  name="note"
                  value={note}
                  onChange={handleSetNote}
                  className={styles.text_area}
                  aria-label="Ghi chú của khách hàng"
                  placeholder="Ghi chú của khách hàng"
                  rowsMax={4}
                />
              </Paper>
              <div className={styles.condition}>
                <FormControlLabel
                  control={(
                    <GreenCheckbox
                      checked={checkCondition.checked}
                      onChange={handleCheckCondition}
                      name="checked"
                    />
                  )}
                  label={(
                    <span className={styles.check_agree_txt}>
                      Tôi đồng ý với{' '}
                      <LinkComp href="/condition" className={styles.btn} color="#00b46e" target>
                        Điều khoản sử dụng
                      </LinkComp>
                    </span>
                  )}
                />
                <div className={styles.list_note}>
                  <p>
                    1. Thuocsi có thể hủy đơn hàng của bạn nếu chênh lệch hơn 5% giá trị sản phẩm.
                  </p>
                  <p>
                    2. Số lượng sản phẩm khi giao có thể không đảm bảo đúng nhu cầu ban đầu tùy
                    thuộc vào nhà cung cấp.
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <CheckoutSticky
                onSetError={handleSetError}
                cart={cart}
                data={value}
                dataCustomer={dataCustomer}
                checkCondition={checkCondition}
                selectedValue={selectedPaymentValue}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Template>
  );
};
export default withLogin(CheckoutPage);
