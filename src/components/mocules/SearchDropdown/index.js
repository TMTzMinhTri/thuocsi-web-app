import React from 'react';
import LinkComp from '../../atoms/LinkComp';
import styles from './styles.module.css';

const SearchDropdown = (props) => {
  const { data, keyword } = props;
  console.log(data);
  return (
    <div className={styles.searchDropdown}>
      {data && data.length > 0 ? (
        <>
          <LinkComp className={styles.searchResults} href="/">
            <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
            <b className={styles.textPrimary}>Tất Cả Sản Phẩm</b>
          </LinkComp>
          {data?.map((item) => (
            <LinkComp className={styles.searchResults} key={item.id} item={item} href={item.slug}>
              {item.name}
            </LinkComp>
          ))}
        </>
      ) : (
        <span className={styles.searchResults}>
          Không có sản phẩm với từ khóa "{`${keyword}`}"
        </span>
      )}

      {data && data.length > 0 ? (
        <>
          <LinkComp className={styles.searchResults} href="/">
            <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
            <b className={styles.textPrimary}>Tất Cả Nhà Sản Xuất </b>
          </LinkComp>
          {data?.map((item) => (
            <LinkComp className={styles.searchResults} key={item.id} item={item} href="/">
              {item.madeBy}
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
