import { isEmpty } from 'utils/ValidateUtils';
import { HTTP_STATUS } from 'constants/Enums';
import { getFirst } from 'clients';
import { getProductInfoMapFromSkus } from './ProductService';

export const getInfoCartItem = async (data) => {
  if (isEmpty(data)) {
    return [];
  }
  const skus = data.reduce((accumulator, item) => {
    if (item?.sku) return [...accumulator, item.sku];
    return accumulator;
  }, []);
  if (skus.length === 0) {
    return {
      status: HTTP_STATUS.Forbidden,
      message: 'Dữ liệu không đủ',
    };
  }
  const mapInfoRes = await getProductInfoMapFromSkus({ skus });
  const mapInfo = getFirst(mapInfoRes);

  return data.map((item) => {
    // TODO: ẩn nhà cung cấp
    // const { imageUrls, unit, volume, name, maxQuantity, slug, seller } =
    const { imageUrls, unit, volume, name, maxQuantity, slug } = mapInfo[item.sku] || {};
    return {
      ...item,
      imageUrls,
      unit,
      volume,
      name,
      maxQuantity,
      slug,
    };
  });
};

export default {
  getInfoCartItem,
};
