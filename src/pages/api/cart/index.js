// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: {
      userID: 'anpham',
      product: [
        // {
        //   brand: 'Hàng nội địa',
        //   imageUrl: 'https://assets.thuocsi.vn/assets/defaults/missing-e9cfa4812c342b9780b61700d2ade43591b3c5992f4dffedaa542c07d854b602.png',
        //   type: 'hộp',
        //   name: 'Khẩu trang y tế',
        //   price: 35000,
        //   sku: 'SP01',
        //   quantity: 1,
        // },
      ],
    },
  });
};
