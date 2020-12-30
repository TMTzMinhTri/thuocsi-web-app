// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: [
      {
        label: 'Tất cả sản phẩm',
        value: 'products',
      },
      {
        label: 'Cơ xương khớp',
        value: '/categories/co-xuong-khop',
      },
      {
        label: 'Da liễu',
        value: '/categories/da-lieu',
      },
      {
        label: 'Dược mỹ phẩm',
        value: '/categories/duoc-my-pham',
      },
    ],
  });
};
