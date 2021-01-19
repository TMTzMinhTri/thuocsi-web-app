import React from 'react';
import clsx from 'clsx';
import { Grid, ButtonBase, Modal, Backdrop, IconButton } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import useToggle from 'hooks/useToggle';
import Image from 'next/image';
import useMultiImageBox from 'hooks/useMultiImageBox';
import { MISSING_IMAGE } from 'constants/Images';
import styles from './styles.module.css';

const MultiImageBox = ({ loading, images, imageType }) => {
  const {
    selectedImage,
    handlePrevious,
    handleNext,
    handleKeyDown,
    handleImageSelection,
  } = useMultiImageBox({ images });
  const { open, handleOpen, handleClose } = useToggle();

  return (
    <>
      <Grid container direction="row" justify="flex-start" classes={{ root: styles.container }}>
        <Grid item xs={12} style={{ flex: '80%' }}>
          {loading ? (
            <Skeleton variant="rect" classes={{ root: styles.imageMain }} />
          ) : (
            <>
              {images ? (
                <ButtonBase classes={{ root: styles.imgButtonBase }} onClick={handleOpen}>
                  <Image
                    width="200px"
                    height="200px"
                    alt={`${imageType}-main-image`}
                    className={styles.imageMain}
                    src={images[selectedImage]}
                  />
                </ButtonBase>
              ) : (
                <Image
                  width="340px"
                  height="340px"
                  alt="Image Not Found"
                  className={styles.imageNotFound}
                  src={MISSING_IMAGE}
                />
              )}
            </>
          )}
        </Grid>
        {images
          && images.map((src, index) => (
            <Grid item spacing={1} container direction="row" classes={{ root: styles.thumbnail }}>
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
            </Grid>
          ))}
      </Grid>

      {images && (
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
                <ArrowLeft />
              </IconButton>

              <Image
                alt={
                  images[selectedImage]
                    ? `${imageType}-auxiliary-image-${selectedImage}`
                    : undefined
                }
                width="275px"
                height="275px"
                className={styles.modalImage}
                src={images[selectedImage]}
              />
              <IconButton classes={{ root: styles.modalButton }} onClick={handleNext}>
                <ArrowRight />
              </IconButton>
            </Grid>
          </Backdrop>
        </Modal>
      )}
    </>
  );
};

export default MultiImageBox;
