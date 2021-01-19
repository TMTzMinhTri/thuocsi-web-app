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
} from 'components';
import { doWithServerSide, CartClient } from 'clients';
import { useCart, withLogin } from 'context';
import { useRouter } from 'next/router';
import LoadingScreen from 'components/organisms/LoadingScreen';
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
  if (!cart || cart?.length === 0) {
    NotifyUtils.info('Vui lòng đặt hàng trước khi thanh toán');
    router.push('/');
    return <LoadingScreen />;
  }
  const [selectedPaymentValue, setSelectedPaymentValue] = React.useState('cod');
  const [selectedDeliveryValue, setSelectedDeliveryValue] = React.useState('normal');
  const [value, setValue] = useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    address: user.address || '',
    billDistrict: user.districtCode || '0',
    billProvince: user.provinceCode || '0',
    billWard: user.wardCode || '0',
  });

  const { itemCount = 0 } = useCart();
  const title = `${itemCount} Sản phẩm trong giỏ hàng nhé!`;

  const dataCustomer = {
    ...value,
    paymentMethod: selectedPaymentValue,
    shippingType: selectedDeliveryValue,
  };

  const handlePaymentChange = (event) => {
    setSelectedPaymentValue(event);
  };

  const handleDeliveryChange = (event) => {
    setSelectedDeliveryValue(event);
  };

  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };

  return (
    <Template title={title} isMobile={isMobile}>
      <div className={styles.payment_wrapper}>
        <Grid spacing={4} container>
          <Grid item xs={12} md={8}>
            <DeliveryInfoForm {...value} handleSetValue={handleSetValue} />
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
                className={styles.text_area}
                aria-label="Ghi chú của khách hàng"
                placeholder="Ghi chú của khách hàng"
                rowsMax={4}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <CheckoutSticky data={dataCustomer} selectedValue={selectedPaymentValue} />
          </Grid>
        </Grid>
      </div>
    </Template>
  );
};
export default withLogin(CheckoutPage);
