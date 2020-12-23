const GetQuantityProduct = (products, cart) => {
  const productList = [];
  products.data.forEach((product, index) => {
    const id = product.sku;
    if (id === cart[id].sku) {
      productList.push({ ...product, quantity: cart[product.sku].quantity });
    } else {
      productList.push(product);
    }
  });

  return productList;
};
export default GetQuantityProduct;
