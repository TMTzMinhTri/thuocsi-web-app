/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import IngredientContainer from 'components/organisms/IngredientContainer';
import { ProductClient } from 'clients';
import { Container } from '@material-ui/core';
import { changeAlias } from 'utils/StringUtils';
import { DAY_SECONDS } from 'utils/DateTimeUtils';
import { useIsMobile } from 'hooks';

export async function getStaticProps(ctx) {
  const [ingredients] = await Promise.all([ProductClient.loadDataIngredient(ctx)]);
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
    revalidate: DAY_SECONDS,
  };
}

const Ingredients = ({ ingredients = [] }) => {
  const title = 'Tất cả hoạt chất – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const pageName = 'ingredients';
  const { isMobile } = useIsMobile();
  return (
    <Template title={title} isMobile={isMobile()} pageName={pageName}>
      <div style={{ backgroundColor: '#f4f7fc', minHeight: '80vh', padding: '45px' }}>
        <Container maxWidth="lg">
          <IngredientContainer ingredients={ingredients} />
        </Container>
      </div>
    </Template>
  );
};

export default Ingredients;
