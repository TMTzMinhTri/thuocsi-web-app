import { orders } from '../index';

export default (req, res) => {
  const { id } = req.query;
  const order = orders.find((o) => String(o.orderID) === id);
  if (!order) {
    res.statusCode = 404;
    res.json({
      status: 'NOTFOUND',
      message: 'Order not found.',
    });
    return;
  }
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: order.products,
    message: 'Get customer successfully.',
  });
};
