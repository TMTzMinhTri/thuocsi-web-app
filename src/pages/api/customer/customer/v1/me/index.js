export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: [
      {
        accountID: 79,
        districtCode: null,
        email: '',
        lastUpdatedTime: '2020-12-10T09:26:31.564154141Z',
        name: 'nguyenchinhthuan3',
        phone: '01341434567',
        point: 0,
        provinceCode: null,
        scope: 'PHARMACY',
        status: 'NEW',
        username: '01341434567',
        wardCode: null,
      },
    ],
    message: 'Get customer successfully.',
  });
};
