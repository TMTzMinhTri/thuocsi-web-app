export default (req, res) => {
  res.statusCode = 200;

  res.json({
    status: 'OK',
    data: [
      {
        createdBy: 120,
        createdTime: '2021-01-14T09:30:51.359Z',
        endTime: '2021-01-21T16:28:00Z',
        promotionId: 2,
        promotionName: 'KM tesst',
        promotionType: 'COMBO',
        rule: {
          minOrderValue: {
            conditions: [{ discountValue: 1000, minOrderValue: 1000000 }],
            field: 'min_orderValue',
            type: 'discount_order_value',
          },
          minQuantity: {},
        },
        scope: 'GLOBAL',
        startTime: '2021-01-15T16:28:00Z',
        status: 'WAITING',
        totalCode: 10,
      },
    ],
    message: 'Query promotion successfully.',
  });
};
