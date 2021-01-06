/* eslint-disable camelcase */
import React from 'react';
import { Template, NavBar, Header, IngredientDetailContainer } from 'components';
import { ProductClient, CustomerClient, doWithServerSide } from 'clients';
import { Container } from '@material-ui/core';

export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [wallet, ingredient, products] = await Promise.all([
      CustomerClient.getWallet(),
      ProductClient.getIngredientBySlug(ctx, slug),
      ProductClient.getProductsBySlug(ctx, slug),
    ]);
    return {
      props: {
        wallet: wallet.data[0],
        ingredient: ingredient[0],
        products,
      },
    };
  });
}

const Ingredient = ({ mostResearched = [], wallet, ingredient = {}, products = [] }) => {
  const title = 'Cập nhật hồ sơ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <Header />
      <NavBar
        mostResearched={mostResearched}
        point={wallet.loyaltyPoint}
        balance={wallet.balance}
      />
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh', padding: '45px' }}>
        <Container maxWidth="lg">
          <IngredientDetailContainer ingredient={ingredient} products={products} />
        </Container>
      </div>
    </Template>
  );
};

export default Ingredient;
