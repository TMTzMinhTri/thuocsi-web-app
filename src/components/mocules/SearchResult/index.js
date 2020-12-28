import React from 'react';
import styles from './style.module.css';

export default function SearchResult({ count = [], pageSize = [], page = [], pages = [] }) {
  const number = () => {
    if (page === 1) {
      return ({
        firstNum: 1,
        lastNum: page * pageSize,
      });
    }
    if (page === pages) {
      return ({
        firstNum: (page - 1) * pageSize + 1,
        lastNum: count,
      });
    }
    return ({
      firstNum: (page - 1) * pageSize + 1,
      lastNum: (page - 1) * pageSize + pageSize,
    });
  };

  return (
    <div className={styles.search_result}>
      Hiển thị{' '}
      <strong>
        {number().firstNum} - {number().lastNum}
      </strong>{' '}
      trên tổng số <strong>{count}</strong> sản phẩm
    </div>
  );
}
