import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'src/styles/layout/Navbar.scss';
import SearchInput from 'src/components/SearchInput';
import RoundBorderButton from 'src/components/RoundBorderButton';
import { FiMenu } from 'react-icons/fi';
import GoogleLoginModal from 'src/components/GoogleLoginModal';
import SwitchNetworkModal from 'src/components/SwitchNetworkModal';
import { truncateAddress } from 'src/utils/formartUtils';

const Navbar = ({
  toggle,
  switchNetworkModal,
  setSwitchNetworkModal,
  handleSwithNetwork,
  account,
  active,
  handleDisconnectWallet,
  logout,
  handleConnectWallet,
}) => {
  const history = useHistory();
  const refDrop = useRef(null);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const handleClickCreate = () => {
    if (!localStorage.getItem('login-with-google')) {
      setGoogleModalOpen(true);
    } else {
      history.push('/create');
    }
  };
  const closeGoogleModal = () => {
    setGoogleModalOpen(false);
  };

  const [openMenu, setOpenMenu] = React.useState(false);

  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };

  const handleClickOutside = event => {
    if (refDrop.current && !refDrop.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="nav-container">
      <GoogleLoginModal modalIsOpen={googleModalOpen} closeModal={closeGoogleModal} redirectUrl={'/create'} />
      <SwitchNetworkModal
        modalIsOpen={switchNetworkModal}
        closeModal={() => {
          setSwitchNetworkModal(false);
        }}
        handleSwithNetwork={handleSwithNetwork}
      />
      <div className="nav-sub-container">
        <Link to={'/'} className="nav-logo">
          <div className="nav-title">ADVALOREM</div>
        </Link>
        <div className="nav-menu-icon" onClick={toggle}>
          <FiMenu fontSize={30} />
        </div>
        <SearchInput placeholder={'Search by collection, NFT, or user'} />
        <div className="nav-menu">
          <Link to="/browse" className="nav-link" exact="true">
            Browse
          </Link>
          <a className="nav-link" href="https://discord.gg/3kjQ8fBpks" target="_blank" rel="noopener noreferrer">
            Resources
          </a>
          <div className="nav-link" exact="true" onClick={handleClickCreate}>
            Create
          </div>
          <Link to="/map" className="nav-link" exact="true">
            Map
          </Link>
          {active ? (
            <div className="dropdown" ref={refDrop}>
              <RoundBorderButton onClick={handleOpen} label={truncateAddress(account)}></RoundBorderButton>
              {openMenu ? (
                <ul className="menu">
                  <li className="menu-item">
                    <button
                      onClick={() => {
                        history.push(`/profile?activeTab=created&actionTab=listed`);
                        setOpenMenu(false);
                      }}
                    >
                      Profile
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      onClick={() => {
                        history.push(`/settings`);
                        setOpenMenu(false);
                      }}
                    >
                      Settings
                    </button>
                  </li>
                  <li className="menu-item">
                    <button onClick={handleDisconnectWallet}>Disconnect Wallet</button>
                  </li>
                  <li className="menu-item">
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              ) : null}
            </div>
          ) : (
            <RoundBorderButton label={'Connect'} onClick={handleConnectWallet} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
