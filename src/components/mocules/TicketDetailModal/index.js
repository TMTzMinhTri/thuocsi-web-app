import { useEffect, useState } from 'react';
import { Modal } from 'components/atoms';
import { Grid, TextField, Chip, Button, IconButton } from '@material-ui/core';
import DateTimeUtils from 'utils/DateTimeUtils';
import { OrderClient, getFirst, isValid } from 'clients';
import { TICKET_STATUS, LIST_REASONS } from 'constants/Enums';
import CloseIcon from '@material-ui/icons/Close';

import { v4 as uuidv4 } from 'uuid';
import { useModal } from 'hooks';
import styles from './style.module.css';

const TicketFormModal = (props) => {
  const { visible, onClose, ticket } = props;
  const [order, setOrder] = useState({
    customerName: '',
  });

  useEffect(() => {
    async function fetchData() {
      if (!ticket?.orderId) return;
      const orderRes = await OrderClient.getOrderById({ id: ticket.orderId });
      if (isValid(orderRes)) setOrder(getFirst(orderRes));
    }
    fetchData();
  }, [ticket]);
  const {
    orderId,
    bankName,
    bankAccountName,
    bankBranch,
    bankCode,
    feedBackContent,
    imageUrls,
    code,
  } = ticket;
  const ticketStatus = TICKET_STATUS.find((ticketStt) => ticketStt.value === ticket.status);
  const { customerName, customerPhone, createdTime = '' } = order;

  const [currentImage, setCurrentImage] = useState('');
  const [open, toggle] = useModal();

  const handleClickImage = (imageUrl) => {
    setCurrentImage(imageUrl);
    toggle();
  };

  return (
    <>
      <Modal open={visible} onClose={onClose} className="ticket-modal">
        <div className={styles.feedback_order}>
          <div className={styles.title}>
            Chi tiết phản hồi <span style={{ color: 'yellow' }}>#{code} </span>
          </div>
          <Grid container className={styles.container}>
            <div className={styles.info_bank_title}>Thông tin phản hồi </div>
            <div className={styles.info_group}>
              <Grid item xs={12} className={styles.text_body}>
                <span className={styles.label}>Phản hồi về đơn hàng #</span>
                <span className={styles.value}>{orderId}</span>
              </Grid>
              <Grid item xs={12} md={6} className={styles.text_body}>
                <span className={styles.label}>Mã đơn hàng: </span>
                <span className={styles.value}>{orderId}</span>
              </Grid>
              <Grid item xs={12} md={6} className={styles.text_body}>
                <span className={styles.label}>Tên khách hàng: </span>
                <span className={styles.value}>{customerName}</span>
              </Grid>
              <Grid item xs={12} md={6} className={styles.text_body}>
                <span className={styles.label}>Ngày đặt hàng: </span>
                <span className={styles.value}>
                  {DateTimeUtils.getFormattedWithDate(new Date(createdTime))}
                </span>
              </Grid>
              <Grid item xs={12} md={6} className={styles.text_body}>
                <span className={styles.label}>Số điện thoại: </span>
                <span className={styles.value}>{customerPhone}</span>
              </Grid>

              <Grid container direction="row" className={styles.text_body}>
                <span className={styles.label}>Lý do: </span>
                {ticket?.reasons?.map((reasonEl) => {
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
              <Grid item xs={12} md={6} className={styles.text_body}>
                <span className={styles.label}>Trạng thái: </span>
                <Chip
                  icon={ticketStatus?.icon || <div> </div>}
                  label={ticketStatus?.label || ''}
                  className={styles.ticket_status_chip}
                  style={{ backgroundColor: ticketStatus?.color || 'white' }}
                />
              </Grid>
            </div>

            <Grid container>
              <div className={styles.info_bank_title}>Thông tin tài khoản </div>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Tên chủ tài khoản: </span>
              <span className={styles.value}>{bankAccountName}</span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Số tài khoản: </span>
              <span className={styles.value}>{bankCode}</span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Ngân hàng: </span>
              <span className={styles.value}>{bankName}</span>
            </Grid>
            <Grid item xs={12} md={6} className={styles.text_body}>
              <span className={styles.label}>Chi nhánh: </span>
              <span className={styles.value}>{bankBranch}</span>
            </Grid>

            <Grid container>
              <div className={styles.info_bank_title} style={{ marginBottom: '7px' }}>
                Nội dung:
              </div>
              <TextField
                variant="outlined"
                multiline
                rows={4}
                disabled
                style={{ width: '100%' }}
                value={feedBackContent}
                className={styles.text_field}
              />
            </Grid>
            {imageUrls && imageUrls.length !== 0 && (
              <Grid container>
                <div className={styles.info_bank_title} style={{ marginBottom: '7px' }}>
                  Hình ảnh:
                </div>
                <div className={styles.ticket_img_container}>
                  <Grid container justify="space-between">
                    {imageUrls?.map((imageUrl) => (
                      <Grid
                        item
                        key={uuidv4()}
                        aria-haspopup="true"
                        onClick={() => {
                          handleClickImage(imageUrl);
                        }}
                      >
                        <img
                          className={styles.ticket_img}
                          width="90"
                          height="90"
                          src={imageUrl}
                          alt="ticket img"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      </Modal>
      <Modal open={open} onClose={toggle}>
        <div className={styles.image_modal}>
          <IconButton onClick={toggle} className={styles.close_button}>
            <CloseIcon />
          </IconButton>
          <img
            src={currentImage}
            style={{ maxWidth: '800px', maxHeight: '800px' }}
            alt="ticket img"
          />
        </div>
      </Modal>
    </>
  );
};

export default TicketFormModal;
