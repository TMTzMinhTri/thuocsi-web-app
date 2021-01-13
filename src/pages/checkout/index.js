/* eslint-disable camelcase */

import React, { useState } from 'react';
import { Grid, TextareaAutosize, Paper } from '@material-ui/core';
import {
  Template,
  NavBar,
  Header,
  DeliveryInfoForm,
  DeliveryMethod,
  PaymentMethod,
  CheckoutSticky,
  HeaderMobile,
} from 'components';
import { ProductClient, doWithServerSide, CatClient } from 'clients';
import { withLogin } from 'context';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  try {
    return doWithServerSide(ctx, async () => {
      const [products, brand, group] = await Promise.all([
        ProductClient.loadDataProduct(ctx),
        CatClient.loadBrand(ctx),
        CatClient.loadGroup(ctx),
      ]);
      return {
        props: {
          products,
          brand,
          group,
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
        wallet: {
          balance: 0,
          name: '',
        },
      },
    };
  }
}

const CheckoutPage = ({ user = {}, isMobile }) => {
  const title = 'Thuocsi.vn';
  const [value, setValue] = useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    address: user.address || '',
    billDistrict: user.districtCode || 0,
    billProvince: user.provinceCode || 0,
    billWard: user.wardCode || 0,
  });
  const handleSetValue = (key, val) => {
    setValue({ ...value, [key]: val });
  };
  return (
    <Template title={title} isMobile={isMobile}>
      {isMobile ? <HeaderMobile title="Mã giảm giá" /> : <Header />}
      {!isMobile && <NavBar />}
      <div className={styles.payment_wrapper}>
        <Grid spacing={4} container>
          <Grid item xs={12} md={8}>
            <DeliveryInfoForm {...value} handleSetValue={handleSetValue} />
            <DeliveryMethod />
            <PaymentMethod />

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
            <CheckoutSticky />
          </Grid>
        </Grid>
      </div>
    </Template>
  );
};
export default withLogin(CheckoutPage);
