import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleIcon from 'src/assets/images/google.svg';
import 'src/styles/components/GoogleLoginModal.scss';
import 'src/styles/Global.scss';
import { GoogleLogin } from 'react-google-login';
import toast from 'react-hot-toast';
import { isMobile } from 'react-device-detect';

const GoogleLoginModal = ({ modalIsOpen, closeModal, redirectUrl, toggle }) => {
  const hisotry = useHistory();
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 99999,
    },
    overlay: {
      background: '#00000060',
      zIndex: 99,
    },
  };

  const mobileCustomStyles = {
    content: {
      width: 'calc(100% - 40px)',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 99999,
    },
    overlay: {
      background: '#00000060',
      zIndex: 99,
    },
  };

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const responseGoogle = response => {
    const accessToken = response.accessToken;
    const userName = response.profileObj.name;
    const userEmail = response.profileObj.email;
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('login-with-google', accessToken);
    hisotry.push(redirectUrl);
    closeModal();
    toggle();
  };

  const responseGoogleFail = response => {
    console.log('responseGoogleFail : ', response);
    toast.error('Signin Google login failed!');
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={isMobile ? mobileCustomStyles : customStyles}
      contentLabel="Google Login Modal"
    >
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_KEY}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogleFail}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
          <div className="google-login-section">
            <div className="google-login-title">AdValorem</div>
            <div className="google-login-content">Welcome Back!</div>
            <div className="google-login-button" onClick={renderProps.onClick}>
              <img alt="alt" src={GoogleIcon} width={25} height={25} />
              <div className="google-login-button-title ms-3">Sign in with google</div>
            </div>
          </div>
        )}
      />
      {isMobile ? (
        <div
          className="poppins-18-500 mt-2 global-pointer text-end"
          onClick={() => {
            hisotry.push(redirectUrl);
            closeModal();
            toggle && toggle();
          }}
        >
          skip for now
        </div>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default GoogleLoginModal;
