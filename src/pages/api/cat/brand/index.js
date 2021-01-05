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
        label: 'Bayer Pharma',
        value: '/manufacturers/cong-ty-tnhh-bayer-pharma-ag',
      },
      {
        label: 'Sanofi',
        value: '/manufacturers/cong-ty-sanofi-synthelabo-viet-nam',
      },
      {
        label: 'Pharmedic',
        value: '/manufacturers/cong-ty-co-phan-duoc-pham-duoc-lieu-pharmedic',
      },
    ],
  });
};
