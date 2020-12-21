// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    staus: 'ok',
    data: [
      {
        id: '1',
        avatar:
          'https://assets.thuocsi.vn/assets/testimonial/ms_anh-0f18d4903ee5d30ca79d458b799c4c2afa8e1d742e244885a218f831f68789b4.jpg',
        customer: 'Cô Lan Anh',
        title: 'Chủ nhà thuốc Hòa Bình - Buôn Mê Thuột',
        comment: 'Địa chỉ đáng tin cậy. Đầy đủ hàng, giao hàng nhanh và thuận tiện',
      },
      {
        id: '2',
        avatar:
          'https://assets.thuocsi.vn/assets/testimonial/ms_hang-2ddc116695f4f788b5968112a3185c73536f16a23a740f440c042c9d2057c611.jpg',
        customer: 'Cô Hằng',
        title: 'Nhà thuốc Vy Vy - Thủ Đức',
        comment: 'Giao hàng nhanh chóng, nhân viên tư vấn nhiệt tình.',
      },
      {
        id: '3',
        avatar:
          'https://assets.thuocsi.vn/assets/testimonial/mr_truong-c6c1718f8fd631366d2ab383f238b9642a3b10ee5d95755a973f82b5c17ad4af.jpg',
        customer: 'Anh Trường',
        title: 'Nhà thuốc tây số 2 - Vĩnh Long',
        comment: 'Hàng hóa đa dạng dễ dàng tra cứu giá và đặt hàng thuốc.',
      },
      {
        id: '4',
        avatar:
          'https://assets.thuocsi.vn/assets/testimonial/ms_hanh-faacbd8f6c93413a7cba4dc60359dca0699b13e999f6681fbe2f0495cc530162.jpg',
        customer: 'Chị Hạnh',
        title: 'Nhà thuốc Hạnh - Bình Thạnh',
        comment:
          'Chị biết và đặt thuocsi được hơn 1 năm, chị có thể dễ dàng xem giá các thuốc và cân chỉnh đơn hàng ngoài ra mỗi ngày đều có sản phẩm mới giúp nhà thuốc đa dạng hơn danh mục hàng.',
      },
    ],
  });
};
