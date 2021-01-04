import React from 'react';
import { Badge } from 'components/atoms';

const NewBadge = ({ children }) => (
  <Badge className="badge--new badge"> { children} </Badge>
);

export default NewBadge;
