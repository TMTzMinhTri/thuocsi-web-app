import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { AlphabetFilter, FloatSearch } from 'components/mocules';
import { StringUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import dynamic from 'next/dynamic';

const TEXT_DEFAULT = '';
const WORD_DEFAULT = '#';

const IngredientContainer = ({ ingredients }) => {
  const [filter, setFilter] = useState({
    word: WORD_DEFAULT,
    text: TEXT_DEFAULT,
    isByWord: true,
  });
  const [ingres, setIngres] = useState(ingredients);

  const handleChangeWord = (e) => {
    const val = e.target.innerText;
    setFilter({ ...filter, word: val, text: TEXT_DEFAULT, isByWord: true });
  };

  const handleChangeText = (e) => {
    const val = e.target.value;
    setFilter({ ...filter, text: val, word: WORD_DEFAULT, isByWord: false });
  };

  const handleRemoveText = () => {
    setFilter({ ...filter, text: TEXT_DEFAULT, word: WORD_DEFAULT, isByWord: true });
  };

  const searchByWord = useCallback(
    (word) =>
      ingredients.filter(
        ({ name }) => StringUtils.changeAlias(name.charAt(0).toUpperCase()) === word,
      ),
    [ingredients],
  );

  const searchString = useCallback((arr, str) => {
    if (!str || str.length === 0) {
      return arr;
    }
    const searchValue = str.toUpperCase();
    const searchValueUnsigned = StringUtils.changeAlias(searchValue);
    const isUnSigned = searchValue === searchValueUnsigned;

    let rsUnSigned = arr.filter(
      (el) => el.unsignedKey.toUpperCase().indexOf(searchValueUnsigned, 0) > -1,
    );

    if (isUnSigned) {
      return rsUnSigned;
    }

    const arrSearch = searchValue.split(' ');
    for (let i = 0; i <= arrSearch.length; i += 1) {
      const w = arrSearch[i];

      if (w && w.length > 0 && StringUtils.changeAlias(w) !== w) {
        rsUnSigned = rsUnSigned.filter((el) => el.name.toUpperCase().indexOf(w, 0) > -1);
      }
    }

    return rsUnSigned;
  }, []);

  useEffect(() => {
    if (filter.isByWord) {
      if (filter.word === WORD_DEFAULT) {
        setIngres(ingredients);
      } else {
        setIngres(searchByWord(filter.word));
      }
    } else {
      debounceFunc500(() => {
        const searchs = searchString(ingredients, filter.text);
        setIngres(searchs);
      });
    }
  }, [filter.isByWord, filter.text, filter.word]);

  const DynamicIngredientList = dynamic(() => import('components/mocules/IngredientList'));

  return (
    <Grid>
      <FloatSearch
        value={filter.text}
        handleChangeValue={handleChangeText}
        handleClose={handleRemoveText}
        placeholder="Nhập tên hoạt chất cần tìm"
      />
      <AlphabetFilter handleChangeWord={handleChangeWord} word={filter.word} />

      <DynamicIngredientList ingredients={ingres} text={filter.text} />
    </Grid>
  );
};

export default IngredientContainer;
