/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import PromoCodesContainer from 'components/organisms/PromoCodesContainer';
import { PromoClient, doWithServerSide } from 'clients';
import { withLogin } from 'HOC';
import { PROMOTION_STATUS } from 'constants/Enums';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [promos] = await Promise.all([
      PromoClient.getPromosByStatus({ ctx, status: PROMOTION_STATUS.ACTIVE }),
    ]);
    return {
      props: {
        promos,
      },
    };
  });
}

const PromoCodes = ({ promos = [] }) => {
  const title = 'Mã giảm giá – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh' }}>
        <PromoCodesContainer promos={promos} />
      </div>
    </Template>
  );
};

export default withLogin(PromoCodes);
