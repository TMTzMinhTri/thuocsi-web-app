// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: [
      {
        id: '1',
        alt: 'Ngày Đái Tháo Đường 14.11',
        image: '/images/slider/slider.jpg',
        link: 'https://thuocsi.vn/products?sort=best_match&q=iris+pharma',
      },
      {
        id: '2',
        alt: 'Ngày Đái Tháo Đường 14.11',
        image: '/images/slider/slider.jpg',
        link: 'https://thuocsi.vn/products?sort=best_match&q=iris+pharma',
      },
    ],
  });
};
