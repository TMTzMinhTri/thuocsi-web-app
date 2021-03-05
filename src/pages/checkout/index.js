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
import { CartClient, getData } from 'clients';
import { doWithServerSide, PricingService } from 'services';
import { useCart } from 'context';
import { withLogin } from 'HOC';
import { useRouter } from 'next/router';
import { NotifyUtils } from 'utils';
import { CART_URL } from 'constants/Paths';
import CartNote from 'components/mocules/CartNote';

import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  try {
    return doWithServerSide(ctx, async () => {
      const [cartRes, paymentMethods, deliveryMethods] = await Promise.all([
        CartClient.loadDataCart(ctx),
        PricingService.getListPaymentMethod({ ctx }),
        PricingService.getListDeliveryMethod({ ctx }),
      ]);
      return {
        props: {
          cart: getData(cartRes),
          paymentMethods,
          deliveryMethods,
        },
      };
    });
  } catch (error) {
    return {
      props: {},
    };
  }
}

const CheckoutPage = ({ user = {}, isMobile, cart, paymentMethods, deliveryMethods }) => {
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
  const [state, setState] = React.useState({
    saveInfoShipping: true,
  });

  const title = `${itemCount} Sản phẩm trong giỏ hàng nhé!`;
  const [selectedPaymentValue, setSelectedPaymentValue] = React.useState('PAYMENT_METHOD_NORMAL');
  const [selectedDeliveryValue, setSelectedDeliveryValue] = React.useState(
    'DELIVERY_PLATFORM_NORMAL',
  );
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
    deliveryPlatform: selectedDeliveryValue,
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

  const handleChangeCheckbox = (event) => {
    setState({ [event.target.name]: event.target.checked });
  };

  // TODO: cần kiểm tra lại
  const handleChangeAddress = (idProvince, idDistrict, idWard, province, district, ward) => {
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
                isChecked={state?.saveInfoShipping}
                handleSetValue={handleSetValue}
                handleChangeAddress={handleChangeAddress}
                handleChangeCheckbox={handleChangeCheckbox}
              />
              <DeliveryMethod
                totalPrice={totalPrice}
                deliveryMethods={deliveryMethods}
                addressSelect={value}
                selectedValue={selectedDeliveryValue}
                handleChange={handleDeliveryChange}
              />
              <PaymentMethod
                paymentMethods={paymentMethods}
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
                state={state}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Template>
  );
};
export default withLogin(CheckoutPage);
