import React from 'react';
import { Button } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import styles from './styles.module.css';

const PrintInvoiceButton = () => (
  <Button classes={{ root: styles.print_invoice_button }} startIcon={<PrintIcon />}>
    Xuất hoá đơn
  </Button>
);

export default React.memo(PrintInvoiceButton);
