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

const GetQuantity2 = (objBlocks, cart) => {
  const blocks = objBlocks?.data;
  const newBlocks = [];

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];
    const products = block.data;

    const newProducts = products.map((item) => ({
      ...item,
      quantity: cart[item.sku]?.quantity || 0,
    }));

    block.data = newProducts;
    newBlocks.push({ ...block });
  }

  return newBlocks;
};

export default {
  GetQuantity,
  GetQuantity2,
};
