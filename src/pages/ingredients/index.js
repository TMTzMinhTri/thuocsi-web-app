/* eslint-disable camelcase */
import React from 'react';
import { Template, IngredientContainer } from 'components';
import { ProductClient, CustomerClient, doWithServerSide } from 'clients';
import { Container } from '@material-ui/core';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [wallet, ingredients] = await Promise.all([
      CustomerClient.getWallet(),
      ProductClient.loadDataIngredient(ctx),
    ]);
    return {
      props: {
        wallet: wallet.data[0],
        ingredients,
      },
    };
  });
}

const Ingredients = ({ ingredients = [], isMobile }) => {
  const title = 'Cập nhật hồ sơ – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const pageName = 'ingredients';
  return (
    <Template title={title} isMobile={isMobile} pageName={pageName}>
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh', padding: '45px' }}>
        <Container maxWidth="lg">
          <IngredientContainer ingredients={ingredients} />
        </Container>
      </div>
    </Template>
  );
};

export default Ingredients;
