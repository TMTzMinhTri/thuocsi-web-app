/* eslint-disable camelcase */
import React from 'react';
import Template from 'components/layout/Template';
import ProductListing from 'components/organisms/ProductListing';
import { CatClient, SupplierClient, ProductClient } from 'clients';
import { TAB_LIST } from 'constants/data';
import Image from 'next/image';
import { Grid } from '@material-ui/core';
import { LOGO_PHARMACY } from 'constants/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  const [products, brand, group, tags, supplier] = await Promise.all([
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
      supplier,
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
  supplier = [],
}) {
  const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const cat = 'supplier/medx';
  const namePage = (val) => {
    let name = 'Tất cả sản phẩm';
    if (val) {
      const currentTab = TAB_LIST.filter((tab) => tab.value === val);
      name = currentTab[0] ? currentTab[0].label : name;
    }
    return name;
  };
  return (
    <Template title={title} isMobile={isMobile} pageName={cat}>
      <Grid className={styles.supplierWrapper} container>
        <Grid container item className={styles.container}>
          <div className={styles.logoPharma}>
            <Image src={LOGO_PHARMACY} width="215px" height="200px" />
          </div>
          <div style={{ width: '70%' }}>
            <h1>{supplier?.name}</h1>
            <div className={styles.supplierRating}>
              <div className={styles.rating}>
                <div className={styles.ratingBase}>
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                </div>
                <div
                  className={styles.ratingStars}
                  style={{ width: `${(supplier?.rating / 5) * 100}%` }}
                >
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                  <FontAwesomeIcon className={styles.star} icon={faStar} />
                </div>
              </div>
            </div>
            <span className={styles.supplierYear}>Thành viên từ: {supplier.yearFounded}</span>
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
        name={namePage(current_tab)}
        isAuthenticated={isAuthenticated}
      />
    </Template>
  );
}
