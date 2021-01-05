import React from 'react';
import { Button } from 'components/atoms';
import PrintIcon from '@material-ui/icons/Print';

const PrintInvoiceButton = () => (
  <Button startIcon={<PrintIcon />} className="my-order__button my-order__button--secondary"> Xuất hoá đơn </Button>
);

export default React.memo(PrintInvoiceButton);
