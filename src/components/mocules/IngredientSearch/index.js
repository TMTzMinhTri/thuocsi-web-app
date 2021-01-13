import React from 'react';
import { Grid, Fab } from '@material-ui/core';
import { Input } from 'components/atoms';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const IngredientInput = ({ className, ...rest }) => (<Input className={className} {...rest} />);

const StyledIngredientInput = styled(IngredientInput)`
    cursor: pointer;
    padding: 10px 10px;
    width: 250px;
    border-radius: 25px;
    background: rgba(255,255,255,0.5);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26);
    border: none;
    color: #919aa3;
    z-index: 1;
    height: 45px !important;
    transition: width 1s, background-color .3s;
    &.Mui-focused {
        width: 350px;
        background: rgba(255,255,255,0.9);
        z-index: 4;
        transition: width 1s, background-color .3s;
        outline: none;
    }
`;

const StyledFab = styled(Fab)`
    background: #00b46e;
    color: white;
    &:hover {
      background: white;
      color: #00b46e;
    }
`;
const IngredientSearch = ({ value, handleChangeValue, handleClick }) => (
  <Grid container spacing={0} alignItems="baseline" justify="center">
    <Grid item>
      <StyledIngredientInput placeholder="Nhập tên hoạt chất cần tìm" value={value} onChange={handleChangeValue} />
    </Grid>
    <Grid item>
      <StyledFab size="medium" onClick={handleClick}>
        <SearchIcon />
      </StyledFab>
    </Grid>
  </Grid>
);

export default IngredientSearch;
