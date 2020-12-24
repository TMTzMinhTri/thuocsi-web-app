import { useCallback, useState } from 'react';

const useMultiImageBox = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleDecrement = useCallback(() => {
    if (selectedImage === 0) {
      setSelectedImage(images.length - 1);
      return;
    }

    setSelectedImage((current) => current - 1);
  }, [selectedImage, images]);

  const handleIncrement = useCallback(() => {
    if (selectedImage === images.length - 1) {
      setSelectedImage(0);
      return;
    }

    setSelectedImage((current) => current + 1);
  }, [selectedImage, images]);

  const handlePrevious = useCallback(
    (e) => {
      e.stopPropagation();
      handleDecrement();
    },
    [handleDecrement],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        handleDecrement();
        return;
      }

      if (e.key === 'ArrowLeft') {
        handleIncrement();
      }
    },
    [handleIncrement, handleDecrement],
  );

  const handleNext = useCallback(
    (e) => {
      e.stopPropagation();
      handleIncrement();
    },
    [handleIncrement],
  );

  const handleImageSelection = useCallback((index) => {
    setSelectedImage(index);
  }, []);

  return {
    models: { selectedImage },
    operations: {
      handlePrevious,
      handleNext,
      handleKeyDown,
      handleImageSelection,
    },
  };
};

export default useMultiImageBox;
