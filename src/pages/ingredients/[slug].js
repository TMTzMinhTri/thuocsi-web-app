/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import IngredientDetailContainer from 'components/organisms/IngredientDetailContainer';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { NotifyUtils } from 'utils';
import { IngredientCLient, isValid } from 'clients';
import { doWithServerSide } from 'services';
import { INGREDIENT } from 'constants/Paths';
import { Container } from '@material-ui/core';
import Router from 'next/router';
import { withLogin } from 'HOC';
import styles from './styles.module.css';

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

const Ingredient = ({ ingredientRes = {}, products = [], isMobile }) => {
  if (!isValid(ingredientRes)) {
    NotifyUtils.error(
      'Không tìm thấy hoạt chất. Hãy liên hệ chúng tôi để hỏi thêm về hoạt chất này.',
    );
    Router.push(INGREDIENT);
    return <LoadingScreen />;
  }
  const ingredient = ingredientRes.data[0];
  const title = `${ingredient?.name} – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn`;
  return (
    <Template title={title} isMobile={isMobile} pageTitle={ingredient.name}>
      <div
        className={styles.wapper}
        style={{ backgroundColor: '#f4f7fc', minHeight: '80vh', padding: '45px' }}
      >
        <Container className={styles.lg} maxWidth="lg">
          <IngredientDetailContainer ingredient={ingredient} products={products} />
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Ingredient, false, { url: '/ingredients' });
