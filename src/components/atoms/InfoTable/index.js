import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  makeStyles,
} from '@material-ui/core';
import styles from './styles.module.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderRadius: '30px!important',
  },
});

const InfoTable = ({ heads, children }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
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
};

export default InfoTable;
