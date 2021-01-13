import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { AlphabetFilter, IngredientList, IngredientSearch } from 'components/mocules';
import { SearchUtils } from 'utils';

const IngredientContainer = ({ ingredients }) => {
  const [word, setWord] = useState('#');
  const [text, setText] = useState('');
  const [ingres, setIngres] = useState(ingredients);

  const handleChangeWord = (e) => {
    setWord(e.target.innerText);
    setText('');
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
    setWord('#');
  };

  const handleSearch = () => {
    const searchs = SearchUtils.searchString(ingredients, text);
    setIngres(searchs);
  };
  useEffect(() => {
    if (word === '#') setIngres(ingredients);
    else {
      const ws = ingredients.filter((ingredient) => ingredient?.charAt(0).toUpperCase() === word);
      setIngres(ws);
    }
  }, [word]);

  return (
    <Grid>
      <IngredientSearch
        value={text}
        handleChangeValue={handleChangeText}
        handleClick={handleSearch}
      />
      <AlphabetFilter handleChangeWord={handleChangeWord} word={word} />

      <IngredientList ingredients={ingres} text={text} />
    </Grid>
  );
};

export default IngredientContainer;
