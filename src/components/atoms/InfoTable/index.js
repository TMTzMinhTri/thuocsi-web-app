import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';
import styled from 'styled-components';
import styles from './styles.module.css';

const InfoTable = ({ heads, children, className }) => (
  <TableContainer component={Paper} className={className}>
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

const StyledInfoTable = styled(InfoTable)`
    &.MuiPaper-rounded {
      border-radius: 10px !important;
    }
`;

export default StyledInfoTable;
