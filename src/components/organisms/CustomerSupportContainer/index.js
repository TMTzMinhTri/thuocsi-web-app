import { Paper, Grid, Divider } from '@material-ui/core';
import Link from 'next/link';
import {
  ABOUT_US_URL,
  PRIVACY_POLICY_URL,
  GENERAL_POLICY_URL,
  CONDITIONS_OF_USE_URL,
  DISPUTE_RESOLUTION_URL,
  TERMS_URL,
  REGULATIONS_URL,
  CAREER,
  QNA,
  ORDER_GUIDE,
  LICENSE_PDF,
  LEGAL_IMAGE,
} from 'constants/Paths';
import styles from './styles.module.css';

const CustomerSupportContainer = () => (
  <Grid container className={styles.container}>
    <Grid item xs={12}>
      <h2>Hỗ trợ khách hàng </h2>
    </Grid>
    <Grid item xs={12}>
      <Paper style={{ padding: '16px' }} className={styles.paper}>
        <div>
          <Link href={ABOUT_US_URL} prefetch={false}>
            Giới thiệu về thuocsi.vn
          </Link>
        </div>
        <div>
          <Link href={CAREER} prefetch={false}>
            Tuyển dụng | Recruitment
          </Link>
        </div>
        <div>
          <Link href="/" prefetch={false}>
            Đăng ký bán hàng cùng thuocsi
          </Link>
        </div>
        <Divider />
        <div>
          <Link href={PRIVACY_POLICY_URL} prefetch={false}>
            Chính sách bảo mật
          </Link>
        </div>
        <div>
          <Link href={QNA} prefetch={false}>
            Câu hỏi thường gặp (Q&A)
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={GENERAL_POLICY_URL}>
            Chính sách quy định chung
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={CONDITIONS_OF_USE_URL}>
            Điều khoản sử dụng
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={DISPUTE_RESOLUTION_URL}>
            Cơ chế giải quyết tranh chấp
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={TERMS_URL}>
            Thỏa thuận về dịch vụ TMDT
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={ORDER_GUIDE}>
            Hướng dẫn đặt hàng
          </Link>
        </div>
        <div>
          <Link prefetch={false} href={REGULATIONS_URL}>
            Quy chế hoạt động
          </Link>
        </div>
      </Paper>
    </Grid>
    <Grid item xs={12}>
      <h2>Thông tin doanh nghiệp </h2>
    </Grid>
    <Grid item xs={12}>
      <Paper style={{ padding: '16px' }} className={styles.paper}>
        <div>
          <Link prefetch={false} href="/">
            thuocsi.vn
          </Link>
          là website thuộc sở hữu của công ty TNHH Buymed.
        </div>
        <br />
        <div>
          <strong> Công Ty TNHH Buymed </strong>
        </div>
        <div>
          Địa chỉ: <strong> 248A Nơ Trang Long, Phuờng 12, Quận Bình Thạnh, Hồ Chí Minh </strong>
        </div>
        <div>
          Số chứng nhận đăng ký kinh doanh: <strong> 0314758651, cấp ngày 29/11/2017, </strong>
        </div>
        <div>tại Sở Kế Hoạch Và Đầu Tư Thành Phố Hồ Chí Minh</div>
        <div>
          Số Giấy phép Sàn thương mại điện tử:
          <Link prefetch={false} href={LICENSE_PDF}>
            0314758651/KD-0368
          </Link>
        </div>
      </Paper>
    </Grid>
    <Grid>
      <img
        className={styles.img_legal}
        alt="Dấu đỏ của Bộ Công Thương"
        data-src={LEGAL_IMAGE}
        src={LEGAL_IMAGE}
        title="Dấu đỏ của Bộ Công Thương"
        data-loaded="true"
      />
    </Grid>
  </Grid>
);

export default CustomerSupportContainer;
