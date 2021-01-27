export default (req, res) => {
  res.statusCode = 200;
  res.json({
    status: 'OK',
    data: [
      // {
      //   phone: '0376543271',
      //   code: 'DBA3674F63875',
      //   expiredAt: new Date(),
      //   userName: '',
      //   isRegister: false,
      //   paid: 0,
      //   canSendSMS: false,
      // },
      // {
      //   phone: '0376543223',
      //   code: 'DBA3674F61175',
      //   expiredAt: new Date(),
      //   userName: 'anhthuanga',
      //   isRegister: true,
      //   paid: 1,
      //   canSendSMS: false,
      // },
      // {
      //   phone: '0376543244',
      //   code: 'DBA3674F67754',
      //   expiredAt: new Date(),
      //   userName: 'helloworld',
      //   isRegister: true,
      //   paid: 19,
      //   canSendSMS: true,
      // },
    ],
    message: 'Get customer successfully.',
  });
};
