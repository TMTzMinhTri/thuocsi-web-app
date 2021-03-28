import { getData, getFirst, isValid, isValidWithoutData, OrderClient } from 'clients';
import { ENUM_ORDER_STATUS, ENUM_ORDER_TYPE } from 'constants/Enums';
import { getDetailDeliveryMethod, getDetailPaymentMethod } from './PricingService';

export const deleteOrder = async ({ orderNo }) => {
  const res = await OrderClient.deleteOrder({ orderNo });
  return res;
};

const MINUTES_30 = 1800000;

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

  const orderItemInfoRes = await OrderClient.getInfoOrderItem({
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
  if (!isValid(orderRes)) return [];
  const orders = await Promise.all(
    orderRes.data.map(async (order) => {
      const productRes = await OrderClient.getProductByOrderNo({ orderNo: order.orderNo, ctx });
      if (!isValid(productRes)) return { ...order };
      let canEdit =
        order.status === ENUM_ORDER_STATUS.WAIT_TO_CONFIRM &&
        +new Date() - +new Date(order.createdTime) <= MINUTES_30;
      const products = productRes.data;
      canEdit =
        canEdit &&
        products.filter((item) => item && item.orderType !== ENUM_ORDER_TYPE.NORMAL).length === 0;
      return { ...order, canEdit };
    }),
  );
  orderRes.data = orders;
  return orderRes;
};

export default { deleteOrder, getOrderDetail, getOrders };
