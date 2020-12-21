import React from 'react';
import Image from 'next/image';

const HeaderUser = React.memo((props) => {
  const { user } = props;
  return (
    <div className="header_user">
      <div className="header_user_name">{user?.name || ''}</div>
      <div className="header_user_avatar">
        <Image
          className="header_user_avatar_image"
          src="/images/avatar/user_avatar_default.svg"
          width={39}
          height={39}
        />
      </div>
    </div>
  );
});

export default HeaderUser;
