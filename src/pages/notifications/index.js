import React from 'react';
import Template from 'components/layout/Template';
import LinkComp from 'components/atoms/LinkComp';

import { Container, Grid, Button } from '@material-ui/core';
import clsx from 'clsx';
import { doWithServerSide, NotifyService } from 'services';
import { DateTimeUtils } from 'utils';
import { withLogin } from 'HOC';
import { v4 as uuidv4 } from 'uuid';
import { NEXT_I18NEXT_NAME_SPACES } from 'sysconfig';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from './styles.module.css';

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => {
    const [listNotifyRes, i18next] = await Promise.all([
      NotifyService.getNotifications({ ctx }),
      serverSideTranslations(ctx.locale, NEXT_I18NEXT_NAME_SPACES),
    ]);
    return {
      props: {
        listNotify: listNotifyRes?.data || [],
        ...i18next,
      },
    };
  });
}

const Notifications = ({ listNotify, isMobile }) => {
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
            {listNotify &&
              listNotify.map(
                (item) =>
                  item && (
                    <LinkComp
                      key={uuidv4()}
                      className={
                        item.isRead
                          ? clsx(styles.notificationsItem, styles.read)
                          : clsx(styles.notificationsItem, styles.unRead)
                      }
                      href={item.link}
                    >
                      <div className={styles.notifyIcon}>
                        <i className={`icomoon icon-loyalty + ${styles.icon}`} />
                      </div>
                      <div className={styles.notifyContent}>
                        <div className={styles.notifyContentTitle}>{item.title}</div>
                        <div className={styles.notifyContentDescription}>{item.description}</div>
                        <small className={styles.createdAt}>
                          {DateTimeUtils.getTimeAgo(item.createdTime)}
                        </small>
                      </div>
                    </LinkComp>
                  ),
              )}
          </div>
        </Container>
      </div>
    </Template>
  );
};

export default withLogin(Notifications);
