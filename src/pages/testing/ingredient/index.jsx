import IngredientContainer from 'components/organisms/IngredientContainer';
import { Container } from '@material-ui/core';
import { ProductClient, doWithServerSide } from 'clients';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const ingredients = await ProductClient.loadDataIngredient(ctx);
    return {
      props: {
        ingredients,
      },
    };
  });
}
const TestingIngredient = ({ ingredients }) => (
  <div style={{ backgroundColor: '#f4f7fc' }}>
    <Container>
      <IngredientContainer ingredients={ingredients} />
    </Container>
  </div>
);

export default TestingIngredient;
