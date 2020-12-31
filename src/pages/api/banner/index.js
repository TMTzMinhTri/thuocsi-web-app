// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'ok',
    data: [
      {
        id: '1',
        alt: 'Ngày Đái Tháo Đường 14.11',
        image: '/images/slider/slider.jpg',
        link: '',
      },
      {
        id: '2',
        alt: 'Ngày Đái Tháo Đường 14.11',
        image: '/images/slider/slider.jpg',
        link: '',
      },
    ],
  });
};
