/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import PromoCodesContainer from 'components/organisms/PromoCodesContainer';
import { PromoService, doWithServerSide } from 'services';
import { withLogin } from 'HOC';
import { NEXT_I18NEXT_NAME_SPACES } from 'sysconfig';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [voucherCodes, i18next] = await Promise.all([
      PromoService.getVoucherCodesActive({ ctx }),
      serverSideTranslations(ctx.locale, NEXT_I18NEXT_NAME_SPACES),
    ]);
    return {
      props: {
        voucherCodes,
        ...i18next,
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
