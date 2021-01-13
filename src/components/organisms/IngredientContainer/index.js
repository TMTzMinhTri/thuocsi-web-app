import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { AlphabetFilter, IngredientList, IngredientSearch } from 'components/mocules';

// const ALL = 'Tất cả';
const SHARP = '#';

const searchString = (arr, str) => {
  const result = arr.filter((el) => el.name.indexOf(str) > -1);
  return result;
};

const IngredientContainer = ({ ingredients }) => {
  const [word, setWord] = useState(SHARP);
  const [text, setText] = useState('');
  const [flag, setFlag] = useState(0);
  const [ingres, setIngres] = useState(ingredients);

  const handleChangeWord = (e) => {
    setWord(e.target.innerText);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setFlag(1);
  }, [word]);

  useEffect(() => {
    setFlag(2);
  }, [text]);

  useEffect(() => {
    if (flag === 1) {
      if (word === SHARP) setIngres(ingredients);
      else {
        const ws = ingredients.filter(
          (ingredient) => ingredient?.name.charAt(0).toUpperCase() === word,
        );
        // setText(ALL);
        setText('');
        setIngres(ws);
      }
    }
    if (flag === 2) {
      const searchs = searchString(ingredients, text);
      setWord(SHARP);
      setIngres(searchs);
    }
  }, [flag]);
  return (
    <Grid>
      <IngredientSearch value={text} handleChangeValue={handleChangeText} />
      <AlphabetFilter handleChangeWord={handleChangeWord} word={word} />

      <IngredientList ingredients={ingres} text={text} />
    </Grid>
  );
};

export default IngredientContainer;
