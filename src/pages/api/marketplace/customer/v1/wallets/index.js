export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: [
      {
        accountID: 79,
        balance: 10000000,
        loyaltyPoint: 1.2,
        email: 'anhthuanga@gmail.com',
        lastUpdatedTime: '2020-12-10T09:26:31.564154141Z',
        name: 'nguyenchinhthuan3',
        username: '01341434567',
      },
    ],
    message: 'Get customer successfully.',
  });
};
