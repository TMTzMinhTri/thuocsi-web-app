/* eslint-disable camelcase */
import React from 'react';
import { Template, PromoCodesContainer } from 'components';
import { PromoClient, doWithServerSide } from 'clients';
import { withLogin } from 'context';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [promos] = await Promise.all([PromoClient.getPromos()]);
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
