/* eslint-disable react-hooks/rules-of-hooks */
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
  LinearProgress,
} from '@material-ui/core';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { tabsProductData, MAX_PRODUCT_QTY_DISPLAY } from 'constants/data';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchDollar, faStar } from '@fortawesome/free-solid-svg-icons';
import {
  InputProduct,
  MinusButton,
  PlusButton,
  Button as CustomButton,
  LinkComp,
} from 'components/atoms';
import {
  MultiImageBox,
  TagType,
  ProductDetailTabs,
  SellerInfo,
  CountdownTimerDetail,
} from 'components/mocules';
import { LoadingScreen, ErrorQuantityCartModal } from 'components/organisms';
import Template from 'components/layout/Template';
import useModal from 'hooks/useModal';
import { getFirst, isValid } from 'clients';
import { ProductService, doWithServerSide, SupplierService } from 'services';
import { useCart, useAuth } from 'context';
import debounce from 'utils/debounce';
import { TERMS_URL, INGREDIENT, MANUFACTURERS, CATEGORIES, PRODUCTS_URL } from 'constants/Paths';
import { DOMAIN_SELLER_CENTER } from 'sysconfig';
import { NotifyUtils, calculateTimeLeft, formatDate } from 'utils';
import Router from 'next/router';
import { withLogin } from 'HOC';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [productRes, supplier] = await Promise.all([
      ProductService.loadDataProductDetail({ ctx }),
      SupplierService.getInfoSupplier({ ctx }),
    ]);
    return {
      props: {
        product: getFirst(productRes),
        supplier,
      },
    };
  });
}

