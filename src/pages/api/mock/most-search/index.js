// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    staus: 'ok',
    data: [
      {
        id: 1,
        name: '#Mega',
      },
      {
        id: 2,
        name: '#Dermatrix',
      },
      {
        id: 3,
        name: '#Rohto',
      },
      {
        id: 3,
        name: '#Rohto',
      },
    ],
  });
};
