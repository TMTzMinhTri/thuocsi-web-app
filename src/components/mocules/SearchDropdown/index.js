import React from 'react';
import { getPathProductBySlug } from 'constants/Paths';
import LinkComp from 'components/atoms/LinkComp';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const SearchDropdown = (props) => {
  const { data, keyword } = props;

  return (
    <div className={styles.searchDropdown}>
      {data[0] && data[0].products ? (
        <>
          <LinkComp className={styles.searchResults} href={`/products?q=${keyword}`}>
            <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
            <b className={styles.textPrimary}>Tất Cả Sản Phẩm</b>
          </LinkComp>
          {data[0].products.map((item) => (
            <LinkComp
              className={styles.searchResults}
              key={uuidv4()}
              item={item}
              href={getPathProductBySlug(item.slug)}
            >
              {item.name} {item.seller && item.seller.name ? `- ${item.seller.name}` : ''}
            </LinkComp>
          ))}
        </>
      ) : (
        <span className={styles.searchResults}>
          Không có sản phẩm với từ khóa <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
          <b className={styles.textPrimary}>Tất Cả Sản Phẩm</b>
        </span>
      )}

      {data[0] && data[0].manufacturers ? (
        <>
          <LinkComp className={styles.searchResults} href="/">
            <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
            <b className={styles.textPrimary}>Tất Cả Nhà Sản Xuất </b>
          </LinkComp>
          {data[0].manufacturers.map((item) => (
            <LinkComp className={styles.searchResults} key={uuidv4()} item={item} href="/">
              {item.name}
            </LinkComp>
          ))}
        </>
      ) : (
        <div className={styles.searchResults}>
          Không có sản phẩm với từ khóa <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
          <b className={styles.textPrimary}>Tất Cả Nhà Sản Xuất </b>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
