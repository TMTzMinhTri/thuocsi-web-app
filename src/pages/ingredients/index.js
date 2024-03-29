/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import IngredientContainer from 'components/organisms/IngredientContainer';
import { IngredientCLient } from 'clients';
import { Container } from '@material-ui/core';
import { changeAlias } from 'utils/StringUtils';
import { useIsMobile } from 'hooks';
import { withLogin } from 'HOC';

import styles from './styles.module.css';

// const ONE_HOUR_SECONDS =

export async function getStaticProps(ctx) {
  const [ingredients] = await Promise.all([IngredientCLient.loadDataIngredient(ctx)]);
  const convertIngredients = (ingre = []) =>
    ingre
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ name, slug }) => ({
        unsignedKey: changeAlias(name),
        name,
        slug,
      }));
  return {
    props: {
      ingredients: convertIngredients(ingredients),
    },
    revalidate: 300,
  };
}

// export async function getServerSideProps(ctx) {
//   const [ingredients] = await Promise.all([IngredientCLient.loadDataIngredient(ctx)]);
//   const convertIngredients = (ingre = []) =>
//     ingre
//       .sort((a, b) => a.name.localeCompare(b.name))
//       .map(({ name, slug }) => ({
//         unsignedKey: changeAlias(name),
//         name,
//         slug,
//       }));
//   return {
//     props: {
//       ingredients: convertIngredients(ingredients),
//     },
//   };
// }

const Ingredients = ({ ingredients = [] }) => {
  const title = 'Tất cả hoạt chất – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const pageName = 'ingredients';
  const { isMobile } = useIsMobile();
  return (
    <Template title={title} isMobile={isMobile()} pageName={pageName}>
      <div className={styles.ingredients}>
        <Container maxWidth="lg">
          <IngredientContainer ingredients={ingredients} />
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Ingredients, false);
