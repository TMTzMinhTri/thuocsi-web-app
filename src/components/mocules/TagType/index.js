import React from 'react';
import { Tag } from 'components/atoms';
import TagTypeProps from 'constants/TagTypeProps';
import { useSetting } from 'context';

const TagType = ({ item, date }) => {
  const { getStyleBySlugOfTag } = useSetting();
  const props = getStyleBySlugOfTag(item.slug) || TagTypeProps.default;
  return <Tag date={date} name={item.name} {...props} />;
};

export default TagType;
