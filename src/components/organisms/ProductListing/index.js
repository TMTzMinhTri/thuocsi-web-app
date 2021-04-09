/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import {
  NativeSelect,
  FormControl,
  Icon,
  Typography,
  Fab,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { useModal } from 'hooks';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Pagination } from '@material-ui/lab';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'components/atoms';
import { SearchResultText } from 'components/mocules';
import { SORT_PRODUCT, SORT_PRODUCT_NOT_LOGIN, PAGE_SIZE_30 } from 'constants/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTag } from '@fortawesome/free-solid-svg-icons';
import FilterProductOnMobile from 'components/organisms/FilterProductOnMobile';
import Skeleton from '@material-ui/lab/Skeleton';
import GridSkeletonProductHorizontal from '../Skeleton/GirdSkeleton';
import ProductCardVertical from '../ProductCardVertical';

import styles from './style.module.css';

export default function ProductListing({
  products = [],
  brand = [],
  group = [],
  currentTab = '',
  page,
  sortBy = '',
  slug = '',
  catName = '',
  name = '',
  total,
  isAuthenticated = false,
  isMobile,
  tabs = [],
}) {
  const [isloading, setIsLoading] = useState(true);
  const pages = Math.ceil(total / PAGE_SIZE_30);
  const router = useRouter();
  const pathName = `/${catName}/${slug}`;
  const [open, toggleOpenFilter] = useModal();
  const mainRef = useRef(null);
  const options = { scroll: false };

  const SORT_LIST = isAuthenticated ? SORT_PRODUCT : SORT_PRODUCT_NOT_LOGIN;

  useEffect(() => {
    setIsLoading(false);
  }, [page, sortBy, slug, currentTab, open]);

  const getQueryObject = () => {
    const query = {};
    if (currentTab) {
      query.currentTab = currentTab;
    }
    if (sortBy) {
      query.sortBy = sortBy;
    }
    return query;
  };

  const getTabQuery = (tab) => {
    const query = getQueryObject();
    if (!tab) {
      delete query.currentTab;
    }
    if (!sortBy) {
      delete query.sortBy;
    }
    return query;
  };
  const handleChangePage = (event, value) => {
    event.preventDefault();
    if (page === value) return;
    setIsLoading(true);
    window.scrollTo({
      top: mainRef.current.offsetTop - 100,
      behavior: 'smooth',
    });
    const query = getQueryObject();
    query.page = value;
    router.push(
      {
        pathname: pathName,
        query,
      },
      null,
      options,
    );
  };
  const handleChangeSort = (event) => {
    setIsLoading(true);
    const query = getQueryObject();
    query.sortBy = event.target.value || undefined;
    router.push(
      {
        pathname: pathName,
        query,
      },
      null,
      options,
    );
    window.scrollTo({
      top: mainRef.current.offsetTop - 100,
      behavior: 'smooth',
    });
  };

  const SelectedTagMobile = () => {
    const tabName = tabs.filter((item) => item.slug === currentTab);
    return (
      <div className={styles.tagsMobile}>
        <div className={styles.badgeGray}>
          <FontAwesomeIcon icon={faTag} /> {tabName.length > 0 ? tabName[0].name : 'Tất cả'}
        </div>
        <div className={styles.badgeGray}>{name}</div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <div className={styles.filterMobile}>
          <div className={styles.filterMobileBox}>
            <div className={styles.fRow}>
              <div className={styles.sortMobile}>
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
                      {SORT_LIST.map((item) => (
                        <option key={uuidv4()} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
              </div>
              <Button
                onClick={toggleOpenFilter}
                backgroundColor="#f9b514"
                className={styles.filterBtn}
              >
                <FontAwesomeIcon icon={faFilter} />
                <span className={styles.btnText}>Lọc</span>
              </Button>
            </div>
            <div className={styles.fRow}>
              <SelectedTagMobile />
            </div>
          </div>

          <FilterProductOnMobile
            open={open}
            handleClose={toggleOpenFilter}
            maxWidth="md"
            group={group}
            slug={slug}
            pathName={pathName}
            currentTab={currentTab}
            sortBy={sortBy}
            tabs={tabs}
            brand={brand}
          />
        </div>
      ) : (
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
                  {SORT_LIST.map((item) => (
                    <option key={uuidv4()} value={item.value}>
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
                <div>
                  <Link key="all-products" href="/products">
                    <div className={`${styles.accordionLink} ${slug === '' ? styles.active : ''}`}>
                      Tất cả sản phẩm
                    </div>
                  </Link>
                  {group &&
                    group.map((item) => (
                      <Link key={uuidv4()} href={`/categories/${item.slug}`}>
                        <div
                          className={`${styles.accordionLink} ${
                            item.slug === slug ? styles.active : ''
                          }`}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                </div>
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
                <div>
                  <Link key="all-products" href="/products" prefetch={false}>
                    <div className={styles.accordionLink}>Tất cả sản phẩm</div>
                  </Link>
                  {brand &&
                    brand.length > 0 &&
                    brand.map((item) => (
                      <Link key={uuidv4()} href={`/manufacturers/${item.slug}`} prefetch={false}>
                        <div
                          className={`${styles.accordionLink} ${
                            item.slug === slug ? styles.active : ''
                          }`}
                        >
                          {item.name}
                        </div>
                      </Link>
                    ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      )}

      <div ref={mainRef} className={styles.product_main}>
        <div>
          {name && (
            <Typography className="product_title" variant="h4" component="h1">
              {name}
            </Typography>
          )}
          {isloading ? (
            <Skeleton variant="text" width={300} />
          ) : (
            <SearchResultText total={total} page={page} pages={pages} limit={products?.length} />
          )}
        </div>
        {!isMobile && (
          <div>
            <div className={styles.filters}>
              {(total > 0 || tabs.length > 0) && (
                <Link
                  href={{
                    pathname: pathName,
                    query: { ...getTabQuery() },
                  }}
                  scroll={false}
                >
                  <Fab
                    variant="extended"
                    aria-label="all"
                    className={clsx(currentTab === '' && styles.active, styles.filter_btn)}
                  >
                    Tất cả sản phẩm
                  </Fab>
                </Link>
              )}
              {tabs.map((item) => (
                <Link
                  key={`tabs-${uuidv4()}`}
                  href={{
                    pathname: pathName,
                    query: { ...getTabQuery(), currentTab: item.value },
                  }}
                  scroll={false}
                >
                  <Fab
                    variant="extended"
                    aria-label="all"
                    className={clsx(currentTab === item.value && styles.active, styles.filter_btn)}
                  >
                    {item.leftIcon && <span className={styles.iconLeft}>{item.leftIcon}</span>}
                    {item.name}
                    {item.rightIcon && <span className={styles.iconRight}>{item.rightIcon}</span>}
                  </Fab>
                </Link>
              ))}
            </div>
          </div>
        )}
        <main className={styles.product_listing} key={uuidv4()}>
          {isloading ? (
            <GridSkeletonProductHorizontal counts={12} hasPagingTop hasPagingBottom />
          ) : (
            <>
              {products && products.length > 0 ? (
                <>
                  <div className={styles.pagging}>
                    <Pagination
                      count={pages}
                      defaultPage={page}
                      boundaryCount={isMobile ? 1 : 2}
                      siblingCount={isMobile ? 0 : 2}
                      onChange={handleChangePage}
                    />
                  </div>
                  <div className={styles.product_grid_wrapper}>
                    <Grid container spacing={1}>
                      {products.map((item) => (
                        <Grid
                          item
                          xl={2}
                          lg={3}
                          md={4}
                          xs={6}
                          className={styles.customGrid}
                          key={uuidv4()}
                        >
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
                      defaultPage={page}
                      boundaryCount={isMobile ? 1 : 2}
                      siblingCount={isMobile ? 0 : 2}
                      onChange={handleChangePage}
                    />
                  </div>
                </>
              ) : (
                <Typography variant="body1" className={styles.empty}>
                  Không có sản phẩm
                </Typography>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
