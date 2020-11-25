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
          'https://assets.thuocsi.vn/assets/testimonial/ms_anh-0f18d4903ee5d30ca79d458b799c4c2afa8e1d742e244885a218f831f68789b4.jpg',
        customer: 'Cô Lan Anh',
        title: 'Chủ nhà thuốc Hòa Bình - Buôn Mê Thuột',
        comment: 'Địa chỉ đáng tin cậy. Đầy đủ hàng, giao hàng nhanh và thuận tiện',
      },
      {
        id: '3',
        avatar:
          'https://assets.thuocsi.vn/assets/testimonial/ms_anh-0f18d4903ee5d30ca79d458b799c4c2afa8e1d742e244885a218f831f68789b4.jpg',
        customer: 'Cô Lan Anh',
        title: 'Chủ nhà thuốc Hòa Bình - Buôn Mê Thuột',
        comment: 'Địa chỉ đáng tin cậy. Đầy đủ hàng, giao hàng nhanh và thuận tiện',
      },
      {
        id: '4',
        avatar:
          'https://assets.thuocsi.vn/assets/testimonial/ms_anh-0f18d4903ee5d30ca79d458b799c4c2afa8e1d742e244885a218f831f68789b4.jpg',
        customer: 'Cô Lan Anh',
        title: 'Chủ nhà thuốc Hòa Bình - Buôn Mê Thuột',
        comment:
          'Chị biết và đặt thuocsi được hơn 1 năm, chị có thể dễ dàng xem giá các thuốc và cân chỉnh đơn hàng ngoài ra mỗi ngày đều có sản phẩm mới giúp nhà thuốc đa dạng hơn danh mục hàng.',
      },
    ],
  });
};
