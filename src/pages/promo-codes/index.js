/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import PromoCodesContainer from 'components/organisms/PromoCodesContainer';
import { doWithServerSide } from 'clients';
import { PromoService } from 'services';
import { withLogin } from 'HOC';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const promos = await PromoService.getPromoActive({ ctx });
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
