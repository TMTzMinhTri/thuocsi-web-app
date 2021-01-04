import React, { useEffect, useState } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GridLineItem } from 'components/organisms';
import { ContentClient } from 'clients';
import styles from './styles.module.css';

const DialogTitle = withStyles(styles)((props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={styles.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs({ url, open, maxWidth, handleClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await ContentClient.loadContent(url);
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return (
    <div className={styles.custom}>
      <Dialog fullScreen={fullScreen} fullWidth maxWidth={maxWidth} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {loading
            ? <GridLineItem counts={1} />
            : data.title && data.title}
        </DialogTitle>
        <DialogContent dividers>
          {loading
            ? <GridLineItem counts={6} />
            : (
              <>
                <Typography className={styles.title} variant="h5">{data.title && data.title}</Typography>
                <div dangerouslySetInnerHTML={{ __html: data.body }} />
              </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
