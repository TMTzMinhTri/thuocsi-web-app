import { Add, Remove } from '@material-ui/icons';

import styles from './styles.module.css';

const IconCircularProps = {
  PLUS: {
    backgroundColor: '#f9b514',
    color: '#fff',
    border: 'none',
    icon: <Add className={styles.icon} />,
  },
  MINUS: {
    backgroundColor: '#fff',
    color: '#c3ccdc',
    border: '1px solid #c3ccdc',
    icon: <Remove className={styles.icon} />,
  },
};

export default IconCircularProps;
