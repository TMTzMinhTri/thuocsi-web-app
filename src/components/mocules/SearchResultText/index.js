import React from 'react';
import { PAGE_SIZE } from 'constants/data';
import styles from './style.module.css';

export default function SearchResultText({ total = '', page = '', pages = '', limit = PAGE_SIZE }) {
  const number = () => {
    if (total === 0) {
      return {
        firstNum: 1,
        lastNum: total,
      };
    }
    if (pages === 1) {
      return {
        firstNum: 1,
        lastNum: total,
      };
    }
    if (pages === page) {
      return {
        firstNum: (page - 1) * limit + 1,
        lastNum: total,
      };
    }
    return {
      firstNum: (page - 1) * limit + 1,
      lastNum: (page - 1) * limit + limit,
    };
  };

  return (
    <div className={styles.search_result}>
      {total === 0 && (
        <div>
          Hiển thị <strong>0</strong> sản phẩm
        </div>
      )}
      {total < limit && total > 0 && (
        <div>
          Hiển thị <strong>tất cả {number().lastNum}</strong> sản phẩm
        </div>
      )}
      {total > limit && total > 0 && (
        <div>
          Hiển thị <strong>{`${number().firstNum} - ${number().lastNum}`}</strong> trên tổng số{' '}
          <strong>{total}</strong> sản phẩm
        </div>
      )}
    </div>
  );
}
