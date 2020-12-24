/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Skeleton from '@material-ui/lab/Skeleton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';
import { v4 as uuidv4 } from 'uuid';

import useToggle from 'hooks/useToggle';

import Image from 'next/image';
import useMultiImageBox from 'hooks/useMultiImageBox';
// import useMultiImageBoxStyles from './MultiImageBox.styles';
import styles from './styles.module.css';

const MultiImageBox = ({ loading, images, imageType }) => {
  const {
    models: { selectedImage },
    operations: { handleNext, handlePrevious, handleImageSelection, handleKeyDown },
  } = useMultiImageBox({ images });
  const {
    models: { open },
    operations: { handleOpen, handleClose },
  } = useToggle();

  return (
    <>
      <Grid container direction="row" justify="flex-start" classes={{ root: styles.container }}>
        <Grid item xs={12} style={{ marginBottom: 10, flex: '80%' }}>
          {loading ? (
            <Skeleton variant="rect" classes={{ root: styles.imageMain }} />
          ) : (
            <ButtonBase classes={{ root: styles.imgButtonBase }} onClick={handleOpen}>
              <Image
                width="200px"
                height="200px"
                alt={`${imageType}-main-image`}
                className={styles.imageMain}
                src={images[selectedImage]}
              />
            </ButtonBase>
          )}
        </Grid>

        <Grid item spacing={1} container direction="row" classes={{ root: styles.thumbnail }}>
          {images.map((src, index) => (
            <Grid item key={uuidv4()}>
              {loading ? (
                <Skeleton variant="rect" classes={{ root: styles.thumbnailImage }} />
              ) : (
                <ButtonBase
                  classes={{ root: styles.imgButtonBase }}
                  onClick={() => handleImageSelection(index)}
                >
                  <Image
                    width="100px"
                    height="100px"
                    alt={src ? `${imageType}-auxiliary-image-${index}` : undefined}
                    className={clsx(styles.thumbnailImage, {
                      [styles.thumbnailSelected]: index === selectedImage,
                    })}
                    src={src}
                  />
                </ButtonBase>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        hideBackdrop
        aria-labelledby="image-gallery-title"
        aria-describedby="image-gallery-description"
      >
        <Backdrop
          className={styles.modalBackdrop}
          open={open}
          onClick={handleClose}
          onKeyDown={handleKeyDown}
        >
          <Grid container alignItems="center" justify="center" direction="row">
            <IconButton classes={{ root: styles.modalButton }} onClick={handlePrevious}>
              <ArrowLeftIcon />
            </IconButton>
            <Image
              alt={
                images[selectedImage] ? `${imageType}-auxiliary-image-${selectedImage}` : undefined
              }
              width="275px"
              height="275px"
              className={styles.modalImage}
              src={images[selectedImage]}
            />
            <IconButton classes={{ root: styles.modalButton }} onClick={handleNext}>
              <ArrowRightIcon />
            </IconButton>
          </Grid>
        </Backdrop>
      </Modal>
    </>
  );
};

export default MultiImageBox;
