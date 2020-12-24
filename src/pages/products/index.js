import React from 'react';
import { Template, NavBar, Header } from 'components';
import { NativeSelect, FormControl } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Pagination from '@material-ui/lab/Pagination';
import Link from 'next/link';
import clsx from 'clsx';
import ProductClient from 'clients/ProductClient';
import ProductCardVertical from '../../components/organisms/ProductCardVertical';
import styles from './style.module.css';

export async function getServerSideProps(ctx) {
  const [products] = await Promise.all([ProductClient.loadDataProduct(ctx)]);
  return {
    props: {
      products,
    },
  };
}

export default function Cart({ mostResearched = [], products = [] }) {
  const title = 'Tất cả sản phẩm – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  return (
    <Template title={title}>
      <Header />
      <NavBar mostResearched={mostResearched} />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div className={styles.headTitle}>
            <Icon className="icon-tune" color="inherit" fontSize="default" />
            <div>BỘ LỌC TÌM KIẾM</div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.sort}>
            <div className={styles.headSort}>
              Sắp xếp
            </div>
            <div className={styles.select}>
              <FormControl className={styles.formControl}>
                <NativeSelect
                  className={styles.selectInput}
                  inputProps={{
                    name: 'sort',
                    id: 'sort-native-helper',
                    placeholder: 'sắp xếp',
                  }}
                  IconComponent={() => <ExpandMoreIcon className={styles.selectIcon} />}
                >
                  <option value={10}>Sản phẩm mới</option>
                  <option value={20}>Bán chạy nhất</option>
                  <option value={30}>Phù hợp nhất</option>
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
                  <Link href="/#">
                    <div className={clsx(styles.accordionLink, styles.active)}>Tất cả sản phẩm</div>
                  </Link>
                  <Link href="/#">
                    <div className={styles.accordionLink}>Cơ xương khớp</div>
                  </Link>
                  <Link href="/#">
                    <div className={styles.accordionLink}>Da liễu</div>
                  </Link>
                  <Link href="/#">
                    <div className={styles.accordionLink}>Đông y</div>
                  </Link>
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
                  <Link href="/#">
                    <div className={styles.accordionLink}>Tất cả sản phẩm</div>
                  </Link>
                  <Link href="/#">
                    <div className={styles.accordionLink}>Cơ xương khớp</div>
                  </Link>
                  <Link href="/#">
                    <div className={styles.accordionLink}>Da liễu</div>
                  </Link>
                  <Link href="/#">
                    <div className={styles.accordionLink}>Đông y</div>
                  </Link>
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
              <Fab
                variant="extended"
                aria-label="add"
                className={styles.filter_btn}
              >
                SP mới
              </Fab>
              <Fab
                variant="extended"
                aria-label="add"
                className={styles.filter_btn}
              >
                Giảm giá
              </Fab>
              <Fab
                variant="extended"
                aria-label="add"
                className={styles.filter_btn}
              >
                Hoá đơn nhanh
              </Fab>
            </div>
          </div>
          {products.length > 0 && products.status === 'OK' && products.map((item) => (
            <main className={styles.product_listing}>

              <div className={styles.pagging}>
                <Pagination count={10} />
              </div>
              <div className={styles.product_grid}>

                <ProductCardVertical
                  key={`products-${item.sku}`}
                  product={item}
                  value={item.quantity || 0}
                  tag
                  category
                />
              </div>
              <div className={styles.pagging}>
                <Pagination count={10} />
              </div>

            </main>
          ))}
        </div>
      </div>
    </Template>
  );
}
