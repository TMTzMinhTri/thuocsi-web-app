/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import IngredientContainer from 'components/organisms/IngredientContainer';
import { ProductClient } from 'clients';
import { Container } from '@material-ui/core';
import { changeAlias } from 'utils/StringUtils';
import { DAY_SECONDS } from 'utils/DateTimeUtils';

const convertIngredients = (ingredients = []) =>
  ingredients
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ name, slug }) => {
      const unsignedKey = changeAlias(name);
      let search = name;
      if (unsignedKey !== name) {
        search += ` ${unsignedKey}`;
      }
      return {
        search,
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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: DAY_SECONDS, // In seconds
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

const Ingredients = ({ ingredients = [], isMobile = false }) => {
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
