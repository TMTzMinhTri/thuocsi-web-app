import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Template,
  NavBar,
  Header,
} from 'components';

import styles from './styles.module.css';

export default function AboutUs(props) {
  const { mostResearched = [] } = props;
  const title = 'Thuocsi.vn';

  return (
    <Template title={title}>
      <Header {...props} />
      <NavBar mostResearched={mostResearched} />
      <div className={styles.wrapper}>
        <Grid alignItems="center" spacing={4} container>
          <Grid style={{ margin: '50px 0' }} md={6} xs={12} item>
            <img className={styles.img} src="/images/about_us/ab-1.jpg" alt="About us 01" />
          </Grid>
          <Grid md={6} xs={12} item>
            <h2 className={styles.title}>Giới thiệu về thuocsi</h2>
            <p className={styles.fs18}>
              thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong
              lĩnh vực công nghệ về y tế
            </p>
            <p className={styles.fs18}>
              Hiện tại là cổng điện tử cung cấp thuốc cho hơn 1.000 nhà thuốc và phòng khám trên
              khắp Việt Nam.
            </p>
            <p className={styles.fs18}>
              Là một trong những nơi làm việc thu hút các tài năng trẻ với đam mê ứng dụng công nghệ
              4.0 vào nền Y Tế.
            </p>
          </Grid>
        </Grid>
        <Grid style={{ margin: '50px 0' }} alignItems="center" spacing={4} container>
          <Grid md={6} xs={12} item>
            <h2 className={styles.title}>Mục tiêu của chúng tôi</h2>
            <p className={styles.fs18}>
              Trong tương lai, thuocsi.vn hướng đến không những giúp phát triển hệ thống Y tế tại
              Việt Nam mà còn là nền tảng hiện đại hóa các kênh phân phối truyền thống.
            </p>
            <p className={styles.fs18}>
              Trong chuỗi phân phối hiện tại, có khá nhiều doanh nghiệp, cá nhân và tổ chức khác
              nhau tham gia.
            </p>
            <p className={styles.fs18}>
              Với tầm nhìn này, chúng tôi dần thay đổi các kênh phân phối lâu đời, giúp nâng cao
              chất lượng y tế đến mọi vùng miền nhằm duy trì chất lượng cuộc sống.
            </p>
          </Grid>
          <Grid md={6} xs={12} item>
            <img className={styles.img} src="/images/about_us/ab-2.jpg" alt="About us 01" />
          </Grid>
        </Grid>
        <Grid style={{ margin: '50px 0' }} alignItems="center" spacing={4} container>
          <Grid md={6} xs={12} item>
            <img className={styles.img} src="/images/about_us/ab-3.jpg" alt="About us 01" />
          </Grid>
          <Grid md={6} xs={12} item>
            <h2 className={styles.title}>Sứ mệnh</h2>
            <p className={styles.fs18}>
              Ứng dụng công nghệ tối đa để cho ra mô hình giải quyết các vấn đề Y Tế một cách nhanh
              chóng hiệu quả và chất lượng cao.
            </p>
          </Grid>
        </Grid>
      </div>
    </Template>
  );
}
