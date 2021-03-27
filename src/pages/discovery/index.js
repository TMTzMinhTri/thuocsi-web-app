import React from 'react';
import Template from 'components/layout/Template';
import { DISCOVERY_URL } from 'sysconfig';
import { getSessionTokenClient } from 'clients';
import styles from './styles.module.css';

export async function getServerSideProps() {
  
  return {
    props: {},
  };
}

const Discovery = ({ isMobile }) => {
  const token = getSessionTokenClient();
  const pageTitle = 'Khám phá';
  const title = 'Khám phá – Đặt thuốc sỉ rẻ hơn tại thuocsi.vn';
  const name = 'deals';
  return (
    <Template title={title} isMobile={isMobile} pageName={name} pageTitle={pageTitle}>
      <div className={styles.discovery_wrapper}>
        <iframe title="Discovery" className={styles.iframe} src={`${DISCOVERY_URL}?token=${token}`} width="100%" height="100%" />
      </div>
    </Template>
  );
};
export default Discovery;
