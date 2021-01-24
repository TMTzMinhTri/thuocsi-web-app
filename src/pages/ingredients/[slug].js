/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import IngredientDetailContainer from 'components/organisms/IngredientDetailContainer';
import { ProductClient, doWithServerSide } from 'clients';
import { Container } from '@material-ui/core';

export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [ingredient, products] = await Promise.all([
      ProductClient.getIngredientBySlug(ctx, slug),
      ProductClient.getProductsBySlug(ctx, slug),
    ]);
    return {
      props: {
        ingredient: ingredient[0],
        products,
      },
    };
  });
}

const Ingredient = ({ ingredient = {}, products = [] }) => {
  const title = `${ingredient?.name} – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn`;
  return (
    <Template title={title}>
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh', padding: '45px' }}>
        <Container maxWidth="lg">
          <IngredientDetailContainer ingredient={ingredient} products={products} />
        </Container>
      </div>
    </Template>
  );
};

export default Ingredient;
