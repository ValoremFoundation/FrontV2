import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import MetamaskIcon from 'src/assets/images/metamask-icon.svg';
import 'src/styles/components/MetamaskSigninModal.scss';
import 'src/styles/Global.scss';

const MetamaskSigninModal = ({ modalIsOpen, closeModal, redirectUrl }) => {
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

  const handleClickMetamask = () => {
    hisotry.push(redirectUrl);
    closeModal();
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Metamask Signin Modal">
      <div style={{ padding: '15px' }}>
        <div className="poppins-24-700">Log in to your account by connecting to your wallet</div>
        <div className="poppins-16-400">
          If you don't have a wallet yet <span style={{ color: '#2081E2', cursor: 'pointer' }}>click here</span> to set
          on up it's super easy
        </div>
        <div className="metamask-login-button my-3 global-pointer" onClick={handleClickMetamask}>
          <div className="global-flex-between">
            <div className="global-flex-start">
              <img alt="alt" src={MetamaskIcon} width={25} height={25} />
              <div className="poppins-20-600 ms-3">MetaMask</div>
            </div>
            <div className="poppins-16-400 metamask-popular">Popular</div>
          </div>
        </div>
        <div className="metamask-login-button mt-4 global-pointer" onClick={handleClickMetamask}>
          <div className="poppins-20-600">Trustwallet</div>
        </div>
      </div>
    </Modal>
  );
};

export default MetamaskSigninModal;
