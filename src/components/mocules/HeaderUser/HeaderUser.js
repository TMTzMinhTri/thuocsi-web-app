import React from 'react';
import Image from 'next/image';
import { LinkComp } from 'components/atoms';
import { MY_ACCOUNT } from 'constants/Paths';

const HeaderUser = React.memo((props) => {
  const { user } = props;
  return (
    <div className="header_user">
      <div className="header_user_name">{user?.name || ''}</div>
      <div className="header_user_avatar">
        <LinkComp href={MY_ACCOUNT} padding="0px">
          <Image
            className="header_user_avatar_image"
            src="/images/avatar/user_avatar_default.svg"
            width={39}
            height={39}
          />
        </LinkComp>
      </div>
    </div>
  );
});

export default HeaderUser;
