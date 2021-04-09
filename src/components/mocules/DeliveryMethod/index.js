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
  const { customerDistrictCode = '0' } = addressSelect;
  const label = (
    <>
      <b className={styles.fw500}>{name}</b>
      {feeValue > 0 && (
        <>
          Phí vận chuyển <i className={styles.fw500}>({formatCurrency(feeValue)})</i>
        </>
      )}
    </>
  );

  let disable = false;
  const { maxPrice, minPrice, locationCodes = null } = condition;

  if (!disable && maxPrice && maxPrice > 0 && totalPrice > maxPrice) {
    disable = true;
  }

  if (!disable && minPrice && minPrice > 0 && totalPrice < minPrice) {
    disable = true;
  }

  if (
    !disable &&
    customerDistrictCode &&
    locationCodes &&
    locationCodes.length > 0 &&
    locationCodes.indexOf(customerDistrictCode) === -1
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
  deliveryMethods,
  selectedValue,
  addressSelect,
  totalPrice,
}) => {
  const selectedVal = selectedValue || deliveryMethods[0]?.code;
  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}>Hình thức giao hàng</h1>
      <FormControl component="fieldset">
        <RadioGroup value={selectedVal} onChange={handleChange}>
          {deliveryMethods &&
            deliveryMethods.map((item) =>
              renderDeliveryMethod({ item, addressSelect, totalPrice }),
            )}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default DeliveryMethod;
