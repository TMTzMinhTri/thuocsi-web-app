export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: [
      {
        code: 'NEWBIE300K1',
        createdAt: new Date(),
        expiredAt: new Date(),
        maxUse: 10,
        used: 1,
        minCost: 0,
        isExpired: true,
        relatedOrder: 197180,
      },
      {
        code: 'NEWPHARMACY1',
        createdAt: new Date(),
        expiredAt: new Date(),
        maxUse: -1,
        used: 1,
        minCost: 700000,
        isExpired: true,
        relatedOrder: 197180,
      },
      {
        code: 'DUYDAT123',
        createdAt: new Date(),
        expiredAt: new Date(),
        maxUse: -1,
        used: 1,
        minCost: 1000000,
        isExpired: true,
        relatedOrder: 197180,
      },
    ],
    message: 'Get customer successfully.',
  });
};
