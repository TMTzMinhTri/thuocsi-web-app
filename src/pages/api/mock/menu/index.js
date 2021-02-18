// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: [
      {
        id: '1',
        name: 'Sản Phẩm',
        icon: 'icon-product',
        url: '/products',
        isNew: false,
      },
      {
        id: '2',
        name: 'Hoạt Chất',
        icon: 'icon-ingredients',
        url: '/ingredients',
        isNew: false,
      },
      {
        id: '3',
        name: 'Đặt Hàng Nhanh',
        icon: 'icon-quick-order',
        url: '/quick-order',
        isNew: false,
      },
      {
        id: '4',
        name: 'Khuyến Mãi',
        icon: 'icon-quick-order',
        url: '/deals',
        isNew: false,
      },
      {
        id: '5',
        name: 'Mã Giảm Giá',
        icon: 'icon-quick-order',
        url: '/promo-codes',
        isNew: true
      },
      {
        id: '6',
        name: 'Hàng Mới',
        icon: 'star',
        redirectUrl: 'https://try.thuocsi.vn/daitiechangmoi',
        isNew: true
      }
    ],
  });
};