import React, { useState } from 'react';
import { isValid } from 'clients';
import { AuthService } from 'services';
import { NotifyUtils } from 'utils';
import { useAuth } from 'context';
import { useRouter } from 'next/router';
import { AuthModal, SignUpForm } from 'components/mocules';
import { QUICK_ORDER } from 'constants/Paths';

const SignUpModal = React.memo((props) => {
  const { className, visible, onClose, onChangeSignIn, t } = props;
  const { login } = useAuth();
  const router = useRouter();
  const { refer } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [hasAlert, setHasAlert] = useState('');

  const handleSignUp = (data) => {
    setIsLoading(true);

    AuthService.signUp(data)
      .then((result) => {
        if (!isValid(result)) {
          NotifyUtils.error(result.message);
          setHasAlert(`Đã có lỗi xảy ra ${result.message}`);
          return;
        }
        // notification
        NotifyUtils.success('Bạn đã đăng ký tài khoản thuocsi thành công');
        // register success -> login and redirect
        AuthService
          // .loginLocal({
          //   username: data.phone,
          //   password: data.password,
          // })
          .login({ username: data.phone, password: data.password, type: 'CUSTOMER' })
          .then((resultlogin) => {
            if (!isValid(resultlogin)) {
              const errorCode = `login.${resultlogin.errorCode}`;
              NotifyUtils.error(t(errorCode));
              return;
            }
            NotifyUtils.success('Đăng nhập thành công');
            const userInfo = resultlogin.data[0];
            login(userInfo, false);

            // redirect to quick-order - when login success
            router.push(QUICK_ORDER);
          })
          .catch((error) => {
            NotifyUtils.error('Đã có lỗi xảy ra khi đăng nhập ');
            setHasAlert(`Đã có lỗi xảy ra ${error}`);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        NotifyUtils.error(`Đã có lỗi xảy ra khi đăng ký ${error?.message}`);
        setHasAlert(`Đã có lỗi xảy ra khi đăng ký ${error?.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthModal
      visible={visible}
      className={className}
      onClose={onClose}
      title="Đăng ký Thành viên"
      width="438"
    >
      <SignUpForm
        width="350"
        hasAlert={hasAlert}
        onClickSignIn={onChangeSignIn}
        isLoading={isLoading}
        refer={refer}
        onClickSignUp={handleSignUp}
      />
    </AuthModal>
  );
});

export default SignUpModal;
