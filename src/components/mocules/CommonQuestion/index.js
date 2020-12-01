import React from 'react';
import { Box, Grid, Button } from '@material-ui/core';
import { linkQuestionItemRight, linkQuestionItemLeft, LINK_ALL_QUESTION } from 'constants/data';
import { LinkComp } from '../../atoms';
import styles from './styles.module.css';

const renderLinkItem = (data) =>
  data.map((item) => (
    <LinkComp key={`question-${item.id}`} className={styles.link} href={item.href}>
      {item.title}
    </LinkComp>
  ));

const CommonQuestion = () => (
  <Box py={5} className={styles.wrapper}>
    <Box maxWidth="1140px" m="auto">
      <Box
        className={styles.center}
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
          {renderLinkItem(linkQuestionItemLeft)}
        </Grid>
        <Grid container style={{ display: 'flex' }} direction="column" item sm={6}>
          {renderLinkItem(linkQuestionItemRight)}
        </Grid>
      </Grid>

      <Box display="flex" mt={2} justifyContent="center">
        <Button
          classes={{ label: styles.label, outlined: styles.outlined, root: styles.root }}
          href={LINK_ALL_QUESTION}
          variant="outlined"
        >
          Xem tất cả câu hỏi
        </Button>
      </Box>
    </Box>
  </Box>
);

export default CommonQuestion;
