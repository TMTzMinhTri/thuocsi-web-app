/* eslint-disable react/no-danger */
import React from 'react';
import { Paper, FormControlLabel, RadioGroup, Radio, FormControl } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from 'utils/FormatNumber';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';

import styles from './styles.module.css';

const renderDeliveryMethod = ({ item, addressSelect, totalPrice = 0 }) => {
  const { description, code, name, feeValue, condition = {} } = item;
  const { customerProvinceCode = '0' } = addressSelect;
  const label = (
    <>
      <b className={styles.fw500}>{name}</b>
      {feeValue > 0 && (
        <>
          {' '}
          Phí vận chuyện <i className={styles.fw500}>({formatCurrency(feeValue)})</i>
        </>
      )}
    </>
  );

  let disable = false;
  const { maxPrice, minPrice, provinceCodes = null } = condition;

  if (!disable && maxPrice && maxPrice > 0 && totalPrice > maxPrice) {
    disable = true;
  }

  if (!disable && minPrice && minPrice > 0 && totalPrice < minPrice) {
    disable = true;
  }

  if (
    !disable &&
    customerProvinceCode &&
    provinceCodes &&
    provinceCodes.length > 0 &&
    provinceCodes.indexOf(customerProvinceCode) === -1
  ) {
    disable = true;
  }
  return (
    <React.Fragment key={uuidv4()}>
      <FormControlLabel
        value={code}
        control={<Radio classes={{ root: clsx(styles.checkbox, styles.checkbox_color) }} />}
        label={label}
        disabled={disable}
      />
      {description && (
        <Alert className={styles.checkout_description} icon={false} severity="info">
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Alert>
      )}
    </React.Fragment>
  );
};

const DeliveryMethod = ({
  handleChange,
  selectedValue,
  deliveryMethods,
  addressSelect,
  totalPrice,
}) => (
  <Paper className={styles.root} elevation={4}>
    <h1 className={styles.title}>Hình thức giao hàng</h1>
    <FormControl component="fieldset">
      <RadioGroup value={selectedValue} onChange={handleChange}>
        {deliveryMethods &&
          deliveryMethods.map((item) => renderDeliveryMethod({ item, addressSelect, totalPrice }))}
      </RadioGroup>
    </FormControl>
  </Paper>
);

export default DeliveryMethod;
