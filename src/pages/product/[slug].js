import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tab,
  Button,
  IconButton,
  Popover,
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useAuth } from 'context';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import { MultiImageBox, InputProduct, MinusButton, PlusButton, TagType } from 'components';
import { ProductClient } from 'clients';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  const [products] = await Promise.all([ProductClient.loadDataProductDetail(ctx)]);
  return {
    props: {
      products,
    },
  };
}

export default function ProductDetail({ products }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { name, unit, volume, description, ingredient, madeBy, category, tags } = products[0];
  const [value, setValue] = React.useState('1');
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={styles.detail_wrapper}>
      <div className={styles.container}>
        <Grid container className={styles.detail_card}>
          <Grid className={styles.image_gallery} sm={12} md={4} item>
            <MultiImageBox images={products[0].imageUrls} />
            <small className={styles.text_muted}>
              * Hình sản phẩm có thể thay đổi theo thời gian
            </small>
          </Grid>
          <Grid sm={12} md={8} item>
            <Grid container>
              <Grid xs={12} item>
                <h1 className={styles.product_name}>{name}</h1>
                <div className={styles.product_tags}>
                  {tags.map((item) => (
                    <TagType key={uuidv4()} type={item.slug} />
                  ))}
                </div>
              </Grid>
              <Grid className={styles.product_content_wrap} md={7} item>
                <div className={styles.mb_3}>
                  <small className={styles.text_muted}>
                    {unit} {volume}
                  </small>
                </div>
                <div className={styles.mb_3}>
                  <small className={styles.text_muted}>
                    <span className={styles.mr_3}>
                      <i className="far fa-eye" />
                      <strong>4736</strong> lượt xem
                    </span>
                    <span>
                      <i className={`icomoon icon-shopping + ${styles.mr_1}`} />
                      <strong>2368</strong> lượt mua trong 24 giờ qua
                    </span>
                  </small>
                </div>
                <hr className={styles.divider} />
                <div className={styles.price_info}>
                  <div className={styles.product_price_group}>
                    <span className={styles.product_price}>44.000</span>
                  </div>
                  <IconButton onClick={handleClick} aria-label="close">
                    <FontAwesomeIcon icon={faSearchDollar} />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <p className={styles.popover_header}>
                      Giá bán tham khảo
                    </p>
                    <TableContainer classes={{ root: styles.table }} component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell className={styles.border_right}>Tên</TableCell>
                            <TableCell align="left">Hàm lượng</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {ingredient.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell className={styles.border_right} component="th" scope="row">
                                <a className={styles.text_capitalize} href="/">
                                  {row.name}
                                </a>
                              </TableCell>
                              <TableCell align="left">{row.unit}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Popover>
                </div>
                <div className={styles.product_action}>
                  <MinusButton className={styles.minus} />
                  <InputProduct className={styles.input_product} />
                  <PlusButton className={styles.plus} />
                </div>
              </Grid>
              <Grid className={styles.product_content_wrap} item md={5}>
                <div className={styles.product_suppliers}>
                  <p>
                    Hệ thống sẽ chọn nhà cung cấp tốt nhất cho bạn.
                    <a className={styles.ml_1} data-modal="true" href="/terms-and-condition">
                      Điều Khoản Sử Dụng
                    </a>
                  </p>
                  <hr className={styles.divider} />
                  <div className={styles.subscribe_section}>
                    Đăng ký bán hàng cùng thuocsi.vn
                    <Button
                      className={styles.subscribe_btn}
                      href="https://sc-stg.thuocsi.vn"
                      // target="_blank"
                      title="Đăng ký bán hàng cùng thuocsi"
                    >
                      Đăng ký
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Product Description */}
        <Grid container>
          <Grid className={styles.manufacturer} md={3} item>
            <div className={styles.mb_3}>
              <div className={styles.product_info_label}>Nhà sản xuất</div>
              <div>
                <a
                  className={styles.text_capitalize}
                  href="/manufacturers/cong-ty-duoc-pham-glaxosmithkline-gsk"
                >
                  {madeBy}
                </a>
              </div>
            </div>

            <div className={styles.mb_3}>
              <div className={styles.product_info_label}>Nhóm thuốc</div>
              {category.map((item) => (
                <a
                  key={uuidv4()}
                  className={styles.text_capitalize}
                  href="/categories/giam-dau-ha-sot"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className={styles.mb_3}>
              <div className={styles.product_info_label}>Thành phần</div>
              <TableContainer classes={{ root: styles.table }} component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.border_right}>Tên</TableCell>
                      <TableCell align="left">Hàm lượng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ingredient.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell className={styles.border_right} component="th" scope="row">
                          <a className={styles.text_capitalize} href="/">
                            {row.name}
                          </a>
                        </TableCell>
                        <TableCell align="left">{row.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
          <Grid item md={9}>
            <div className={styles.root}>
              <TabContext value={value}>
                <div>
                  <TabList
                    TabIndicatorProps={{ className: styles.indicator }}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab classes={{ root: styles.tab }} label="Thông tin chung" value="1" />
                    <Tab classes={{ root: styles.tab }} label="Chỉ định" value="2" />
                    <Tab classes={{ root: styles.tab }} label="Liều lượng - Cách dùng" value="3" />
                    <Tab classes={{ root: styles.tab }} label="Chống chỉ định" value="4" />
                    <Tab classes={{ root: styles.tab }} label="Tương tác thuốc" value="5" />
                    <Tab classes={{ root: styles.tab }} label="Bảo quản" value="6" />
                    <Tab classes={{ root: styles.tab }} label="Quá liều" value="7" />
                  </TabList>
                </div>
                <TabPanel value="1">{description}</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
