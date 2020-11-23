import FontSize from '../FontSize';

const noDecoration = {
  textDecoration: 'none',
};

const LinkStyled = {
  textDecoration: 'none',
  ...FontSize.fontNormal,
  padding: '5px',
  color: 'white',
  display: 'flex',
};

export default {
  LinkStyled,
  noDecoration,
};
