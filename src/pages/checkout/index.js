/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import {
  Template,
  DeliveryInfoForm,
  DeliveryMethod,
  PaymentMethod,
  CheckoutSticky,
  LoadingScreen,
} from 'components';
import { doWithServerSide, CartClient } from 'clients';
import { useCart } from 'context';
import { withLogin } from 'HOC';
import { useRouter } from 'next/router';
import { NotifyUtils, DateTimeUtils } from 'utils';
import { CART_URL } from 'constants/Paths';
import { HOLIDAYS } from 'constants/data';
import CartNote  from 'components/mocules/CartNote';

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

const MIMIMUM_PRICE = 5000000;

const CheckoutPage = ({ user = {}, isMobile, cart }) => {
  const router = useRouter();
  const { itemCount = 0 } = useCart();
  // validate user isActive
  if (!user.isActive) {
    NotifyUtils.info('Tài khoản chưa được kích hoạt');
    router.push(CART_URL);
    return <LoadingScreen />;
  }

  const { totalPrice = 0 } = cart[0];
  // Xử lý ngày tháng
  const date = new Date();
  const day = date.getDay();
  const today = DateTimeUtils.getFormattedDate(date, 'DDMM');

  const title = `${itemCount} Sản phẩm trong giỏ hàng nhé!`;
  const [selectedPaymentValue, setSelectedPaymentValue] = React.useState('COD');
  const [selectedDeliveryValue, setSelectedDeliveryValue] = React.useState('standard');
  const [value, setValue] = useState({
    customerName: user.name || '',
    customerPhone: user.phone || '',
    customerEmail: user.email || '',
    customerShippingAddress: user.address || '',
    customerDistrictCode: user.districtCode || '0',
    customerProvinceCode: user.provinceCode || '0',
    customerWardCode: user.wardCode || '0',
  });
  const condition =
    Number(value.customerProvinceCode) === 79 &&
    !(Number(value.customerDistrictCode) === 787 || Number(value.customerDistrictCode) === 783) &&
    totalPrice <= MIMIMUM_PRICE &&
    !(day === 6 || day === 0) &&
    !HOLIDAYS.includes(today);
  // day: 0 -> CN day: 6 -> T7

  const [error, setError] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const dataCustomer = {
    paymentMethod: selectedPaymentValue,
    shippingType: selectedDeliveryValue,
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
    setSelectedDeliveryValue(event.target.value);
  };

  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };

  const handleSetError = (key, val) => {
    setError({ ...value, [key]: val });
  };

  // TODO: cần kiểm tra lại
  const handleChangeAddress = (idProvince, idDistrict, idWard, province, district, ward) => {
    if (Number(province) !== 79) {
      setSelectedDeliveryValue('standard');
    }
    setValue({ ...value, [idProvince]: province, [idDistrict]: district, [idWard]: ward });
  };

  return (
    <Template title={title} isMobile={isMobile}>
      <div className={styles.wrapper_gray}>
        <div className={styles.payment_wrapper}>
          <Grid spacing={4} container>
            <Grid item xs={12} md={8}>
              <DeliveryInfoForm
                {...error}
                {...value}
                handleSetValue={handleSetValue}
                handleChangeAddress={handleChangeAddress}
              />
              <DeliveryMethod
                isValidCondition={condition}
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
                <CartNote />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <CheckoutSticky
                onSetError={handleSetError}
                cart={cart}
                data={value}
                dataCustomer={dataCustomer}
                selectedValue={selectedPaymentValue}
                isMobile={isMobile}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Template>
  );
};
export default withLogin(CheckoutPage);
