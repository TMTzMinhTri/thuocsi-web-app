import { ENUM_ORDER_STATUS } from 'constants/Enums';

export const orders = [
  {
    orderID: 197180,
    amount: 5,
    createdAt: new Date(),
    deliveryAt: new Date(),
    status: ENUM_ORDER_STATUS.COMPLETED,
    total: 3024100,
    name: 'nguyễn thị K',
    address: 'abc, Thị trấn Vôi, Huyện Lạng Giang, Bắc Giang',
    phone: '0963649542',
    email: 'tranthib@email.com',
    activeStep: 2,
    products: [
      {
        image: 'https://images.thuocsi.vn/uSSSjXoCYfnBPW7ffPTe7o6j',
        name: 'Marvelon Bayer (H/21v)',
        price: 530300,
        quantity: 2,
        id: 1,
      },
      {
        image: 'https://images.thuocsi.vn/jpfradyMDhkKsLV9aGzHV2Zi',
        name: 'Alpha Choay Sanofi (H/30v) (Date Cận) Test Update',
        price: 61000,
        quantity: 1,
        id: 2,
      },
      {
        image: 'https://images.thuocsi.vn/Ajx9matrsUyMWwHqMo42Vnoa',
        name: 'enterogermina sanofi (h/20o/5ml)',
        price: 140600,
        quantity: 3,
        id: 3,
      },
      {
        image: 'https://images.thuocsi.vn/rQC4VE7zjVemtqwa8V7Z4847',
        name: 'panadol extra gsk (h/180v)',
        price: 530300,
        quantity: 7,
        id: 5,
      },
    ],
    promo: {
      name: 'NEWBIE300K1',
      total: 300000,
    },
  },
  {
    orderID: 197181,
    amount: 1,
    createdAt: new Date(),
    deliveryAt: new Date(),
    status: ENUM_ORDER_STATUS.PENDING,
    total: 3024110,
    name: 'trần thị B',
    address: 'abc, Thị trấn Vôi, Huyện Lạng Giang, Bắc Giang',
    phone: '0963649542',
    email: 'tranthib@email.com',
    activeStep: 5,
    products: [
      {
        image: 'https://images.thuocsi.vn/uSSSjXoCYfnBPW7ffPTe7o6j',
        name: 'Marvelon Bayer (H/21v)',
        price: 530300,
        quantity: 2,
        id: 1,
      },
      {
        image: 'https://images.thuocsi.vn/jpfradyMDhkKsLV9aGzHV2Zi',
        name: 'Alpha Choay Sanofi (H/30v) (Date Cận) Test Update',
        price: 61000,
        quantity: 1,
        id: 2,
      },
      {
        image: 'https://images.thuocsi.vn/Ajx9matrsUyMWwHqMo42Vnoa',
        name: 'enterogermina sanofi (h/20o/5ml)',
        price: 140600,
        quantity: 3,
        id: 3,
      },
      {
        image: 'https://images.thuocsi.vn/rQC4VE7zjVemtqwa8V7Z4847',
        name: 'panadol extra gsk (h/180v)',
        price: 530300,
        quantity: 7,
        id: 5,
      },
    ],
    promo: {
      name: 'NEWBIE300K1',
      total: 300000,
    },
  },
  {
    orderID: 197182,
    amount: 1,
    createdAt: new Date(),
    deliveryAt: new Date(),
    status: ENUM_ORDER_STATUS.CANCEL,
    total: 3024110,
    name: 'trần thị A',
    address: 'abc, Thị trấn Vôi, Huyện Lạng Giang, Bắc Giang',
    phone: '0963649542',
    email: 'tranthib@email.com',
    activeStep: 4,
    products: [
      {
        image: 'https://images.thuocsi.vn/uSSSjXoCYfnBPW7ffPTe7o6j',
        name: 'Marvelon Bayer (H/21v)',
        price: 530300,
        quantity: 2,
        id: 1,
      },
      {
        image: 'https://images.thuocsi.vn/jpfradyMDhkKsLV9aGzHV2Zi',
        name: 'Alpha Choay Sanofi (H/30v) (Date Cận) Test Update',
        price: 61000,
        quantity: 1,
        id: 2,
      },
      {
        image: 'https://images.thuocsi.vn/Ajx9matrsUyMWwHqMo42Vnoa',
        name: 'enterogermina sanofi (h/20o/5ml)',
        price: 140600,
        quantity: 3,
        id: 3,
      },
      {
        image: 'https://images.thuocsi.vn/rQC4VE7zjVemtqwa8V7Z4847',
        name: 'panadol extra gsk (h/180v)',
        price: 530300,
        quantity: 7,
        id: 5,
      },
    ],
    promo: {
      name: 'NEWBIE300K1',
      total: 300000,
    },
  },
  {
    orderID: 197183,
    amount: 7,
    createdAt: new Date(),
    deliveryAt: new Date(),
    status: ENUM_ORDER_STATUS.PENDING,
    total: 3024110,
    name: 'trần thị cúc',
    address: 'abc, Thị trấn Vôi, Huyện Lạng Giang, Bắc Giang',
    phone: '0963649542',
    email: 'tranthib@email.com',
    activeStep: 3,
    products: [
      {
        image: 'https://images.thuocsi.vn/uSSSjXoCYfnBPW7ffPTe7o6j',
        name: 'Marvelon Bayer (H/21v)',
        price: 530300,
        quantity: 2,
        id: 1,
      },
      {
        image: 'https://images.thuocsi.vn/jpfradyMDhkKsLV9aGzHV2Zi',
        name: 'Alpha Choay Sanofi (H/30v) (Date Cận) Test Update',
        price: 61000,
        quantity: 1,
        id: 2,
      },
      {
        image: 'https://images.thuocsi.vn/Ajx9matrsUyMWwHqMo42Vnoa',
        name: 'enterogermina sanofi (h/20o/5ml)',
        price: 140600,
        quantity: 3,
        id: 3,
      },
      {
        image: 'https://images.thuocsi.vn/rQC4VE7zjVemtqwa8V7Z4847',
        name: 'panadol extra gsk (h/180v)',
        price: 530300,
        quantity: 7,
        id: 5,
      },
    ],
    promo: {
      name: 'NEWBIE300K1',
      total: 300000,
    },
  },
];

export default (req, res) => {
  res.statusCode = 200;
  const { status } = req.query;
  let data = [];
  if (status === ENUM_ORDER_STATUS.ALL) data = orders;
  else {
    data = orders.filter((order) => {
      if (order.status === status) return true;
      return false;
    });
  }

  res.json({
    status: 'OK',
    data,
    message: 'Get customer successfully.',
  });
};
