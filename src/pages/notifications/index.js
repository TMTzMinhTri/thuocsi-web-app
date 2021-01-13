import React from 'react';
import { Template, NavBar, Header, LinkComp } from 'components';
import { Container, Grid, Button } from '@material-ui/core';
import clsx from 'clsx';
import { NotifyClient } from 'clients';
import { DateTimeUtils } from 'utils';
import { withLogin } from 'context';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  const [notify] = await Promise.all([NotifyClient.getNotify(ctx)]);
  return {
    props: {
      notify,
    },
  };
}

const Notifications = (props) => {
  const { mostResearched = [], read = true, notify = [] } = props;
  const title = 'Trang thông báo';
  const pageName = 'notification';

  return (
    <Template title={title}>
      <Header {...props} />
      <NavBar mostResearched={mostResearched} pageName={pageName} />
      <div className={styles.notifyWrap}>
        <Container className={styles.wrapper} maxWidth="lg">
          <Grid className={styles.notifyTitle} container>
            <h3>Thông Báo của tôi</h3>
            <Button className={styles.btn}>Đánh dấu đọc tất cả</Button>
          </Grid>
          <div className={styles.notificationsList}>
            {notify.map((item) => (
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
