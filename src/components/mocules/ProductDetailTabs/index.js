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
          >
            {data.map((item) => (
              <Tab classes={{ root: styles.tab }} label={item.label} value={item.value} />
            ))}
          </TabList>
        </div>
        <TabPanel value="1">{description}</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
}
