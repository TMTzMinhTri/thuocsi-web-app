import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LOGO_THUOCSI_SHORTENED } from 'constants/Images';
import Image from 'next/image';
import styles from './styles.module.css';

const LoadingScreen = () => (
  <div
    className={styles.root}
  >
    <div className={styles.wrapper}>

      <Image src={LOGO_THUOCSI_SHORTENED} width={60} height={60} />
      <CircularProgress
        size={80}
        thickness={4}
        className={styles.progress}
      />
    </div>
  </div>
);

export default LoadingScreen;
