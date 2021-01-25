import React from 'react';
import { Tag } from 'components/atoms';

import TagTypeProps from './TagTypeProps';

const getType = (type) => TagTypeProps[type] || TagTypeProps.default;

const TagType = ({ item, date }) => {
  const props = getType(item.type);
  return <Tag date={date} text={item.name} {...props} />;
};

export default TagType;
