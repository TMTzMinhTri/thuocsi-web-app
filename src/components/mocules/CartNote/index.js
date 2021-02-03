import React, { useCallback, useState, useEffect } from 'react';
import { NotifyUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import { CartClient, isValid } from 'clients';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useCart } from 'context';
import styles from './styles.module.css';

const CartNote = () => {
  const { updateCart, note } = useCart();
  const [noteValue, setNoteValue] = useState(note);
  const handleUpdateNote = useCallback(async (val) => {
    try {
      const res = await CartClient.updateNote(val);
      if (!isValid(res)) throw new Error(res.messsage);
      updateCart();
      NotifyUtils.success('Cập nhật ghi chú thành công');
    } catch (err) {
      NotifyUtils.error(err?.message || 'Cập nhật ghi chú thất bại');
    }
  });

  const handleSetNote = (e) => {
    const valNote = e.target.value;
    setNoteValue(valNote);
    debounceFunc500(() => handleUpdateNote(valNote));
  };

  useEffect(() => {
    setNoteValue(note);
  }, [note]);

  return (
    <TextareaAutosize
      name="note"
      value={noteValue}
      onChange={handleSetNote}
      className={styles.text_area}
      aria-label="Ghi chú của khách hàng"
      placeholder="Ghi chú của khách hàng"
      rowsMax={4}
    />
  );
};

export default React.memo(CartNote);
