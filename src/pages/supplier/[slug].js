/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import { CatClient, SupplierClient, ProductClient, isValid } from 'clients';
import Image from 'next/image';
import { NOT_FOUND_URL } from 'constants/Paths';

import { Grid } from '@material-ui/core';
import { LOGO_PHARMACY } from 'constants/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  const [products, brand, group, tags, supplierRes] = await Promise.all([
    ProductClient.loadDataProduct(ctx),
    CatClient.loadBrand(ctx),
    CatClient.loadGroup(ctx),
    CatClient.loadTags(ctx),
    SupplierClient.getInfoSupplier(ctx),
  ]);
  const current_tab = ctx.query.current_tab || '';
  const sortBy = ctx.query.sortBy || '';
  const page = Number(ctx.query.page) || 1;
  const slug = ctx.query.slug || '';
  const { data = [], total = 0 } = products;
  if (!isValid(supplierRes)) {
    return {
      redirect: {
        destination: NOT_FOUND_URL,
      },
    };
  }
  return {
    props: {
      products: data,
      total,
      current_tab,
      page,
      sortBy,
      brand,
      group,
      slug,
      tags,
      supplier: supplierRes.data[0],
    },
  };
}

export default function Supplier({
  products,
  total,
  brand = [],
  group = [],
  tags = [],
  current_tab = '',
  page = '',
  sortBy = '',
  slug = '',
  isMobile,
  isAuthenticated,
  supplier,
}) {
  const title = `${supplier.name} – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn`;
  const cat = 'supplier';
  return (
    <Template title={title} isMobile={isMobile}>
      <Grid className={styles.supplierWrapper} container>
        <Grid container item className={styles.container}>
          <div className={styles.logoPharma}>
            <Image src={LOGO_PHARMACY} width="215px" height="200px" />
          </div>
          <div style={{ width: '70%' }}>
            <h1 className={styles.supplierName}>{supplier?.name}</h1>
            <div className={styles.supplierRating}>
              <div className={styles.rating}>
                <div className={styles.ratingBase}>
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                </div>
                {supplier.rating && (
                  <div
                    className={styles.ratingStars}
                    style={{ width: `${(supplier.rating / 5) * 100}%` }}
                  >
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                    <FontAwesomeIcon className={styles.star} icon={faStar} />
                  </div>
                )}
              </div>
            </div>
            {supplier.createdTime && (
              <span className={styles.supplierYear}>
                Thành viên từ: {new Date(supplier.createdTime).getFullYear()}
              </span>
            )}
          </div>
        </Grid>
      </Grid>
      <ProductListing
        products={products}
        total={total}
        brand={brand}
        group={group}
        current_tab={current_tab}
        page={page}
        sortBy={sortBy}
        catName={cat}
        slug={slug}
        tags={tags}
        isAuthenticated={isAuthenticated}
      />
    </Template>
  );
}
