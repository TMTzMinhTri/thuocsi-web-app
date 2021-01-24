/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import IngredientContainer from 'components/organisms/IngredientContainer';
import { ProductClient } from 'clients';
import { Container } from '@material-ui/core';
import { changeAlias } from 'utils/StringUtils';

const convertIngredients = (ingredients = []) =>
  ingredients.map(({ name, slug }) => {
    const unsignedKey = changeAlias(name);
    return {
      unsignedKey,
      name,
      slug,
    };
  });

export async function getStaticProps(ctx) {
  const [ingredients] = await Promise.all([ProductClient.loadDataIngredient(ctx)]);
  return {
    props: {
      ingredients: convertIngredients(ingredients),
    },
  };
}

// export async function getServerSideProps(ctx) {
//   return doWithServerSide(ctx, async () => {
//     const [ingredients] = await Promise.all([ProductClient.loadDataIngredient(ctx)]);
//     return {
//       props: {
//         ingredients: convertIngredients(ingredients),
//       },
//     };
//   });
// }

const Ingredients = ({ ingredients = [], isMobile }) => {
  const title = 'Tất cả hoạt chất – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
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
