/* eslint-disable no-unused-expressions */
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FontSize from 'constants/Styled/FontSize/index';

const useStyles = makeStyles({
  linkRoot: {
    padding: '12px',
  },
  root: {
    textDecoration: 'none',
    ...FontSize.fontNormal,
    padding: '5px',
    color: (props) => (props.color ? props.color : '#000'),
    display: 'flex',
  },
});

function LinkComp(props) {
  const { className, name, children, href, onMouseOver, target, variant = 'body2', ...rest } = props;
  const classes = useStyles(props);

  return (
    <Link href={href} className={classes.linkRoot} onMouseOver={onMouseOver}>
      <a {...rest} className={clsx(classes.root, className)} target={target && '_blank'} href={href}>
        {children}
        <Typography variant={variant}>{name}</Typography>
      </a>
    </Link>
  );
}

export default React.memo(LinkComp);
