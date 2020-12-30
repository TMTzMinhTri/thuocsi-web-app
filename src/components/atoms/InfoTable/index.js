import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';
import styles from './styles.module.css';

const InfoTable = ({ heads, children }) => (
  <TableContainer component={Paper}>
    <Table className={styles.table}>
      <TableHead>
        <TableRow>
          {heads.map((head) => (
            <TableCell classes={{ root: styles.table_head }} align="left">
              {head}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  </TableContainer>
);

export default InfoTable;
