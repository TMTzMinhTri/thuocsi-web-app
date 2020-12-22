const GetQuantityProduct = async (products, cart) => {
  // eslint-disable-next-line array-callback-return
  cart.product.filter((cartItem) => products.data.some((product) => {
    if (product.sku === cartItem.sku) {
      // eslint-disable-next-line no-param-reassign
      product.quantity = cartItem.quantity;
    }
  }));
};
export default GetQuantityProduct;
