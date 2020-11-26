export const image = [
  { id: 1, url: '/images/partner/logo_anthien.jpg', width: '185px', height: '185px' },
  { id: 2, url: '/images/partner/logo_domesco.jpg', width: '185px', height: '185px' },
  { id: 3, url: '/images/partner/logo_gsk.jpg', width: '185px', height: '93px' },
  { id: 4, url: '/images/partner/logo_imex.jpg', width: '185px', height: '92px' },
  { id: 5, url: '/images/partner/logo_mp.jpg', width: '185px', height: '185px' },
  { id: 6, url: '/images/partner/logo_nic.jpg', width: '185px', height: '185px' },
  { id: 7, url: '/images/partner/logo_pharmedic.jpg', width: '185px', height: '123px' },
  { id: 8, url: '/images/partner/logo_sanofi.jpg', width: '185px', height: '121px' },
  { id: 9, url: '/images/partner/logo_stada.jpg', width: '185px', height: '115px' },
  { id: 10, url: '/images/partner/logo_usp.jpg', width: '185px', height: '185px' },
  { id: 11, url: '/images/partner/logo_vpc.jpg', width: '185px', height: '185px' },
];

export const settingsPartner = {
  className: 'section-outstanding__slider',
  slidesToShow: 6,
  slidesToScroll: 1,
  dots: true,
  dotsClass: 'slick-dots slick-thumb',
  arrows: false,
  infinite: true,
  rows: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1198,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
        rows: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        rows: 1,
      },
    },
  ],
};

export const linkItemLeft = [
  {
    id: 1,
    href: '',
    title: 'Cách đăng ký và đăng nhập tài khoản tại thuocsi.vn',
  },
  {
    id: 2,
    href: '',
    title: 'Quên mật khẩu đăng nhập',
  },
  {
    id: 3,
    href: '',
    title: 'Như thế nào là hàng cận date? Hạn sử dụng còn bao lâu?',
  },
  {
    id: 4,
    href: '',
    title: 'Tại sao tôi không thanh toán được',
  },
  {
    id: 5,
    href: '',
    title: 'Tôi muốn chỉnh lại đơn hàng thì làm cách nào?',
  },
];

export const linkItemRight = [
  {
    id: 1,
    href: '',
    title: '⭑ Hướng dẫn đặt hàng',
  },
  {
    id: 2,
    href: '',
    title: 'Dùng thử tại website thuocsi.vn',
  },
  {
    id: 3,
    href: '',
    title: 'Thanh toán bằng hình thức chuyển khoản như thế nào?',
  },
  {
    id: 4,
    href: '',
    title: 'Xuất hóa đơn đỏ tại thuocsi.vn?',
  },
  {
    id: 5,
    href: '',
    title: 'Thời gian giao hàng dự kiến',
  },
];
