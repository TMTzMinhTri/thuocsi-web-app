import React from 'react';
import Template from 'components/layout/Template';
import LinkComp from 'components/atoms/LinkComp';

import { Container, Grid, Button } from '@material-ui/core';
import clsx from 'clsx';
import { NotifyService } from 'services';
import { DateTimeUtils } from 'utils';
import { withLogin } from 'HOC';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  const [listNotify] = await Promise.all([NotifyService.getListNotify({ ctx })]);
  return {
    props: {
      listNotify,
    },
  };
}

const Notifications = ({ props, isMobile }) => {
  const { read = true, listNotify = [] } = props;
  const title = 'Trang thông báo';
  const pageName = 'notification';

  return (
    <Template title={title} pageName={pageName} isMobile={isMobile}>
      <div className={styles.notifyWrap}>
        <Container className={styles.wrapper} maxWidth="lg">
          <Grid className={styles.notifyTitle} container>
            <h3>Thông Báo của tôi</h3>
            <Button className={styles.btn}>Đánh dấu đọc tất cả</Button>
          </Grid>
          <div className={styles.notificationsList}>
            {listNotify.map((item) => (
              <LinkComp
                key={item.id}
                className={
                  read
                    ? clsx(styles.notificationsItem, styles.read)
                    : clsx(styles.notificationsItem, styles.unRead)
                }
                href={item.slug}
              >
                <div className={styles.notifyIcon}>
                  <i className={`icomoon icon-loyalty + ${styles.icon}`} />
                </div>
                <div className={styles.notifyContent}>
                  <div className={styles.notifyContentTitle}>{item.title}</div>
                  <small className={styles.createdAt}>
                    {DateTimeUtils.getTimeAgo(item.create_at)}
                  </small>
                </div>
              </LinkComp>
            ))}
          </div>
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Notifications);
