const GetQuantity = (products, cart) => {
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

const GetQuantity2 = (products, cart) => {
  const blockRaw = products?.data;
  const newList = [];

  for (let i = 0; i < blockRaw.length; i += 1) {
    const block = blockRaw[i];
    newList.push(
      block?.data.map((item) => ({
        ...item,
        quantity: cart[item.sku]?.quantity || 0,
        vewMore: block?.vewMore || true,
        slug: block?.slug || '',
        nameTitle: block?.name || '',
      })),
    );
  }

  return newList;
};

export default {
  GetQuantity,
  GetQuantity2,
};
