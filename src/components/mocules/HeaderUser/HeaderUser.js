import React from 'react';
import Image from 'next/image';

const HeaderUser = React.memo((props) => {
  const { user } = props;
  return (
    <>
      <div className="header_user">{user.name}</div>
      <div className="header_avatar">
        <Image
          src="https://assets.thuocsi.vn/assets/defaults/user-avatar-20b31d55208b900bf14c683f4fb7e9e3f1f5b40feeb291a56dacafb01999d751.svg"
          width="3rem"
        />
      </div>
    </>
  );
});

export default HeaderUser;
