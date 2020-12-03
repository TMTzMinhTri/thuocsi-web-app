import React from 'react';
import { Tag } from 'components/atoms';
import TagTypeProps from 'constants/TagType';

const TagType = ({ type, date }) => {
  const props = TagTypeProps[type];
  return <Tag date={date} {...props} />;
};

export default TagType;
