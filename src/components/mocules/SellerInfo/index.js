import { SUPPLIER } from 'constants/Paths';
import { LinkComp } from 'components/atoms';
import styles from './styles.module.css';

const SellerInfo = ({ seller }) =>
  seller && (
    <div className={styles.supplierTitle}>
      <div className={styles.name}>
        <strong>Nhà cung cấp:</strong>
      </div>
      <LinkComp className={styles.supplierName} href={`${SUPPLIER}/${seller.slug}`}>
        {seller.name}
      </LinkComp>
    </div>
  );

export default SellerInfo;
