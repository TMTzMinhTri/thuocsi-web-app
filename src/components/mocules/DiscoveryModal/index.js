import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { DISCOVERY_URL } from 'constants/data';
import styles from './style.module.css';

const DiscoveryModal = memo((props) => {
  const { onClose, visible, className } = props;


  return (
    <Modal className={className} open={visible} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <iframe title="Discovery" className={styles.iframe} src={DISCOVERY_URL} width="100%" height="100%" />
      </div>
    </Modal>
  );
});

export default DiscoveryModal;
