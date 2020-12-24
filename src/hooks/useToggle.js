import { useState, useCallback } from 'react';

const useToggle = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  return {
    models: { open },
    operations: {
      handleOpen,
      handleClose,
      handleToggle,
    },
  };
};

export default useToggle;
