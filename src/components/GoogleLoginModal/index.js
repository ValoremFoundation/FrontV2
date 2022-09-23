import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleIcon from 'src/assets/images/google.svg';
import 'src/styles/components/GoogleLoginModal.scss';
import 'src/styles/Global.scss';

const GoogleLoginModal = ({ modalIsOpen, closeModal, redirectUrl }) => {
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
    },
  };

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const handleClickGoogleLogin = () => {
    hisotry.push(redirectUrl);
    closeModal();
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Google Login Modal">
      <div style={{ padding: '65px' }}>
        <div className="google-login-title">AdValorem</div>
        <div className="google-login-content">Welcome Back!</div>
        <div className="google-login-button" onClick={handleClickGoogleLogin}>
          <img src={GoogleIcon} width={25} height={25} />
          <div className="google-login-button-title ms-3">Sign in with google</div>
        </div>
      </div>
    </Modal>
  );
};

export default GoogleLoginModal;
