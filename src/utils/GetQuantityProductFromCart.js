const GetQuantityProductFromCart = (products, cart) => {
  const newList = [];
  const pObject = products;
  products.data.forEach((product) => {
    const id = product.sku;
    if (cart[id] && id === cart[id].sku) {
      newList.push({ ...product, quantity: cart[id].quantity || 0 });
    } else {
      newList.push(product);
    }
  });
  pObject.data = newList;

  return pObject;
};
export default GetQuantityProductFromCart;
