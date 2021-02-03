/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import IngredientDetailContainer from 'components/organisms/IngredientDetailContainer';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { NotifyUtils } from 'utils';
import { IngredientCLient, doWithServerSide, isValid } from 'clients';
import { INGREDIENT } from 'constants/Paths';
import { Container } from '@material-ui/core';
import Router from 'next/router';

export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;
  return doWithServerSide(ctx, async () => {
    const [ingredientRes, productRes] = await Promise.all([
      IngredientCLient.getIngredientBySlug(ctx, slug),
      IngredientCLient.getProductsBySlug(ctx, slug),
    ]);

    return {
      props: {
        ingredientRes,
        products: isValid(productRes) ? productRes.data : [],
      },
    };
  });
}

const Ingredient = ({ ingredientRes = {}, products = [] }) => {
  if (!isValid(ingredientRes)) {
    NotifyUtils.error('Không tìm thấy hoạt chất. Gọi 02 873 008 840 để hỏi thêm về hoạt chất này.');
    Router.push(INGREDIENT);
    return <LoadingScreen />;
  }
  const ingredient = ingredientRes.data[0];
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
