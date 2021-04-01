/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import PromoCodesContainer from 'components/organisms/PromoCodesContainer';
import { PromoService, doWithServerSide } from 'services';
import { withLogin } from 'HOC';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [voucherCodes] = await Promise.all([PromoService.getVoucherCodesActive({ ctx })]);
    return {
      props: {
        voucherCodes,
      },
    };
  });
}

const PromoCodes = ({ voucherCodes = [], isMobile }) => {
  const title = 'Mã giảm giá – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const pageTitle = 'Mã giảm giá';
  const name = 'promo-codes';
  return (
    <Template title={title} isMobile={isMobile} pageTitle={pageTitle} pageName={name}>
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh' }}>
        <PromoCodesContainer voucherCodes={voucherCodes} pageName={name} />
      </div>
    </Template>
  );
};

export default withLogin(PromoCodes);
