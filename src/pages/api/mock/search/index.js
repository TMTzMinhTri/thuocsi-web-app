export default (req, res) => {
  res.statusCode = 200;
  res.json({
    staus: 'ok',
    data: [
      {
        products: [
          {
            name: 'a',
            slug: 'slug',
            sku: 'sku',
            code: 'product code',
          },
          {
            name: 'b',
            slug: 'slug',
            sku: 'sku',
            code: 'product code',
          },
          {
            name: 'c',
            slug: 'slug',
            sku: 'sku',
            code: 'product code',
          },
        ],
        manufacturers: [
          {
            name: 'manufacturer a',
            slug: 'slug',
            code: 'code manufacturer',
          },
          {
            name: 'manufacturer b',
            slug: 'slug',
            code: 'code manufacturer',
          },
          {
            name: 'manufacturer c',
            slug: 'slug',
            code: 'code manufacturer',
          },
        ],
      },
    ],
  });
};
