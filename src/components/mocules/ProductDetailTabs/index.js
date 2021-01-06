import React from 'react';
import { Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import styles from './styles.module.css';

export default function ProductDetailTabs({ data, product, handleChange, value }) {
  const { description } = product;

  return (
    <div className={styles.root}>
      <TabContext value={value}>
        <div>
          <TabList
            TabIndicatorProps={{ className: styles.indicator }}
            onChange={handleChange}
            aria-label="product details tabs"
            variant="scrollable"
          >
            {data.map((item) => (
              <Tab classes={{ root: styles.tab }} label={item.label} value={item.value} />
            ))}
          </TabList>
        </div>
        {
          data.map((item) => {
            if (item.value === '1') {
              return (<TabPanel value={item.value}>{description}</TabPanel>);
            }

            return (<TabPanel value={item.value}>Đang cập nhật ...</TabPanel>);
          })
        }

      </TabContext>
    </div>
  );
}
