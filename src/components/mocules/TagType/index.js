import React from 'react';
import { Tag } from 'components/atoms';
import TagTypeProps from 'constants/TagType';

const TagType = ({ type }) => {
  const props = TagTypeProps[type];
  return <Tag {...props} />;
};

export default TagType;
