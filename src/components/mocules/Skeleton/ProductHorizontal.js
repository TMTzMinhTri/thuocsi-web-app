import React, { memo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const ProductHorizontalSkeleton = memo(() => (
  <Box alignItems="center">
    <Skeleton variant="rect" height={118} />
    <Box pt={0.5}>
      <Skeleton />
      <Skeleton width="70%" />
      <Skeleton width="50%" />
    </Box>
    <Box pt={8}>
      <Skeleton width="25%" />
    </Box>
    <Box display="flex" alignItems="center" pt={1}>
      <Box mr={1}>
        <Skeleton animation="wave" variant="circle" width={25} height={25} />
      </Box>
      <Skeleton width="100%" height={35}>
        <Typography>.</Typography>
      </Skeleton>
      <Box ml={1}>
        <Skeleton animation="wave" variant="circle" width={25} height={25} />
      </Box>
    </Box>
  </Box>
));

export default ProductHorizontalSkeleton;
