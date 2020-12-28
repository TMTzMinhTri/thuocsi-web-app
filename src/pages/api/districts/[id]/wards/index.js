import wards from './xa.json';

export default (req, res) => {
  const { id } = req.query;
  res.statusCode = 200;
  const d = wards.filter((ward) => String(ward.huyen_id) === id);
  let data = [{ id: 0, huyen_id: 0, name: 'Chọn Quận/Huyện...' }];
  data = data.concat(d);

  res.json({
    staus: 'ok',
    data,
  });
};
