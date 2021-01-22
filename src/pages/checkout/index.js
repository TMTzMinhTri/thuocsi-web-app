/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Grid, TextareaAutosize, Paper } from '@material-ui/core';
import {
  Template,
  DeliveryInfoForm,
  DeliveryMethod,
  PaymentMethod,
  CheckoutSticky,
  LoadingScreen,
} from 'components';
import { doWithServerSide, CartClient } from 'clients';
import { useCart, withLogin } from 'context';
import { useRouter } from 'next/router';
import { NotifyUtils } from 'utils';

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
    window.location.href = '/';

    return {
      props: {
        user: {
          name: '',
          phone: '',
          email: '',
        },
      },
    };
  }
}

const CheckoutPage = ({ user = {}, isMobile, cart }) => {
  const router = useRouter();
  const { itemCount = 0 } = useCart();
  const { note: noteValue } = cart[0];

  const title = `${itemCount} Sản phẩm trong giỏ hàng nhé!`;

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

  return (
    <Template title={title} isMobile={isMobile}>
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
                Trường hợp không tìm được thuốc mong muốn, Quý khách vui lòng điền yêu cầu bên dưới.
                Chúng tôi sẽ liên hệ mua thuốc và báo giá sớm nhất có thể
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
          </Grid>
          <Grid item xs={12} md={4}>
            <CheckoutSticky
              onSetError={handleSetError}
              cart={cart}
              data={value}
              dataCustomer={dataCustomer}
              selectedValue={selectedPaymentValue}
            />
          </Grid>
        </Grid>
      </div>
    </Template>
  );
};
export default withLogin(CheckoutPage);
