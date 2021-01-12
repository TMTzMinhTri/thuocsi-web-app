import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { AlphabetFilter, IngredientList, IngredientSearch } from 'components/mocules';

const IngredientContainer = ({ ingredients }) => {
  const [word, setWord] = useState('#');
  const handleChangeWord = (e) => {
    setWord(e.target.innerText);
  };
  return (
    <Grid>
      <IngredientSearch />
      <AlphabetFilter handleChangeWord={handleChangeWord} word={word} />

      <IngredientList ingredients={ingredients} word={word} />
    </Grid>
  );
};

export default IngredientContainer;
