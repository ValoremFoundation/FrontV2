import React from 'react';
import Modal from 'react-modal';
import 'src/styles/Global.scss';
import MaticIcon from 'src/assets/images/ic-matic.png';
import RPCHelper from 'src/assets/images/rpc-helper.gif';

const SwitchNetworkModal = ({ modalIsOpen, closeModal, handleSwithNetwork }) => {
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
      zIndex: 99999,
    },
  };

  return (
    <Modal
      shouldCloseOnOverlayClick={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Switch Modal"
    >
      <div style={{ padding: '15px' }}>
        <div className="poppins-24-700">Choose Network</div>
        <div
          className="global-flex-center global-pointer"
          onClick={() => handleSwithNetwork(process.env.REACT_APP_NODE_ENV === 'production' ? 137 : 80001)}
        >
          <img src={MaticIcon} className="me-3" alt="polygon-icon" width="56px" height="56px" />
          {/* <div className="poppins-20-500">Polygon Mainnet</div> */}
          <div className="poppins-20-500">Mumbai Testnet</div>
        </div>
        <img src={RPCHelper} alt={'rpchelper'} width="300px" className="rounded-3" />
      </div>
    </Modal>
  );
};

export default SwitchNetworkModal;
