import { PROMO_TYPE } from 'constants/Enums';

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    staus: 'ok',
    data: [
      {
        code: 'ANHTHUANGA',
        value: '20%',
        minValue: '200.000',
        description: 'anh thuận gà quá nên được giảm 20%',
        type: PROMO_TYPE.COMBO,
        remain: new Date(Date.now() + 36 * 24 * 60 * 60 * 1000),
      },
      {
        code: 'DATDUYLE',
        value: 'GIẢM TẬN 200%',
        minValue: '200.000',
        type: PROMO_TYPE.DISCOUNT,
        remain: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),

      },
      {
        code: 'NEWBIE2314',
        title: 'TĂNG TẬN 200k',
        description: 'tăng 200k so với giá hiện tại',
        type: PROMO_TYPE.COMBO,
        remain: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),

      },
      {
        code: 'COCO2017',
        title: 'GIẢM GIÁ 200k',
        description: 'được giảm 200k',
        type: PROMO_TYPE.GIFT,
        remain: new Date(Date.now() + 36 * 24 * 60 * 60 * 1000),

      },
      {
        code: 'COCO2017',
        title: 'GIẢM GIÁ 299k',
        description: 'được giảm 299k',
        type: PROMO_TYPE.DISCOUNT,
        remain: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),

      },
    ],
  });
};
