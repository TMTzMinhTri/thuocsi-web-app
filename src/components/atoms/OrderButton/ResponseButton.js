import React from 'react';
import { Button } from '@material-ui/core';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import styles from './styles.module.css';

const ResponseButton = () => (
  <Button classes={{ root: styles.response_button }} startIcon={<InsertCommentIcon />}>
    Gửi phản hồi
  </Button>
);

export default React.memo(ResponseButton);
