import React from 'react';
import styles from './style.module.css';
import { PAGE_SIZE } from '../../../constants/data';

export default function SearchResultText({ total = [], page = [], pages = [] }) {
  const number = () => {
    if (pages === 1) {
      return ({
        firstNum: 1,
        lastNum: total,
      });
    }
    if (pages === page) {
      return ({
        firstNum: (page - 1) * PAGE_SIZE + 1,
        lastNum: total,
      });
    }
    return ({
      firstNum: (page - 1) * PAGE_SIZE + 1,
      lastNum: (page - 1) * PAGE_SIZE + PAGE_SIZE,
    });
  };

  return (
    <div className={styles.search_result}>
      {total < PAGE_SIZE
        ? (
          <div>
            Hiển thị <strong>tất cả {number().lastNum}</strong> sản phẩm
          </div>
        )
        : (
          <div>
            Hiển thị <strong>{`${number().firstNum} - ${number().lastNum}`}</strong> trên tổng số <strong>{total}</strong> sản phẩm
          </div>
        )}
    </div>
  );
}
