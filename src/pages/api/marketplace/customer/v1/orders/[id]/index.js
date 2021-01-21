import { HTTP_STATUS } from 'constants/Enums';
import { orders } from '../index';

export default (req, res) => {
  const { id } = req.query;
  const order = orders.find((o) => String(o.orderID) === id);
  if (!order) {
    res.statusCode = 404;
    res.json({
      status: HTTP_STATUS.NotFound,
      message: 'Order not found.',
    });
    return;
  }
  res.statusCode = 200;
  res.json({
    status: HTTP_STATUS.Ok,
    data: order,
    message: 'Get customer successfully.',
  });
};
