import React from 'react';
import {
  Template,
  NavBar,
  Header,
  PromotionProduct,
  HeaderMobile } from 'components';

import ProductClient from 'clients/ProductClient';

import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  const [products] = await Promise.all([ProductClient.loadDataPormotion(ctx)]);

  return {
    props: {
      products,
    },
  };
}

const DealsPage = ({ products = [], isMobile }) => {
  const title = 'Khuyến mãi – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';

  return (
    <Template title={title} isMobile={isMobile}>
      {isMobile ? <HeaderMobile title="Khuyến mãi" /> : <Header />}
      {!isMobile && <NavBar />}
      <div className={styles.promo_wrapper}>
        <div className={styles.container}>
          <div className={styles.text_white}>
            <h1 className={styles.title}>Khuyến mãi</h1>
            <p>
              Cập nhật hàng ngày tất cả những deal giá ưu đãi trên thuocsi. Hãy bookmark trang này
              (nhấn Ctrl+D) và quay lại thường xuyên để không bỏ lỡ bạn nhé!
            </p>
          </div>
          <PromotionProduct products={products} catName="products" />
        </div>
      </div>
    </Template>
  );
};
export default DealsPage;
