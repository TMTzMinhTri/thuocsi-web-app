import React, { useState, useCallback } from 'react';
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Popover,
  Typography,
} from '@material-ui/core';
import FormarCurrency from 'utils/FormarCurrency';
import { tabsProductData } from 'constants/data';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import {
  MultiImageBox,
  InputProduct,
  MinusButton,
  PlusButton,
  TagType,
  ProductDetailTabs,
  Button as CustomButton,
  Template,
} from 'components';
import useModal from 'hooks/useModal';
import { ProductClient, doWithServerSide } from 'clients';
import { useCart, useAuth } from 'context';
import debounce from 'utils/debounce';
import ErrorQuantityCartModal from 'components/organisms/ErrorQuantityCartModal';

import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const product = await ProductClient.loadDataProductDetail(ctx);
    return {
      props: {
        product: product.data && product.data[0] ? product.data[0] : [],
      },
    };
  });
}

export default function ProductDetail({ product }) {
  const title = `${product.name} – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn`;
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    name,
    price,
    unit,
    volume,
    ingredient = [],
    madeBy,
    category,
    tags,
    maxQuantity,
  } = product;
  const [value, setValue] = React.useState('1');
  const [quantity, setQuantity] = useState(product.quantity || 0);
  const { updateCartItem, removeCartItem } = useCart();
  const [isShowModalErrorQuantity, toggleErrorQuantity] = useModal();

  const { toggleLogin, isAuthenticated } = useAuth();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateCart = async (q) => {
    const response = await updateCartItem({ product, q });
    if (response.status === 'OK') {
      setQuantity(q);
    }
    if (response.errorCode === 'CART_MAXQUANTITY') {
      setQuantity(product.maxQuantity);
    }
  };

  const handleCart = (val, updateType) => {
    if (updateType === 'remove') {
      removeCartItem(val);
      setQuantity(0);
    }
    if (updateType === 'update') {
      updateCart(val);
    }
  };

  const handler = useCallback(
    debounce((val, updateType) => handleCart(val, updateType), 500),
    [],
  );

  const handleDecrease = () => {
    const q = quantity - 1;
    if (q < 0) return;
    setQuantity(q);
    if (q === 0) {
      handler(product, 'remove');
    } else {
      handler(q, 'update');
    }
  };

  const handleIncrease = () => {
    const q = quantity + 1;
    setQuantity(q);
    handler(q, 'update');
  };

  const handleInputChange = (e) => {
    if (/^\d+$/.test(e.currentTarget.value) || !e.currentTarget.value) {
      const curValue = e.currentTarget.value;
      setValue(curValue);
      if (!curValue || curValue === 0) {
        if (quantity === 0) return;
        handler(product, 'remove');
      } else {
        handler(+curValue, 'update');
      }
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'detail-product-popover' : undefined;

  const ingredientEle =
    ingredient &&
    ingredient.map((row) => (
      <TableRow key={row.name}>
        <TableCell className={styles.border_right} component="th" scope="row">
          <a className={styles.text_capitalize} href="/">
            {row.name}
          </a>
        </TableCell>
        <TableCell align="left">{row.unit}</TableCell>
      </TableRow>
    ));

  return (
    <Template title={title}>
      <div className={styles.detail_wrapper}>
        <div className={styles.container}>
          <Grid container className={styles.detail_card}>
            <Grid className={styles.image_gallery} sm={12} md={4} item>
              <MultiImageBox images={product.imageUrls} />
              <small className={styles.text_muted}>
                * Hình sản phẩm có thể thay đổi theo thời gian
              </small>
            </Grid>
            <Grid sm={12} md={8} item>
              <Grid container>
                <Grid xs={12} item>
                  <h1 className={styles.product_name}>{name}</h1>
                  <div className={styles.product_tags}>
                    {tags && tags.map((item) => <TagType key={uuidv4()} item={item} />)}
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
                  {isAuthenticated ? (
                    <>
                      <div className={styles.price_info}>
                        <div className={styles.product_price_group}>
                          <span className={styles.product_price}>
                            {price && FormarCurrency(price)}
                          </span>
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
                          <p className={styles.popover_header}>Giá bán tham khảo</p>
                          <TableContainer classes={{ root: styles.table }} component={Paper}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell className={styles.border_right}>Tên</TableCell>
                                  <TableCell align="left">Hàm lượng</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>{ingredientEle}</TableBody>
                            </Table>
                          </TableContainer>
                        </Popover>
                      </div>
                      {maxQuantity && maxQuantity > 0 && (
                        <Typography className={styles.text_danger}>
                          Đặt tối đa {maxQuantity} sản phẩm
                        </Typography>
                      )}
                      <div className={styles.product_action}>
                        <MinusButton className={styles.minus} onClick={handleDecrease} />
                        <InputProduct
                          product={product}
                          id={product.sku}
                          className={styles.input_product}
                          onChange={handleInputChange}
                          value={quantity}
                        />
                        <PlusButton
                          disabled={maxQuantity && quantity >= maxQuantity}
                          className={styles.plus}
                          onClick={() => handleIncrease()}
                        />
                      </div>
                    </>
                  ) : (
                    <CustomButton
                      backgroundColor="#e1a006"
                      className={styles.signin_btn}
                      onClick={toggleLogin}
                    >
                      Đăng nhập để xem giá
                    </CustomButton>
                  )}
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
                {category &&
                  category.map((item) => (
                    <a
                      key={uuidv4()}
                      className={styles.text_capitalize}
                      href={`/categories/${item.slug}`}
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
                    <TableBody>{ingredientEle}</TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
            <Grid item md={9}>
              <ProductDetailTabs
                handleChange={handleChange}
                data={tabsProductData}
                product={product}
                value={value}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <ErrorQuantityCartModal
        product={product}
        visible={isShowModalErrorQuantity}
        onClose={toggleErrorQuantity}
      />
    </Template>
  );
}
