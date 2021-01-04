import React, { memo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const LineItemSkeleton = memo(() => (
  <Box alignItems="center">
    <Skeleton width="100%" height={24}>
      <Typography>.</Typography>
    </Skeleton>
  </Box>
));

export default LineItemSkeleton;
