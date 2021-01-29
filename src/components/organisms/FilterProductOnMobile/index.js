import React, { useEffect } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import {
  Dialog,
  AccordionDetails,
  Typography,
  IconButton,
  Slide,
  Fab,
  Accordion,
  AccordionSummary,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './styles.module.css';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={styles.root} {...other}>
      {onClose ? (
        <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant="h6" className={styles.title}>
        {children}
      </Typography>
    </MuiDialogTitle>
  );
};

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function FilterMobileDialogs({
  open,
  maxWidth,
  handleClose,
  group,
  slug,
  tags,
  pathName,
  currentTab,
  sortBy,
  brand,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [currentTab]);

  const getQueryObject = () => {
    const query = {};
    if (currentTab) {
      query.current_tab = currentTab;
    }
    if (sortBy) {
      query.sortBy = sortBy;
    }
    return query;
  };

  const getTabQuery = () => {
    const query = getQueryObject();
    if (!currentTab) {
      delete query.current_tab;
    }
    if (!sortBy) {
      delete query.sortBy;
    }
    return query;
  };
  const tabQuery = getTabQuery();

  return (
    <div className={styles.custom}>
      <Dialog
        scroll="body"
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        fullWidth
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={styles.filterMobile}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Bộ lộc tìm kiếm
        </DialogTitle>
        <DialogContent dividers className={styles.dialogContent}>
          <AccordionDetails className={styles.accordionDetail}>
            <div>
              <div className={styles.headline}>
                <FontAwesomeIcon icon={faTag} />
                <span>Đánh dấu</span>
              </div>
              <Link href={pathName}>
                <Fab
                  variant="extended"
                  aria-label="all"
                  className={clsx(currentTab === '' && styles.active, styles.filter_btn)}
                >
                  Tất cả
                </Fab>
              </Link>
              {tags &&
                tags.map((item) => (
                  <Link
                    key={`tags-${item.slug}`}
                    href={{
                      pathname: pathName,
                      query: { ...tabQuery, current_tab: item.slug },
                    }}
                  >
                    <Fab
                      variant="extended"
                      aria-label="all"
                      className={clsx(currentTab === item.slug && styles.active, styles.filter_btn)}
                    >
                      {item.leftIcon && <span className={styles.iconLeft}>{item.leftIcon}</span>}
                      {item.name}
                      {item.rightIcon && <span className={styles.iconRight}>{item.rightIcon}</span>}
                    </Fab>
                  </Link>
                ))}
            </div>
            <hr className={styles.hr_space} />
            <div>
              <div className={styles.group}>
                <Accordion className="accordion" defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="accordion-sumary"
                  >
                    <Typography>Nhóm thuốc</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-detail">
                    <div>
                      <Link key="all-products" href="/products">
                        <div
                          className={`${styles.accordionLink} ${slug === '' ? styles.active : ''}`}
                        >
                          Tất cả sản phẩm
                        </div>
                      </Link>
                      {group &&
                        group.map((item) => (
                          <Link key={item.categoryID} href={`/categories/${item.slug}`}>
                            <div
                              className={`${styles.accordionLink} ${
                                item.slug === slug ? styles.active : ''
                              }`}
                            >
                              {item.name}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
                <hr className={styles.hr_clear} />
                <Accordion className="accordion" defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1b-content"
                    id="panel1b-header"
                    className="accordion-sumary"
                  >
                    <Typography>Nhà sản xuất</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-detail">
                    <div>
                      <Link key="all-products" href="/products">
                        <div className={styles.accordionLink}>Tất cả sản phẩm</div>
                      </Link>
                      {brand &&
                        brand.length > 0 &&
                        brand.map((item) => (
                          <Link key={item.manufacturerID} href={`/manufacturers/${item.slug}`}>
                            <div
                              className={`${styles.accordionLink} ${
                                item.slug === slug ? styles.active : ''
                              }`}
                            >
                              {item.name}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </AccordionDetails>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Fab variant="extended" aria-label="all" className={styles.close} onClick={handleClose}>
            Đóng
          </Fab>
        </DialogActions>
      </Dialog>
    </div>
  );
}
