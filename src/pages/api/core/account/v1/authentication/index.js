export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: [
      {
        bearerToken:
          'Q1VTVE9NRVIvMDEyMzQ1Njc4OTpIY0VodWFsUjlnZDdRRzVJckxzN3RBazNBTXd2RkVIaTdLMWFKSkRlOThjTFJzeTk=',
        expiredTime: '2020-12-14T17:45:50.619210743Z',
        time: '2020-12-11T17:45:50.619002533Z',
        type: 'CUSTOMER',
        username: '0123456789',
      },
    ],
    message: 'Login successfully.',
  });
};
