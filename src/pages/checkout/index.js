/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */

import React, { useCallback, useState } from 'react';
import { Grid, TextareaAutosize, Paper } from '@material-ui/core';
import {
  Template,
  DeliveryInfoForm,
  DeliveryMethod,
  PaymentMethod,
  CheckoutSticky,
  LoadingScreen,
} from 'components';
import { doWithServerSide, CartClient, isValid } from 'clients';
import { useCart } from 'context';
import { withLogin } from 'HOC';
import { useRouter } from 'next/router';
import { NotifyUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
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

  const { note: noteValue } = (cart && cart[0]) || {};

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

  const handleUpdateNote = useCallback(async () => {
    try {
      const res = await CartClient.updateNote(note);
      if (!isValid(res)) throw new Error(res.messsage);
      NotifyUtils.success('Cập nhật ghi chú thành công');
    } catch (err) {
      NotifyUtils.error(err?.message || 'Cập nhật ghi chú thất bại');
    }
  });

  const handleSetNote = (e) => {
    setNote(e.target.value);
    // TODO update cart
    debounceFunc500(handleUpdateNote);
  };

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
                handleSetValue={handleSetValue}
                handleChangeAddress={handleChangeAddress}
              />
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
