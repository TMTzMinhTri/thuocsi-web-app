export const imagePartnerSlider = [
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

export const settingsSliderBanner = {
  className: 'section-outstanding__slider',
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  dotsClass: 'slick-dots slick-thumb',
  arrows: false,
  infinite: true,
  rows: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  swipeToSlide: true,
};

export const linkQuestionItemLeft = [
  {
    id: 1,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360029452912-C%C3%A1ch-%C4%91%C4%83ng-k%C3%BD-v%C3%A0-%C4%91%C4%83ng-nh%E1%BA%ADp-t%C3%A0i-kho%E1%BA%A3n-t%E1%BA%A1i-thuocsi-vn',
    title: 'Cách đăng ký và đăng nhập tài khoản tại thuocsi.vn',
  },
  {
    id: 2,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360030488231-Qu%C3%AAn-m%E1%BA%ADt-kh%E1%BA%A9u-%C4%91%C4%83ng-nh%E1%BA%ADp',
    title: 'Quên mật khẩu đăng nhập',
  },
  {
    id: 3,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360030159252-Nh%C6%B0-th%E1%BA%BF-n%C3%A0o-l%C3%A0-h%C3%A0ng-c%E1%BA%ADn-date-H%E1%BA%A1n-s%E1%BB%AD-d%E1%BB%A5ng-c%C3%B2n-bao-l%C3%A2u-',
    title: 'Như thế nào là hàng cận date? Hạn sử dụng còn bao lâu?',
  },
  {
    id: 4,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360030900651-T%E1%BA%A1i-sao-t%C3%B4i-kh%C3%B4ng-thanh-to%C3%A1n-%C4%91%C6%B0%E1%BB%A3c',
    title: 'Tại sao tôi không thanh toán được',
  },
  {
    id: 5,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360029396272-T%C3%B4i-mu%E1%BB%91n-ch%E1%BB%89nh-l%E1%BA%A1i-%C4%91%C6%A1n-h%C3%A0ng-th%C3%AC-l%C3%A0m-c%C3%A1ch-n%C3%A0o-',
    title: 'Tôi muốn chỉnh lại đơn hàng thì làm cách nào?',
  },
];

export const linkQuestionItemRight = [
  {
    id: 1,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360029452652-H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-%C4%91%E1%BA%B7t-h%C3%A0ng',
    title: '⭑ Hướng dẫn đặt hàng',
  },
  {
    id: 2,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360029505332-D%C3%B9ng-th%E1%BB%AD-t%E1%BA%A1i-website-thuocsi-vn-',
    title: 'Dùng thử tại website thuocsi.vn',
  },
  {
    id: 3,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360029773811-Thanh-to%C3%A1n-b%E1%BA%B1ng-h%C3%ACnh-th%E1%BB%A9c-chuy%E1%BB%83n-kho%E1%BA%A3n-nh%C6%B0-th%E1%BA%BF-n%C3%A0o-',
    title: 'Thanh toán bằng hình thức chuyển khoản như thế nào?',
  },
  {
    id: 4,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360029453432-Xu%E1%BA%A5t-h%C3%B3a-%C4%91%C6%A1n-%C4%91%E1%BB%8F-t%E1%BA%A1i-thuocsi-vn-',
    title: 'Xuất hóa đơn đỏ tại thuocsi.vn?',
  },
  {
    id: 5,
    href:
      'https://thuocsi.zendesk.com/hc/vi/articles/360030403531-Th%E1%BB%9Di-gian-giao-h%C3%A0ng-d%E1%BB%B1-ki%E1%BA%BFn',
    title: 'Thời gian giao hàng dự kiến',
  },
];

// eslint-disable-next-line operator-linebreak
export const LINK_ALL_QUESTION =
  'https://thuocsi.zendesk.com/hc/vi/categories/360001885792-C%C3%A2u-h%E1%BB%8Fi-th%C6%B0%E1%BB%9Dng-g%E1%BA%B7p-Q-A-';
