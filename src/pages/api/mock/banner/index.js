// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'ok',
    data: [
      {
        id: '1',
        alt: 'Ngày Đái Tháo Đường 14.11',
        image: '/images/slider/slider01.png)',
        link: '',
      },
      {
        id: '2',
        alt: 'Xuất hóa đơn đỏ',
        image: '/images/slider/slider02.png',
        link:
          'https://thuocsi.zendesk.com/hc/vi/articles/360033568172-C%C3%A1ch-y%C3%AAu-c%E1%BA%A7u-xu%E1%BA%A5t-h%C3%B3a-%C4%91%C6%A1n-%C4%91%E1%BB%8F-t%E1%BA%A1i-thuocsi-vn-',
      },
      {
        id: '3',
        alt: 'Giao hàng 24',
        image: '/images/slider/slider03.png',
        link: '',
      },
      {
        id: '4',
        alt: 'Rủ bạn đặt hàng',
        image: '/images/slider/slider04.png',
        link: 'https://thuocsi.vn/users/referrals',
      },
      {
        id: '5',
        alt: 'Trả hàng',
        image: '/images/slider/slider05.png',
        link: '',
      },
    ],
  });
};
