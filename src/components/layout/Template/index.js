import React, { useEffect } from 'react';
import Head from 'next/head';
import { useCart, useAuth } from 'context';
import {
  SignUpModal,
  SignInModal,
  ForgetPasswordModal,
  RegisterGuestModal,
} from 'components/organisms';
import { CustomModal } from 'components/mocules';
import { ButtonHeader } from 'components/atoms';
import NavBar from '../NavBar';
import Header from '../Header';
import HeaderMobile from '../HeaderMobile';
import Footer from '../Footer';
import FooterMobile from '../FooterMobile';
import styles from './styles.module.css';

export default function Template({
  title,
  children,
  isMobile,
  pageName,
  pageTitle = '',
  product = '',
  point = 0,
  balance = 0,
}) {
  const {
    isAuthenticated,
    toggleLogin,
    isShowLogin,
    handleChangeForget,
    isShowForgetPassword,
    toggleForgetPassword,
    isShowSignUp,
    toggleSignUp,
    handleChangeSignIn,
    handleChangeSignUp,
    registerGuest,
    isShowRegisterGuest,
    toggleRegisterGuest,
    toggleShowGuestExpiredTime,
    isShowGuestExpiredTime,
  } = useAuth();
  const { clearCart } = useCart();
  useEffect(() => {
    if(!isAuthenticated && isShowGuestExpiredTime) {
      clearCart();
    }
  }, [isShowGuestExpiredTime])
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache" />
        <meta httpEquiv="Expires" content="-1" />
        <meta name="keywords" content="thuốc sỉ" />
        <meta
          name="description"
          content="Chợ thuốc sỉ online lớn nhất Việt Nam với hơn 7500 loại thuốc, giá minh bạch, giao hàng miễn phí toàn quốc"
        />
        <link rel="shortcut icon" href="images/favicon-16x16.png" size="16x16" />
        <link rel="shortcut icon" href="images/favicon-32x32.png" size="32x32" />
        <link rel="shortcut icon" href="images/favicon-96x96.png" size="96x96" />
        <title>{title}</title>
      </Head>
      <div id="main">
        {isMobile ? <HeaderMobile title={pageTitle} /> : <Header />}
        {!isMobile && <NavBar pageName={pageName} point={point} balance={balance} />}
        {children}
        {isMobile ? <FooterMobile product={product} /> : <Footer />}
        {!isAuthenticated && (
          <>
            <SignInModal
              visible={isShowLogin}
              onClose={toggleLogin}
              onChangeForget={handleChangeForget}
              onChangeSignUp={handleChangeSignUp}
            />
            <ForgetPasswordModal visible={isShowForgetPassword} onClose={toggleForgetPassword} />
            <SignUpModal
              visible={isShowSignUp}
              onClose={toggleSignUp}
              onChangeSignIn={handleChangeSignIn}
            />
            <RegisterGuestModal
              visible={isShowRegisterGuest}
              onClose={toggleRegisterGuest}
              onChangeRegisterGuest={registerGuest}
            />
            <CustomModal
              visible={isShowGuestExpiredTime}
              onClose={toggleShowGuestExpiredTime}
              content="Thời gian dùng thử đã hết. Mời bạn vui lòng tạo tài khoản để sử dụng hoặc gọi chúng tôi để được hỗ trợ tốt nhất!"
              btnOkRender={false}
              btnCloseRender={false}
              customBtnRender={(
                <div className={styles.btngroup}>
                  <ButtonHeader
                    className={styles.custombtn}
                    variant="contained"
                    btnType="primary"
                    href="tel:02873008840"
                  >
                    Gọi nhận viên hỗ trợ
                  </ButtonHeader>
                  <ButtonHeader variant="contained" btnType="primary" onClick={toggleSignUp}>
                    Tạo tài khoản
                  </ButtonHeader>
                </div>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}
