import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { AlphabetFilter, IngredientList, FloatSearch } from 'components/mocules';
import { StringUtils } from 'utils';
import { debounceFunc500 } from 'utils/debounce';

const TEXT_DEFAULT = '';
const WORD_DEFAULT = '#';

const searchString = (arr, str) => {
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
};

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

  useEffect(() => {
    if (filter.isByWord) {
      if (filter.word === WORD_DEFAULT) {
        setIngres(ingredients);
      } else {
        const ws = ingredients.filter(
          (ingredient) =>
            StringUtils.changeAlias(ingredient?.name.charAt(0).toUpperCase()) === filter.word,
        );

        setIngres(ws);
      }
    } else {
      debounceFunc500(() => {
        const searchs = searchString(ingredients, filter.text);
        setIngres(searchs);
      });
    }
  }, [filter, ingredients]);

  return (
    <Grid>
      <FloatSearch
        value={filter.text}
        handleChangeValue={handleChangeText}
        handleClose={handleRemoveText}
        placeholder="Nhập tên hoạt chất cần tìm"
      />
      <AlphabetFilter handleChangeWord={handleChangeWord} word={filter.word} />

      <IngredientList ingredients={ingres} text={filter.text} />
    </Grid>
  );
};

export default IngredientContainer;
