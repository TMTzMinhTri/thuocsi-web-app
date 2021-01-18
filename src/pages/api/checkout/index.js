import { HTTP_STATUS } from 'constants/Enums';

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: HTTP_STATUS.Ok,
    data: [
      {
        id: '1',
        orderID: 197180,
      },
    ],
  });
};
