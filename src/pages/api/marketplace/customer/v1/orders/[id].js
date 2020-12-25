import { orders } from './index';

export default (req, res) => {
  const { id } = req.query;
  const order = orders.find((o) => String(o.orderID) === id);

  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: order,
    message: 'Get customer successfully.',
  });
};
