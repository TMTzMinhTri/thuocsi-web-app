/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Paper, FormControlLabel, RadioGroup, Radio, FormControl } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';

import styles from './styles.module.css';

const renderPaymentMethod = ({ item }) => {
  const { code, name, description, subTitle, url } = item;
  return (
    <React.Fragment key={uuidv4()}>
      <FormControlLabel
        key={uuidv4()}
        value={code}
        control={<Radio classes={{ root: clsx(styles.checkbox, styles.checkbox_color) }} />}
        label={
          <div className={styles.fw500}>
            {name}{' '}
            {code === 'PAYMENT_METHOD_BANK' && url && (
              <a href={url} target="_blank" rel="noreferrer">
                (Hướng dẫn chuyển khoản)
              </a>
            )}
          </div>
        }
      />
      {subTitle && <div className={styles.subTitle}>{subTitle}</div>}

      {description && (
        <React.Fragment key={uuidv4()}>
          <Alert className={styles.bank_info} icon={false} severity="info">
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </Alert>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const PaymentMethod = ({ handleChange, selectedValue = '', paymentMethods = [] }) => {
  const selectedVal = selectedValue || paymentMethods[0]?.code;
  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}>Hình thức thanh toán</h1>
      <FormControl component="fieldset">
        <RadioGroup value={selectedVal} onChange={(e) => handleChange(e)}>
          {paymentMethods && paymentMethods.map((item) => renderPaymentMethod({ item }))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default PaymentMethod;
