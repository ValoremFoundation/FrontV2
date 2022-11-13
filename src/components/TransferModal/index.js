import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import 'src/styles/Global.scss';
import TextInput from '../TextInput';
import RoundBorderButton from '../RoundBorderButton';
import BackgroundButton from '../BackgroundButton';

const TransferModal = ({ modalIsOpen, closeModal, handleChangeAddress, address, handleCancel, handleConfirm }) => {
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

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Transfer Modal">
      <div style={{ padding: '15px' }}>
        <div className="poppins-24-700">{'Do you wish to transfer this NFT?'}</div>
        <div className="my-3">
          <TextInput label={'Address'} type={'text'} value={address} onChange={handleChangeAddress} />
        </div>
        <div className="global-flex-end gap-3">
          <BackgroundButton label={'No'} color={'#2A212E'} bgColor={'#D9D9D9'} onClick={handleCancel} />
          <BackgroundButton label={'Yes'} color={'#2A212E'} bgColor={'#96F2A4'} onClick={handleConfirm} />
        </div>
      </div>
    </Modal>
  );
};

export default TransferModal;
