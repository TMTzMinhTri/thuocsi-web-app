import { getData, getFirst, isValid, isValidWithoutData, OrderClient } from 'clients';
import { ENUM_ORDER_STATUS, ENUM_ORDER_TYPE, HTTP_STATUS } from 'constants/Enums';
import { getDetailDeliveryMethod, getDetailPaymentMethod } from './PricingService';
import { getProductInfoMapFromSkus } from './ProductService';

export const deleteOrder = async ({ orderNo }) => {
  const res = await OrderClient.deleteOrder({ orderNo });
  return res;
};

const MINUTES_30 = 1800000;

async function getInfoOrderItem({ orderItems = [], ctx }) {
  const skus = orderItems.reduce((accumulator, item) => {
    if (item?.productSku) return [...accumulator, item.productSku];
    return accumulator;
  }, []);

  if (skus.length === 0) {
    return {
      status: HTTP_STATUS.Forbidden,
      message: 'Dữ liệu không đủ',
    };
  }
  const mapInfoRes = await getProductInfoMapFromSkus({ skus, ctx });
  const mapInfo = getFirst(mapInfoRes);

  return {
    status: HTTP_STATUS.Ok,
    message: 'Lấy thông tin sản phẩm thành công',
    data: [mapInfo],
  };
}

// get order detail ( page order detail )
export const getOrderDetail = async ({ ctx, orderId }) => {
  const orderRes = await OrderClient.getOrderById({ id: Number(orderId), ctx });
  if (!isValid(orderRes)) {
    return orderRes;
  }
  const order = getFirst(orderRes, {});
  const { orderNo = '', deliveryPlatform, paymentMethod, status, createdTime } = order;

  // logic check update
  // order can edit if status === wait to confirm && 30 minutes
  order.canEdit =
    status === ENUM_ORDER_STATUS.WAIT_TO_CONFIRM &&
    +new Date() - +new Date(createdTime) <= MINUTES_30;

  const [productsRes, paymentRes, deliveryRes] = await Promise.all([
    OrderClient.getProductByOrderNo({ orderNo, ctx }),
    getDetailPaymentMethod({ ctx, paymentMethodCode: paymentMethod }),
    getDetailDeliveryMethod({ ctx, deliveryPlatformCode: deliveryPlatform }),
  ]);

  // get info payment info , deliver info
  const paymentInfo = getFirst(paymentRes);
  const deliveryInfo = getFirst(deliveryRes);
  order.paymentMethodName = paymentInfo?.name;
  order.deliveryMethodName = deliveryInfo?.name;

  orderRes.data = [order];

  if (!isValidWithoutData(productsRes)) {
    return orderRes;
  }

  const products = getData(productsRes, []);

  // check can edit :  order have item combo or deal can't edit
  order.canEdit =
    order.canEdit &&
    products.filter((item) => item && item.orderType !== ENUM_ORDER_TYPE.NORMAL).length === 0;

  const orderItemInfoRes = await getInfoOrderItem({
    orderItems: products,
    ctx,
  });
  order.products = products;

  if (isValid(orderItemInfoRes)) {
    const orderItemInfoMap = orderItemInfoRes.data[0];
    order.products = order.products.map((product) => ({
      productInfo: orderItemInfoMap[product?.productSku] || {},
      ...product,
    }));
  }

  orderRes.data = [order];
  return orderRes;
};

export const getOrders = async ({ ctx, status }) => {
  const orderRes = await OrderClient.getOrders({ status, ctx });
  if (!isValid(orderRes)) return orderRes;
  const orderListData = getData(orderRes);
  const orders = await Promise.all(
    orderListData.map(async (order) => {
      const { createdTime, status: orderStatus, orderNo } = order;
      let canEdit =
        orderStatus === ENUM_ORDER_STATUS.WAIT_TO_CONFIRM &&
        +new Date() - +new Date(createdTime) <= MINUTES_30;
      if (!canEdit) return { ...order, canEdit };

      const productRes = await OrderClient.getProductByOrderNo({ orderNo, ctx });
      if (!isValid(productRes)) return { ...order, canEdit };
      const products = productRes.data;
      canEdit =
        products.filter((item) => item && item.orderType !== ENUM_ORDER_TYPE.NORMAL).length === 0;
      return { ...order, canEdit };
    }),
  );
  orderRes.data = orders;
  return orderRes;
};

export default { deleteOrder, getOrderDetail, getOrders, getInfoOrderItem };
