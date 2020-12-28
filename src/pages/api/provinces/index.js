// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import provinces from './tinh.json';

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    staus: 'ok',
    data: provinces,
  });
};
