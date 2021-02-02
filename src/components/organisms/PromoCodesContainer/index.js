import Link from 'next/link';
import { Typography, Grid, Container, useMediaQuery } from '@material-ui/core';
import { CouponCard } from 'components/mocules';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const PromoCodesContainer = ({ promos = [] }) => {
  const maxWidth3Card = useMediaQuery('(max-width:873px)');
  return (
    <div className={styles.root}>
      <Container maxWidth="lg" className={styles.container}>
        <Typography variant="h4" style={{ fontWeight: '500' }}>
          Mã giảm giá
        </Typography>
        <p> Hướng dẫn sử dụng:</p>
        <ol>
          <li>
            <strong>Đặt hàng </strong>: Vào trang&nbsp;
            <Link href="/quick-order">Đặt hàng nhanh </Link>
            &nbsp;hoặc&nbsp;
            <Link href="/products"> Sản phẩm</Link>
            &nbsp;để đặt hàng
          </li>
          <li>
            <strong>Vào giỏ hàng</strong>: Vào trang&nbsp;
            <Link href="/cart">Giỏ hàng </Link>. Nhấn vào chữ "Dùng mã khuyến mãi"
          </li>
          <li>
            <strong>Dùng mã</strong>: Nhập mã muốn dùng vào ô tìm kiếm, hoặc, chọn trong danh sách
            mã. Rồi nhấn vào nút "Dùng ngay"
          </li>
        </ol>

        <div className={styles.title}>
          <Typography variant="h4" style={{ fontWeight: '500' }}>
            Dành riêng cho bạn
          </Typography>
          <p className={styles.description}>
            Tham gia chương trình&nbsp;
            <Link href="/users/referrals">Giới thiệu bạn bè</Link>
            ,&nbsp;
            <Link href="/users/loyalty_points">Đổi điểm tích luỹ</Link>
            &nbsp;để nhận được code riêng
          </p>

          {promos.length !== 0 ? (
            <Grid container spacing={4}>
              {promos.map((promo) => (
                <Grid key={uuidv4()} item xs={maxWidth3Card ? 6 : 4}>
                  <CouponCard {...promo} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <p className={styles.promo_not_yet}>Chưa có mã</p>
          )}
        </div>
      </Container>
      <div className={styles.promo_special}>
        <h1> Mã giảm giá đặc biệt </h1>
        <div> Chưa có mã</div>
      </div>
      <Container maxWidth="lg" className={styles.container}>
        <h1 className={styles.title}> Các mã khác </h1>
        {promos.length !== 0 ? (
          <Grid container spacing={4}>
            {promos.map((promo) => (
              <Grid key={uuidv4()} item xs={maxWidth3Card ? 6 : 4}>
                <CouponCard {...promo} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p className={styles.promo_not_yet}>Chưa có mã</p>
        )}
      </Container>
    </div>
  );
};

export default PromoCodesContainer;
