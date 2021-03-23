import React from 'react';
import Template from 'components/layout/Template';
import PromotionProduct from 'components/organisms/PromotionProduct';
import { getData } from 'clients';
import { ProductService } from 'services';

import { NEXT_I18NEXT_NAME_SPACES } from 'sysconfig';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  const [dealRes, i18next] = await Promise.all([
    ProductService.getDeals({ ctx, params: { offset: 0, limit: 1000, isGetTotal: true } }),
    serverSideTranslations(ctx.locale, NEXT_I18NEXT_NAME_SPACES),
  ]);
  return {
    props: {
      products: getData(dealRes, []),
      ...i18next,
    },
  };
}

const DealsPage = ({ products = [], isMobile }) => {
  const title = 'Khuyến mãi – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const name = 'deals';
  return (
    <Template title={title} isMobile={isMobile} pageName={name}>
      <div className={styles.promo_wrapper}>
        <div className={styles.container}>
          <div className={styles.text_white}>
            <h1 className={styles.title}>Khuyến mãi</h1>
            <p>
              Cập nhật hàng ngày tất cả những deal giá ưu đãi trên thuocsi. Hãy bookmark trang này
              (nhấn Ctrl+D hoặc Command+D) và quay lại thường xuyên để không bỏ lỡ bạn nhé!
            </p>
          </div>
          <PromotionProduct products={products} catName="products" />
        </div>
      </div>
    </Template>
  );
};
export default DealsPage;
