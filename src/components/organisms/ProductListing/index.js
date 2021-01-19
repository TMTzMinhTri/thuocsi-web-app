/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
// eslint-disable-next-line operator-linebreak
// eslint-disable-next-line camelcase
import React, { useState, useEffect } from 'react';
import {
  NativeSelect,
  FormControl,
  Box,
  Icon,
  Typography,
  Fab,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Pagination } from '@material-ui/lab';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { SearchResultText } from 'components/mocules';
import GridSkeletonProductHorizontal from '../Skeleton/GirdSkeleton';

import { SORT_PRODUCT, TAB_LIST, PAGE_SIZE } from '../../../constants/data';
import ProductCardVertical from '../ProductCardVertical';
import styles from './style.module.css';

export default function ProductListing({
  products = [],
  brand = [],
  group = [],
  current_tab = '',
  page = '',
  sortBy = '',
  slug = '',
  catName = '',
  name = '',
  total,
}) {
  const [isloading, setIsLoading] = useState(true);
  const [numPage, setNumPage] = useState(page);
  const pages = Math.ceil(total / PAGE_SIZE);
  const router = useRouter();
  const pathName = `/${catName}/${slug}`;

  useEffect(() => {
    setIsLoading(false);
  }, [isloading]);

  const getQueryObject = () => {
    const query = {};
    if (current_tab) {
      query.current_tab = current_tab;
    }
    if (sortBy) {
      query.sortBy = sortBy;
    }
    return query;
  };

  const getTabQuery = (currentTab) => {
    const query = getQueryObject();
    if (!currentTab) {
      delete query.current_tab;
    }
    if (!sortBy) {
      delete query.sortBy;
    }
    return query;
  };

  const handleChangePage = (event, value) => {
    if (page === value) return;
    setIsLoading(true);
    const query = getQueryObject();
    query.page = value;
    router.push({
      pathname: pathName,
      query,
    });
    setNumPage(value);
  };
  const handleChangeSort = (event) => {
    setIsLoading(true);
    const query = getQueryObject();
    query.sortBy = event.target.value || undefined;
    router.push({
      pathname: pathName,
      query,
    });
    setNumPage(1);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.headTitle}>
          <Icon className="icon-tune" color="inherit" fontSize="default" />
          <div>BỘ LỌC TÌM KIẾM</div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.sort}>
          <div className={styles.headSort}>Sắp xếp</div>
          <div className={styles.select}>
            <FormControl className={styles.formControl}>
              <NativeSelect
                className={styles.selectInput}
                inputProps={{
                  name: 'sortBy',
                  id: 'sortBy-product',
                  placeholder: 'sắp xếp',
                }}
                IconComponent={() => <ExpandMoreIcon className={styles.selectIcon} />}
                onChange={handleChangeSort}
              >
                {SORT_PRODUCT.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.group}>
          <Accordion className="accordion" defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="accordion-sumary"
            >
              <Typography>Nhóm thuốc</Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion-detail">
              <Box component="div">
                <Link key="all-products" href="/products">
                  <div className={`${styles.accordionLink} ${
                    slug === '' ? styles.active : ''
                  }`}
                  >
                    Tất cả sản phẩm
                  </div>
                </Link>
                {group &&
                  group.length > 0 &&
                  group.map((item) => (
                    <Link key={item.categoryID} href={`/categories/${item.slug}`}>
                      <div
                        className={`${styles.accordionLink} ${
                          item.slug === slug ? styles.active : ''
                        }`}
                      >
                        {item.name}
                      </div>
                    </Link>
                  ))}
              </Box>
            </AccordionDetails>
          </Accordion>
          <hr className={styles.hr_clear} />
          <Accordion className="accordion" defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1b-content"
              id="panel1b-header"
              className="accordion-sumary"
            >
              <Typography>Nhà sản xuất</Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion-detail">
              <Box component="div">
                <Link key="all-products" href="/products">
                  <div className={styles.accordionLink}>
                    Tất cả sản phẩm
                  </div>
                </Link>
                {brand &&
                  brand.length > 0 &&
                  brand.map((item) => (
                    <Link key={item.manufacturerID} href={`/manufacturers/${item.slug}`}>
                      <div
                        className={`${styles.accordionLink} ${
                          item.slug === slug ? styles.active : ''
                        }`}
                      >
                        {item.name}
                      </div>
                    </Link>
                  ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className={styles.product_main}>
        {isloading ? (
          <GridSkeletonProductHorizontal counts={12} />
        ) : (
          <div>
            <div>
              <Typography className="product_title" variant="h4" component="h1">
                {name && name}
              </Typography>
              <SearchResultText total={total} page={page} pages={pages} />
            </div>
            <div>
              <div className={styles.filters}>
                {TAB_LIST.map((item) => (
                  <Link
                    href={{
                      pathname: pathName,
                      query: { ...getTabQuery(), current_tab: item.value },
                    }}
                  >
                    <Fab
                      variant="extended"
                      aria-label="all"
                      className={clsx(
                        current_tab === item.value && styles.active,
                        styles.filter_btn,
                      )}
                    >

                      {item.leftIcon && (
                        <span className={styles.iconLeft}>
                          {item.leftIcon}
                        </span>
                      )}
                      {item.shortName}
                      {item.rightIcon && (
                        <span className={styles.iconRight}>
                          {item.rightIcon}
                        </span>
                      )}
                    </Fab>
                  </Link>
                ))}
              </div>
            </div>
            {products.length > 0 ? (
              <main className={styles.product_listing}>
                <div className={styles.pagging}>
                  <Pagination
                    count={pages}
                    defaultPage={numPage}
                    boundaryCount={2}
                    onChange={handleChangePage}
                  />
                </div>
                <div className={styles.product_grid_wrapper}>
                  <Grid container spacing={1}>
                    {products.map((item) => (
                      <Grid item xl={2} lg={3} md={4} xs={6} className={styles.customGrid}>
                        <ProductCardVertical
                          key={`products-${item.sku}`}
                          product={item}
                          value={item.quantity || 0}
                          tag
                          category
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
                <div className={styles.pagging}>
                  <Pagination
                    count={pages}
                    defaultPage={numPage}
                    boundaryCount={2}
                    onChange={handleChangePage}
                  />
                </div>
              </main>
            ) : (
              <Typography variant="body1" className={styles.empty}>
                Không có sản phẩm
              </Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
