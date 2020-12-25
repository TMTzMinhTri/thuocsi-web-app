import React from 'react';
import { Button } from '@material-ui/core';
import styles from './styles.module.css';

const EditOrderButton = () => (
  <Button classes={{ root: styles.edit_order_button }}>Sửa đơn hàng</Button>
);

export default React.memo(EditOrderButton);
