import React from 'react';
import LinkComp from '../../atoms/LinkComp';
import styles from './styles.module.css';

const SearchDropdown = (props) => {
  const { data, keyword } = props;
  return (
    <div className={styles.searchDropdown}>
      {data[0]?.products.length > 0 ? (
        <>
          <LinkComp className={styles.searchResults} href="/">
            <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
            <b className={styles.textPrimary}>Tất Cả Sản Phẩm</b>
          </LinkComp>
          {data[0]?.products.map((item) => (
            <LinkComp className={styles.searchResults} key={item.id} item={item} href="/">
              {item.name}
            </LinkComp>
          ))}
        </>
      ) : (
        <div className={styles.searchDropdown}>Không có sản phẩm với từ khóa "{`${keyword}`}"</div>
      )}

      {data[0]?.manufacturers.length > 0 ? (
        <>
          <LinkComp className={styles.searchResults} href="/">
            <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
            <b className={styles.textPrimary}>Tất Cả Nhà Sản Xuất </b>
          </LinkComp>
          {data[0]?.manufacturers.map((item) => (
            <LinkComp className={styles.searchResults} key={item.id} item={item} href="/">
              {item.name}
            </LinkComp>
          ))}
        </>
      ) : (
        <div className={styles.searchDropdown}>Không có sản phẩm với từ khóa "{`${keyword}`}"</div>
      )}
    </div>
  );
};

export default SearchDropdown;
