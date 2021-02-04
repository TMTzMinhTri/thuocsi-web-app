import React from 'react';
import { Tag } from 'components/atoms';

import TagTypeProps from './TagTypeProps';

const getType = (style) => TagTypeProps[style] || TagTypeProps.default;

const TagType = ({ item, date }) => {
  const props = getType(item.style);
  return <Tag date={date} name={item.name} {...props} />;
};

export default TagType;
