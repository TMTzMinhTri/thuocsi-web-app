export default (req, res) => {
  res.statusCode = 200;

  res.json({
    status: 'OK',
    data: [
      {
        code: 'DET61PGE',
        name: 'Ảnh bìa',
        status: 'ON',
        type: 'banner',
      },
      {
        code: 'FTHR2AXH',
        name: 'Tìm kiếm nhiều nhất',
        status: 'ON',
        type: 'most-search',
      },
      {
        code: 'GYCV84FW',
        name: 'Popup',
        status: 'ON',
        type: 'popup',
      },
    ],
    message: 'Query setting successfully.',
  });
};
