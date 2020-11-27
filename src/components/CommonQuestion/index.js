import React from 'react';
import { Box, Grid, Button } from '@material-ui/core';

import LinkComp from '../LinkComp';
import useStyles from './styles';
import {
  linkQuestionItemRight,
  linkQuestionItemLeft,
  LINK_ALL_QUESTION,
} from '../../constants/data';

const renderLinkItem = (data, classes) =>
  data.map((item) => (
    <LinkComp key={`question-${item.id}`} className={classes.link} href={item.href}>
      {item.title}
    </LinkComp>
  ));

const CommonQuestion = () => {
  const classes = useStyles();
  return (
    <Box py={5} className={classes.Wrapper}>
      <Box maxWidth="1140px" m="auto">
        <Box
          className={classes.center}
          component="h2"
          mt={0}
          fontSize="32px"
          color="#00b46e"
          fontWeight="fontWeightMedium"
        >
          Câu hỏi thường gặp
        </Box>

        <Grid container>
          <Grid container style={{ display: 'flex' }} direction="column" item sm={6}>
            {renderLinkItem(linkQuestionItemLeft, classes)}
          </Grid>
          <Grid container style={{ display: 'flex' }} direction="column" item sm={6}>
            {renderLinkItem(linkQuestionItemRight, classes)}
          </Grid>
        </Grid>

        <Box display="flex" mt={2} justifyContent="center">
          <Button
            classes={{ label: classes.label, outlined: classes.outlined, root: classes.root }}
            href={LINK_ALL_QUESTION}
            variant="outlined"
          >
            Xem tất cả câu hỏi
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CommonQuestion;
