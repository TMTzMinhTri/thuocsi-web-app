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

import { SORT_PRODUCT } from '../../../constants/data';
import ProductCardVertical from '../ProductCardVertical';
import styles from './style.module.css';

export default function ProductListing({
  products = [],
  brand = [],
  group = [],
  current_tab = '',
  page = '',
  sort = '',
  slug = '',
  catName = '',
}) {
  const [isloading, setIsLoading] = useState(true);
  const [numPage, setNumPage] = useState(page);
  const count = 50;
  const pageSize = 20;
  const pages = Math.ceil(count / pageSize);
  const router = useRouter();
  const pathName = `/${catName}/${slug}`;

  useEffect(() => {
    setIsLoading(false);
  }, [isloading]);

  const handleChangePage = (event, value) => {
    if (page === value) return;
    setIsLoading(true);
    router.push({
      pathname: pathName,
      query: { page: value, current_tab, sort },
    });
    setNumPage(value);
  };
  const handleChangeSort = (event) => {
    setIsLoading(true);
    router.push({
      pathname: pathName,
      query: { slug, current_tab, sort: event.target.value || undefined },
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
                  name: 'sort',
                  id: 'sort-product',
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
                {group &&
                  group.length > 0 &&
                  group.map((item) => (
                    <Link key={item.value} href={item.value}>
                      <div
                        className={`${styles.accordionLink} ${
                          item.value === pathName ? styles.active : ''
                        }`}
                      >
                        {item.label}
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
                {brand &&
                  brand.length > 0 &&
                  brand.map((item) => (
                    <Link key={item.value} href={item.value}>
                      <div
                        className={`${styles.accordionLink} ${
                          item.value === pathName ? styles.active : ''
                        }`}
                      >
                        {item.label}
                      </div>
                    </Link>
                  ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className={styles.product_main}>
        {isloading ?
          <GridSkeletonProductHorizontal counts={12} /> : (
            <>
              <div>
                <Typography className="product_title" variant="h4" component="h1">
                  Kháng Viêm, Dị Ứng
                </Typography>
                <SearchResultText count={count} pageSize={pageSize} page={page} pages={pages} />
              </div>
              <div>
                <div className={styles.filters}>
                  <Fab
                    variant="extended"
                    aria-label="add"
                    className={clsx(styles.active, styles.filter_btn)}
                  >
                    Tất cả
                  </Fab>
                  <Fab variant="extended" aria-label="add" className={styles.filter_btn}>
                    <Link
                      href={{
                        pathname: pathName,
                        query: { current_tab: 'new_arrival', sort },
                      }}
                    >
                      SP mới
                    </Link>
                  </Fab>
                  <Fab variant="extended" aria-label="add" className={styles.filter_btn}>
                    <Link
                      href={{
                        pathname: pathName,
                        query: { current_tab: 'decreasing_price', sort },
                      }}
                    >
                      Giảm giá
                    </Link>
                  </Fab>
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
                  Ko có sản phẩm
                </Typography>
              )}
            </>
          )}
      </div>
    </div>
  );
}
