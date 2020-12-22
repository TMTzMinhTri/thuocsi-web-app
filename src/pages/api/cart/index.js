// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    staus: 'ok',
    data: {
      userID: 'anpham',
      voucher: '',
      id: 100,
      product: [{
        brand: 'Hàng nội địa',
        category: [
          {
            code: 'VTYT',
            description: 'Mô tả chung vật tư y tế',
            name: 'Vật tư y tế',
            slug: 'vat-tu-y-te',
          },
        ],
        contraindication: '[Chống chỉ định]',
        description: '\n\t\tKhẩu Trang Mayan 3D Medi PM2.5 sử dụng màng lọc kép Microfilter, N95 theo tiêu chuẩn Hoa Kỳ US NIOSH42CFR- 84 (BFE 99, PFE 95). Vì vậy sản phẩm đầu tiên lọc được bụi PM2.5.\nMAYAN 3D MASK  PM2.5 lọc được >95% bụi lơ lửng siêu mịn PM2.5 và ngăn >99% virus, vi khuẩn.\nThiết kế 3D: Với thiết kế 3D hình khuôn mặt giúp cho người dùng cảm thấy thông thoáng dễ chịu.\nSản phẩm đã được Viện Khoa học Bảo hộ lao động quốc gia kiểm nghiệm và cấp giấy chứng nhận thử nghiệm đạt  tiêu chuẩn : Châu Âu EN 143: 2000 A1:2006.\nKhẩu trang được đóng gói theo tiêu chuẩn xuất khẩu, 05 chiếc / 01 túi  màng OPP cao cấp, thiết kế hiện đại và sang trọng. \nKhẩu trang trở nên thân thiện với mọi người bởi nó có nhiều tính năng vượt trội như có kẹp sống mũi lõi kép, dây đeo chắc chắn, không gây khó chịu cho người sử dụng.\nSản phẩm có thể sử dụng được nhiều lần và nên giặt bằng máy giặt\n\t\t',
        dosage: '[Liều lượng] Sáng 1 cái, trưa 1 cái, tối 1 cái',
        drugInteraction: '[Tương tác thuốc]',
        drugOverdose: '[Dùng quá liều] Dùng khẩu trang quá nhiều sẽ gây ra hết tiền',
        imageUrls: [
          'https://assets.thuocsi.vn/assets/defaults/missing-e9cfa4812c342b9780b61700d2ade43591b3c5992f4dffedaa542c07d854b602.png',
          'https://assets.thuocsi.vn/assets/defaults/missing-e9cfa4812c342b9780b61700d2ade43591b3c5992f4dffedaa542c07d854b602.png',
        ],
        indication: '[Chỉ định sử dụng]',
        ingredient: [
          {
            code: 'THANHPHAN01',
            description: 'đang cập nhật',
            name: 'Thành phần 01',
            slug: 'thanh-phan-01',
            unit: '10 mg',
          },
          {
            code: 'THANHPHAN03',
            description: 'đang cập nhật',
            name: 'Thành phần 03',
            slug: 'thanh-phan-03',
            unit: '10 mg',
          },
          {
            code: 'THANHPHAN04',
            description: 'đang cập nhật',
            name: 'Thành phần 04',
            slug: 'thanh-phan-04',
            unit: '40 mg',
          },
        ],
        madeBy: 'CTY ABC',
        name: 'Khẩu trang y tế',
        origin: 'Viet Nam',
        price: 35000,
        seller: {
          code: 'medx',
          name: 'Medx',
          slug: 'medx-1',
        },
        sku: 'SP01',
        slug: 'khau-trang-y-te',
        storage: '[Bảo quản] nơi thoáng mát',
        tags: [
          {
            '-': '000000000000000000000000',
            name: 'Hoá đơn nhanh',
            slug: 'hoa-don-nhanh',
          },
          {
            '-': '000000000000000000000000',
            name: 'Giao nhanh',
            slug: 'giao-nhanh',
          },
          {
            '-': '000000000000000000000000',
            name: 'Flash sale',
            slug: 'flash-sale',
          },
          {
            '-': '000000000000000000000000',
            name: 'Bán chạy',
            slug: 'ban-chay',
          },
        ],
        unit: 'Hộp',
        volume: '50 cái',
        weight: 300,
        quantity: 37,
      },
      {
        sku: 'SP02',
        name: 'Băng cá nhân vải độ dính cao urgo durable (h/102m)',
        image: '',
        // deal: true,
        deal_price: 20000,
        deal_start_day: '2020-11-01T02:36:00.000Z',
        deal_end_day: '2020-11-20T02:36:00.000Z',
        tags: ['BEST_SELLER', 'PROMOTION', 'FLASH_SALE'],
        type: 'Chai 100 viên',
        category: ['Cơ Xương Khớp', 'Da Liễu', 'Dầu Xoa, Cao Xoa', 'Đông Y'],
        price: 10000,
        max_product: 1000,
        status: 'price_down',
        price_percent: 19.2323423,
        not_support_delivery: false,
        is_new: true,
        quantity: 51,
      }],
    },
  });
};
