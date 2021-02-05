import React from 'react';
import { Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { v4 as uuidv4 } from 'uuid';
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
            className={styles.tabs}
          >
            {data.map((item) => (
              <Tab
                key={uuidv4()}
                classes={{ root: styles.tab }}
                label={item.label}
                value={item.value}
              />
            ))}
          </TabList>
        </div>
        {data.map((item) => {
          if (item.value === '1') {
            return (
              <TabPanel className={styles.tab_panel} value={item.value} key={uuidv4()}>
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{
                    __html: description !== '' ? description : 'Đang cập nhật ...',
                  }}
                />
              </TabPanel>
            );
          }

          return (
            <TabPanel key={uuidv4()} value={item.value}>
              <div className={styles.content}>
                <p>Đang cập nhật ...</p>
              </div>
            </TabPanel>
          );
        })}
      </TabContext>
    </div>
  );
}
