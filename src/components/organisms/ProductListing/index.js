/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
// eslint-disable-next-line operator-linebreak
// eslint-disable-next-line camelcase
import React from 'react';
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
import { SORT_PRODUCT } from '../../../constants/data';
import ProductCardVertical from '../ProductCardVertical';
import styles from './style.module.css';

export default function ProductListing({
  products = [],
  brands = [],
  group = [],
  current_tab = '',
  page = '',
  sort = '',
  slug = '',
  catName = '',
}) {
  const count = 100;
  const router = useRouter();
  const pathName = `/${catName}/${slug}`;

  const handleChangePage = (event, value) => {
    if (page === value) return;

    router.push({
      pathname: pathName,
      query: { page: value, current_tab, sort },
    });
  };
  const handleChangeSort = (event) => {
    router.push({
      pathname: pathName,
      query: { slug, current_tab, sort: event.target.value || undefined },
    });
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
                  group.map((item) => (
                    <Link key={item.value} href={item.value}>
                      <div className={styles.accordionLink}>{item.label}</div>
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
                {brands &&
                  brands.map((brand) => (
                    <Link key={brand.value} href={brand.value}>
                      <div className={styles.accordionLink}>{brand.label}</div>
                    </Link>
                  ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className={styles.product_main}>
        <div>
          <Typography className="product_title" variant="h2" component="h1">
            Kháng Viêm, Dị Ứng
          </Typography>
          <div className={styles.product_counts}>
            Hiển thị <strong>1 - 20</strong> trên tổng số <strong>507</strong> sản phẩm
          </div>
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
        {products.length > 0 && (
          <main className={styles.product_listing}>
            <div className={styles.pagging}>
              <Pagination
                count={count}
                size="large"
                boundaryCount={2}
                onChange={handleChangePage}
              />
            </div>
            <div className={styles.product_grid_wrapper}>
              <Grid container spacing={1}>
                {products.map((item) => (
                  <Grid item xl={2} lg={2} md={4} xs={6}>
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
                count={count}
                size="large"
                boundaryCount={2}
                onChange={handleChangePage}
              />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
