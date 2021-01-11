// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    staus: 'ok',
    data: {
      userID: 'anpham',
      voucher: '',
      sku: 'SP01',
      product: [],
    },
  });
};
