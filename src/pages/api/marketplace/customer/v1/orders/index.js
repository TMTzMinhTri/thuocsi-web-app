import { ENUM_ORDER_STATUS } from 'constants/Enums';

const orders = [
  {
    orderID: 197180,
    amount: 5,
    createdAt: new Date(),
    deliveryAt: new Date(),
    status: ENUM_ORDER_STATUS.COMPLETED,
    total: 3024100,
  },
  {
    orderID: 197181,
    amount: 1,
    createdAt: new Date(),
    deliveryAt: new Date(),
    status: ENUM_ORDER_STATUS.PENDING,
    total: 3024110,
  },
  {
    orderID: 197182,
    amount: 1,
    createdAt: new Date(),
    deliveryAt: new Date(),
    status: ENUM_ORDER_STATUS.CANCEL,
    total: 3024110,
  },
  {
    orderID: 197183,
    amount: 7,
    createdAt: new Date(),
    deliveryAt: new Date(),
    status: ENUM_ORDER_STATUS.PENDING,
    total: 3024110,
  },
];

export default (req, res) => {
  res.statusCode = 200;
  const { status } = req.query;
  let data = [];
  if (status === ENUM_ORDER_STATUS.ALL) data = orders;
  else {
    data = orders.filter((order) => {
      if (order.status === status) return true;
      return false;
    });
  }

  res.json({
    status: 'OK',
    data,
    message: 'Get customer successfully.',
  });
};
