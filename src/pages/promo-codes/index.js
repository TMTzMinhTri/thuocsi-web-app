/* eslint-disable camelcase */
import React from 'react';
import { Template, NavBar, Header, PromoCodesContainer } from 'components';
import { CustomerClient, PromoClient, doWithServerSide } from 'clients';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [wallet, promos] = await Promise.all([
      CustomerClient.getWallet(),
      PromoClient.getPromos(),
    ]);
    return {
      props: {
        wallet: wallet.data[0],
        promos,
      },
    };
  });
}

const PromoCodes = ({ mostResearched = [], wallet, promos = [] }) => {
  const title = 'Mã giảm giá – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <Header />
      <NavBar
        mostResearched={mostResearched}
        point={wallet.loyaltyPoint}
        balance={wallet.balance}
      />
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh' }}>
        <PromoCodesContainer promos={promos} />
      </div>
    </Template>
  );
};

export default PromoCodes;