const ProductDetail = ({ product, supplier = [], isMobile }) => {
  if (!product) {
    NotifyUtils.error(
      'Không tìm thấy sản phẩm. Hãy liên hệ chúng tôi để hỏi thêm về sản phẩm này.',
    );
    Router.push(PRODUCTS_URL);
    return <LoadingScreen />;
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState('1');

  const { updateCartItem, removeCartItem } = useCart();
  const [isShowModalErrorQuantity, toggleErrorQuantity] = useModal();
  const { toggleLogin, isAuthenticated } = useAuth();

  const {
    name,
    salePrice,
    unit,
    volume,
    ingredient = [],
    category,
    tags,
    maxQuantity: prdMaxQuantity,
    seller,
    manufacturer,
    countryOfManufacture,
    isDeal,
    deal,
  } = product;

  const maxQuantity = isDeal && deal ? deal.maxQuantity : prdMaxQuantity;
  const amountRemaining = formatNumber(maxQuantity - (deal?.quantity || 0));
  const outOfStock = deal?.maxQuantity === (deal?.quantity || 0) || false;
  const timeLeft = calculateTimeLeft(deal?.startTime) || {};
  const dealReady = Object.keys(timeLeft).length === 0 || false;
  const startDate = formatDate(deal?.startTime) || null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [quantity, setQuantity] = useState(product.quantity || 0);
  const updateCart = async (q) => {
    if (!q) {
      return;
    }
    const response = await updateCartItem({ product, q: parseFloat(q) }, true);
    if (isValid(response)) {
      setQuantity(q);
    } else if (response.errorCode === 'CART_MAX_QUANTITY') {
      const { qty = maxQuantity } = getFirst(response, {});
      updateCart(qty);
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

  // TODO:
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handler = useCallback(
    debounce((val, updateType) => handleCart(val, updateType), 300),
    [],
  );

  const title = `${name} – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn`;

  const yearNumber = new Date().getFullYear() - supplier.yearFounded;

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    const val = e.currentTarget.value;

    if (/^\d+$/.test(val) || !val) {
      const curValue = Math.min(parseFloat(val || 0), prdMaxQuantity);

      setQuantity(curValue);
      if (!curValue || curValue === 0) {
        if (curValue === 0) return;
        handler(product, 'remove');
      } else {
        handler(+curValue, 'update');
      }
    }
  };

  const renderCondition = () => {
    const percentDealSold = (deal.quantity / deal.maxQuantity) * 100;
    const soldOutCondition = deal.maxQuantity - deal.quantity === 0;
    if (!dealReady) {
      return 'Sắp mở bán';
    }
    if (percentDealSold < 50) {
      return `Đã bán ${deal.quantity}`;
    }
    if (soldOutCondition) {
      return <span className={styles.out_stock}>Đã hết hàng</span>;
    }
    return <span className={styles.out_stock}>Sắp hết hàng</span>;
  };

  const open = Boolean(anchorEl);
  const id = open ? 'detail-product-popover' : undefined;

  const ingredientEle =
    ingredient &&
    ingredient.map((row) => (
      <TableRow key={uuidv4()}>
        <TableCell className={styles.border_right} component="th" scope="row">
          <LinkComp className={styles.text_capitalize} href={`${INGREDIENT}/${row.slug}`}>
            {row.name}
          </LinkComp>
        </TableCell>
        <TableCell align="left">{row.volume}</TableCell>
      </TableRow>
    ));

  return (
    <Template title={title} isMobile={isMobile} pageTitle={name} product={product}>
      <div className={styles.detail_wrapper}>
        <div className={styles.container}>
          <Grid container className={styles.detail_card}>
            <Grid className={styles.image_gallery} sm={12} md={4} item>
              <MultiImageBox images={product.imagesProxy} />
              <small className={styles.text_muted}>
                * Hình sản phẩm có thể thay đổi theo thời gian
              </small>
            </Grid>
            <Grid sm={12} md={8} item>
              <Grid container>
                <Grid xs={12} item>
                  <h1 className={styles.product_name}>{isDeal && deal ? deal.name : name}</h1>
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
                      {/* <span className={styles.mr_3}>
                        <i className="far fa-eye" />
                        <strong>4736</strong> lượt xem
                      </span>
                      <span>
                        <i className={`icomoon icon-shopping + ${styles.mr_1}`} />
                        <strong>2368</strong> lượt mua trong 24 giờ qua
                      </span> */}
                    </small>
                  </div>
                  <hr className={styles.divider} />
                  {isAuthenticated ? (
                    <>
                      <div className={styles.price_info}>
                        <div className={styles.product_price_group}>
                          <span className={styles.product_price}>
                            {isDeal && deal && deal.dealType === 'DEAL' ? (
                              <>
                                <span className={styles.deal_price}>
                                  {formatCurrency(deal?.price)}
                                </span>
                                <span className={styles.old_price}>
                                  {formatCurrency(product.salePrice)}
                                </span>
                              </>
                            ) : (
                              <span className={styles.deal_price}>{formatCurrency(salePrice)}</span>
                            )}
                            {isMobile && maxQuantity && maxQuantity < MAX_PRODUCT_QTY_DISPLAY ? (
                              <Typography className={styles.text_danger}>
                                Đặt tối đa {amountRemaining} sản phẩm
                              </Typography>
                            ) : null}
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
                          <p className={styles.popover_header}>Giá bán tham khảo ...</p>
                          <TableContainer classes={{ root: styles.table }} component={Paper}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  {/* <TableCell className={styles.border_right}>Tên</TableCell>
                                  <TableCell align="left">Hàm lượng</TableCell> */}
                                </TableRow>
                              </TableHead>
                              {/* <TableBody>{ingredientEle}</TableBody> */}
                            </Table>
                          </TableContainer>
                        </Popover>
                      </div>
                      {isDeal && deal && (
                        <div className={styles.deal_section}>
                          {dealReady ? (
                            <CountdownTimerDetail
                              className={styles.count_down}
                              dealEndDay={deal.endTime}
                            />
                          ) : (
                            startDate && <div className={styles.startDate}>{startDate}</div>
                          )}
                          <div className={styles.process_wrapper}>
                            <Typography className={styles.process_content}>
                              {renderCondition()}
                            </Typography>
                            <LinearProgress
                              classes={{
                                root: styles.root_process,
                                barColorPrimary: styles.blur_background,
                                colorPrimary: styles.bar_background,
                              }}
                              variant="determinate"
                              value={(deal.quantity / deal.maxQuantity) * 100}
                            />
                          </div>
                        </div>
                      )}
                      <>
                        {!isMobile && maxQuantity && maxQuantity < MAX_PRODUCT_QTY_DISPLAY ? (
                          <Typography className={styles.text_danger}>
                            Đặt tối đa {amountRemaining} sản phẩm
                          </Typography>
                        ) : null}
                      </>
                      {!isMobile && isDeal ? (
                        <div className={styles.product_action}>
                          <MinusButton
                            disabled={outOfStock || !dealReady}
                            className={styles.minus}
                            onClick={handleDecrease}
                          />
                          <InputProduct
                            product={product}
                            id={product.sku}
                            className={styles.input_product}
                            onChange={handleInputChange}
                            value={quantity}
                            disabled={outOfStock || !dealReady}
                          />
                          <PlusButton
                            disabled={
                              !dealReady || outOfStock || (maxQuantity && quantity >= maxQuantity)
                            }
                            className={styles.plus}
                            onClick={() => handleIncrease()}
                          />
                        </div>
                      ) : (
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
                      )}
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
                      <a className={styles.ml_1} data-modal="true" href={TERMS_URL}>
                        Điều Khoản Sử Dụng
                      </a>
                    </p>
                    {seller && (
                      <>
                        <SellerInfo seller={seller} />
                        <div className={styles.supplierInfo}>
                          {!Number.isNaN(yearNumber) && (
                            <div className={styles.supplierYearWrap}>
                              <div className={styles.supplierYear}>
                                <span className={styles.activePeriodYear}>
                                  {yearNumber > 1 ? `${yearNumber}+` : yearNumber}
                                </span>
                                <br />
                                năm
                              </div>
                              <span>Hợp tác cùng thuocsi.vn</span>
                            </div>
                          )}

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
                        </div>
                      </>
                    )}
                    <hr className={styles.divider} />
                    <div className={styles.subscribe_section}>
                      Đăng ký bán hàng cùng thuocsi.vn
                      <Button
                        className={styles.subscribe_btn}
                        href={DOMAIN_SELLER_CENTER}
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
                {manufacturer ? (
                  <div>
                    <a
                      className={styles.text_capitalize}
                      href={`${MANUFACTURERS}/${manufacturer.slug}}`}
                    >
                      {manufacturer.name}
                    </a>
                  </div>
                ) : null}
              </div>

              <div className={styles.mb_3}>
                <div className={styles.product_info_label}>Nước sản xuất</div>
                {countryOfManufacture ? (
                  <div>
                    <a
                      className={styles.text_capitalize}
                      href={`${MANUFACTURERS}/${manufacturer.slug}}`}
                    >
                      {countryOfManufacture.name}
                    </a>
                  </div>
                ) : null}
              </div>

              <div className={styles.mb_3}>
                <div className={styles.product_info_label}>Nhóm thuốc</div>
                {category &&
                  category.map((item) => (
                    <LinkComp
                      key={uuidv4()}
                      className={styles.text_capitalize}
                      href={`${CATEGORIES}/${item.slug}`}
                    >
                      {item.name}
                    </LinkComp>
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
            <Grid className={styles.gridTab} item md={9}>
              <ProductDetailTabs
                handleChange={handleChangeTab}
                data={tabsProductData}
                product={product}
                value={tabValue}
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
};

export default withLogin(ProductDetail, false);
