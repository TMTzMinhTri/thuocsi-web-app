import { useState } from 'react';
import { TableRow, TableCell, Chip, Grid, Button } from '@material-ui/core';
import { InfoTable } from 'components/atoms';
import { DateTimeUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import { ALIGN, TICKET_STATUS, LIST_REASONS } from 'constants/Enums';
import { MY_ORDER_URL } from 'constants/Paths';
import Link from 'next/link';
import { TicketDetailModal } from 'components/mocules';
import { useModal } from 'hooks';
import styles from './styles.module.css';

const heads = [
  { text: 'Đơn hàng', align: ALIGN.LEFT },
  { text: 'Mã đơn hàng', align: ALIGN.LEFT },
  { text: 'Thời gian tạo', align: ALIGN.LEFT },
  { text: 'Lí do', align: ALIGN.LEFT },
  { text: 'Trạng thái', align: ALIGN.LEFT },
  { text: 'Hành động', align: ALIGN.CENTER },
];

function TicketTable({ tickets }) {
  const [open, toggle] = useModal();
  const [currentTicket, setCurrentTicket] = useState({});

  const handleViewDetail = (ticket) => {
    setCurrentTicket(ticket);
    toggle();
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <InfoTable heads={heads} className={styles.bottom_square}>
        {tickets.length > 0 ? (
          tickets.map((ticket) => {
            const ticketStatus = TICKET_STATUS.find(
              (ticketStt) => ticketStt.value === ticket.status,
            );
            return (
              <TableRow hover key={uuidv4()}>
                <TableCell align="left">
                  <Link href={`${MY_ORDER_URL}/${ticket.orderId}`}>{`#${ticket.orderId}`}</Link>
                </TableCell>
                <TableCell align="left">{ticket.orderCode}</TableCell>
                <TableCell align="left">
                  {DateTimeUtils.getFormattedDate(
                    new Date(ticket?.createdTime || null),
                    'DD/MM/YYYY HH:mm:ss',
                  )}
                </TableCell>
                <TableCell align={ALIGN.LEFT}>
                  <Grid container direction="column" spacing={1}>
                    {ticket.reasons.map((reasonEl) => {
                      const reasonName =
                        LIST_REASONS.find((reason) => reason.code === reasonEl)?.name || '';
                      return (
                        <Grid item key={uuidv4()}>
                          <Button
                            variant="contained"
                            key={uuidv4()}
                            disabled
                            className={styles.reason_button}
                          >
                            {reasonName}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </TableCell>
                <TableCell align={ALIGN.LEFT}>
                  <Chip
                    icon={ticketStatus.icon}
                    label={ticketStatus.label}
                    className={styles.ticket_status_chip}
                    style={{ backgroundColor: ticketStatus.color }}
                  />
                </TableCell>
                <TableCell align={ALIGN.CENTER}>
                  <Button onClick={() => handleViewDetail(ticket)} className={styles.detail_text}>
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow hover key={uuidv4()}>
            <TableCell component="th" scope="row" colSpan={5} align={ALIGN.CENTER}>
              Bạn chưa gửi phản hồi
            </TableCell>
          </TableRow>
        )}
        <TicketDetailModal visible={open} onClose={toggle} ticket={currentTicket} />
      </InfoTable>
    </div>
  );
}

export default TicketTable;
