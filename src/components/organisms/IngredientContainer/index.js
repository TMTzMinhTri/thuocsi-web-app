import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { AlphabetFilter, IngredientList, IngredientSearch } from 'components/mocules';
import { StringUtils } from 'utils';

const TEXT_DEFAULT = '';
const WORD_DEFAULT = '#';

const searchString = (arr, str) => {
  const result = arr.filter(
    (el) => el.name.toUpperCase().indexOf(str.toUpperCase(), 0) > -1,
  );
  return result;
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
      if (filter.word === WORD_DEFAULT) setIngres(ingredients);
      else {
        const ws = ingredients.filter(
          (ingredient) =>
            StringUtils.changeAlias(ingredient?.name.charAt(0).toUpperCase()) === filter.word,
        );
        setIngres(ws);
      }
    } else {
      const searchs = searchString(ingredients, filter.text);
      setIngres(searchs);
    }
  }, [filter]);

  return (
    <Grid>
      <IngredientSearch
        value={filter.text}
        handleChangeValue={handleChangeText}
        handleClose={handleRemoveText}
      />
      <AlphabetFilter handleChangeWord={handleChangeWord} word={filter.word} />

      <IngredientList ingredients={ingres} text={filter.text} />
    </Grid>
  );
};

export default IngredientContainer;
