import districts from './huyen.json';

export default (req, res) => {
  const { id } = req.query;
  res.statusCode = 200;
  const d = districts.filter((district) => String(district.tinh_id) === id);
  let data = [{ id: 0, tinh_id: 0, name: 'Chọn Quận/Huyện...' }];
  data = data.concat(d);
  res.json({
    staus: 'ok',
    data,
  });
};
