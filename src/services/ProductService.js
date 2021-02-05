import { CartClient, GET, isValid } from 'clients';
import { PRODUCT_API } from 'constants/APIUri';
import { PAGE_SIZE } from 'constants/data';
import { convertArrayToMap } from 'utils/ArrUtils';
import { isEmpty } from 'utils/ValidateUtils';

export const mapDataProduct = async ({ ctx, result }) => {
  const cartRes = await CartClient.loadDataCart(ctx);
  if (!isValid(cartRes)) {
    return result;
  }

  const cart = cartRes.data[0];
  if (cart && !isEmpty(cart.cartItems)) {
    const cartObject = convertArrayToMap(cart.cartItems, 'sku');
    // eslint-disable-next-line no-param-reassign
    result.data = result.data.map((item) => ({
      ...item,
      quantity: cartObject.get(item.sku)?.quantity || 0,
    }));
  }
  return result;
};

export const loadDataProduct = async ({ ctx, isTotal }) => {
  const params = {
    ...ctx.query,
    limit: PAGE_SIZE,
    getTotal: typeof isTotal !== 'undefined' ? isTotal : true,
  };

  const result = await GET({ url: PRODUCT_API.PRODUCT_LIST, ctx, params, isBasic: true });
  if (!isValid(result)) return result;

  return mapDataProduct({ ctx, result });
};

export const loadDataProductDetail = async ({ ctx }) => {
  const { query } = ctx;
  const url = `/marketplace/product/v1/products?q=${query.slug}`;
  const result = await GET({
    url,
    ctx,
    isBasic: true,
  });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
};

async function loadProductWithCategory({ ctx, isTotal }) {
  const { query } = ctx;
  const url = PRODUCT_API.PRODUCT_LIST;

  const { currentTab = '', sortBy = '', page = 0, q = '', slug: category } = query;
  const params = {
    current_tab: currentTab,
    sortBy,
    page,
    q,
    category,
    limit: PAGE_SIZE,
    getTotal: typeof isTotal !== 'undefined' ? isTotal : true,
  };
  const result = await GET({ url, ctx, params, isBasic: true });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
}

async function loadProductWithManufacturer({ ctx, isTotal }) {
  const { query } = ctx;
  const url = PRODUCT_API.PRODUCT_LIST;

  const { currentTab = '', sortBy = '', page = 0, q = '', slug: manufacturers } = query;
  const params = {
    manufacturers,
    current_tab: currentTab,
    sortBy,
    page,
    q,
    limit: PAGE_SIZE,
    getTotal: typeof isTotal !== 'undefined' ? isTotal : true,
  };
  const result = await GET({ url, ctx, params, isBasic: true });
  if (!isValid(result)) return result;
  return mapDataProduct({ ctx, result });
}

export default {
  loadDataProduct,
  mapDataProduct,
  loadDataProductDetail,
  loadProductWithCategory,
  loadProductWithManufacturer,
};
