import { getData, getFirst, isValid, isValidWithoutData, OrderClient } from 'clients';
import { getDetailDeliveryMethod, getDetailPaymentMethod } from './PricingService';

export const deleteOrder = async ({ orderNo }) => {
  const res = await OrderClient.deleteOrder({ orderNo });
  return res;
};

// get order detail ( page order detail )
export const getOrderDetail = async ({ ctx, orderId }) => {
  const orderRes = await OrderClient.getOrderById({ id: Number(orderId), ctx });
  if (isValid(orderRes)) {
    return orderRes;
  }
  const order = getFirst(orderRes, {});
  const { orderNo = '', deliveryPlatform, paymentMethod } = order;

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

  const orderItemInfoRes = await OrderClient.getInfoOrderItem({
    orderItems: products,
    ctx,
  });

  order.products = products;
  orderRes.data = [order];

  if (isValid(orderItemInfoRes)) {
    const orderItemInfoMap = orderItemInfoRes.data[0];
    order.products = order.products.map((product) => ({
      productInfo: orderItemInfoMap[product?.productSku] || {},
      ...product,
    }));
  }

  return orderRes;
};

export default { deleteOrder };
