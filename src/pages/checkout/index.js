/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Template from 'components/layout/Template';
import {
  DeliveryInfoForm,
  DeliveryMethod,
  PaymentMethod,
  CheckoutSticky,
  CartNote,
} from 'components/mocules';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { CartClient, getData } from 'clients';
import { doWithServerSide, PricingService } from 'services';
import { useCart } from 'context';
import { withLogin } from 'HOC';
import { useRouter } from 'next/router';
import { NotifyUtils } from 'utils';
import { CART_URL } from 'constants/Paths';

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

const CheckoutPage = ({ user = {}, isMobile, cart, paymentMethods = [], deliveryMethods = [] }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // validate user isActive
  if (!user.isActive) {
    NotifyUtils.info('Tài khoản chưa được kích hoạt');
    router.push(CART_URL);
    return <LoadingScreen />;
  }

  if (user.isQuest) {
    NotifyUtils.info(
      'Bạn đang sử dụng tài khoản dùng thử, vui lòng tạo tài khoản để có thể thanh toán đơn hàng.',
    );
    router.push(CART_URL);
    return <LoadingScreen />;
  }

  const deliveryMethodDefault = deliveryMethods[0]?.code || '';
  const paymentMethodDefault = paymentMethods[0]?.code || '';

  const {
    itemCount = 0,
    totalPrice = 0,
    updateDeliveryMethod,
    updatePaymentMethod,
    paymentMethod = paymentMethodDefault,
    deliveryPlatform = deliveryMethodDefault,
    customerName,
    customerPhone,
    customerEmail,
    customerProvinceCode,
    customerDistrictCode,
    customerWardCode,
    customerShippingAddress,
  } = useCart();

  // Xử lý ngày tháng
  const [state, setState] = React.useState({
    saveInfoShipping: true,
  });

  const title = `${itemCount} Sản phẩm trong giỏ hàng nhé!`;

  const [value, setValue] = useState({
    customerName: customerName || user.name || '',
    customerPhone: customerPhone || user.phone || '',
    customerEmail: customerEmail || user.email || '',
    customerShippingAddress: customerShippingAddress || user.address || '',
    customerDistrictCode: customerDistrictCode || user.districtCode || '0',
    customerProvinceCode: customerProvinceCode || user.provinceCode || '0',
    customerWardCode: customerWardCode || user.wardCode || '0',
  });

  const [totalWard, setTotalWard] = useState();

  const [error, setError] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const dataCustomer = {
    paymentMethods,
    paymentMethod: paymentMethod || paymentMethodDefault,
    deliveryMethods,
    deliveryPlatform: deliveryPlatform || deliveryMethodDefault,
    totalWard,
    ordersCount: user.ordersCount || 0,
  };

  if (!cart || cart?.length === 0) {
    NotifyUtils.info('Vui lòng đặt hàng trước khi thanh toán');
    router.push('/');
    return <LoadingScreen />;
  }

  const handlePaymentChange = (event) => {
    updatePaymentMethod({ paymentMethod: event.target.value, ...value });
  };

  const handleDeliveryChange = (event) => {
    const deliveryMethod = event.target.value;
    updateDeliveryMethod({ deliveryMethod, ...value });
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
    setValue({
      ...value,
      [idProvince]: province,
      [idDistrict]: district,
      [idWard]: ward,
    });
  };

  const handleLoading = (val) => {
    setIsLoading(val);
  };

  return (
    <Template
      title={title}
      isMobile={isMobile}
      point={user?.point || 0}
      balance={user?.balance || 0}
    >
      <div className={styles.wrapper_gray}>
        <div className={styles.payment_wrapper}>
          <Grid spacing={4} container>
            <Grid item xs={12} md={8}>
              <DeliveryInfoForm
                {...error}
                {...value}
                setError={setError}
                isChecked={state?.saveInfoShipping}
                handleSetValue={handleSetValue}
                handleChangeAddress={handleChangeAddress}
                handleChangeCheckbox={handleChangeCheckbox}
                setTotalWard={setTotalWard}
              />
              <DeliveryMethod
                totalPrice={totalPrice}
                deliveryMethods={deliveryMethods}
                addressSelect={value}
                selectedValue={deliveryPlatform}
                handleChange={handleDeliveryChange}
              />
              <PaymentMethod
                paymentMethods={paymentMethods}
                selectedValue={paymentMethod}
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
                onLoading={handleLoading}
                cart={cart}
                data={value}
                dataCustomer={dataCustomer}
                selectedValue={paymentMethod}
                isMobile={isMobile}
                state={state}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      {isLoading && (
        <div className={styles.overlay}>
          <LoadingScreen />
        </div>
      )}
    </Template>
  );
};
export default withLogin(CheckoutPage);
