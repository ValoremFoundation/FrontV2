import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'src/styles/layout/Sidebar.scss';
import 'src/styles/Global.scss';
import { CgClose } from 'react-icons/cg';
import RoundBorderButton from 'src/components/RoundBorderButton';
import GoogleLoginModal from 'src/components/GoogleLoginModal';
import SwitchNetworkModal from 'src/components/SwitchNetworkModal';
import { truncateAddress } from 'src/utils/formartUtils';

const Sidebar = ({
  isOpen,
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
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const handleClickCreate = () => {
    if (!localStorage.getItem('login-with-google')) {
      setGoogleModalOpen(true);
    } else {
      toggle();
      history.push('/create');
    }
  };
  const closeGoogleModal = () => {
    setGoogleModalOpen(false);
  };

  const [openMenu, setOpenMenu] = React.useState(false);
  const refDrop = useRef(null);

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
    <aside className="side-container" style={{ opacity: isOpen ? '100%' : '0', top: isOpen ? '0' : '100%' }}>
      <GoogleLoginModal
        modalIsOpen={googleModalOpen}
        closeModal={closeGoogleModal}
        redirectUrl={'/create'}
        toggle={toggle}
      />
      <SwitchNetworkModal
        modalIsOpen={switchNetworkModal}
        closeModal={() => {
          setSwitchNetworkModal(false);
        }}
        handleSwithNetwork={handleSwithNetwork}
      />
      <div className="side-close-icon" onClick={toggle}>
        <CgClose fontSize={30} />
      </div>
      <div className="side-bar-menu">
        <Link to="/browse" className="nav-link" exact="true" onClick={toggle}>
          Browse
        </Link>
        <a
          className="nav-link"
          href="https://www.advalorem.io/tutorial"
          target="_blank"
          rel="noopener noreferrer"
          onClick={toggle}
        >
          Tutorials
        </a>
        <a
          className="nav-link"
          href="https://discord.gg/3kjQ8fBpks"
          target="_blank"
          rel="noopener noreferrer"
          onClick={toggle}
        >
          Resources
        </a>
        <div className="nav-link" onClick={handleClickCreate}>
          Create
        </div>
        {/* <Link to="/create" className="nav-link" exact="true" onClick={toggle}>
        </Link> */}
        <Link to="/map" className="nav-link" exact="true" onClick={toggle}>
          Map
        </Link>
        <div className="global-flex-center">
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
                        toggle();
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
                        toggle();
                      }}
                    >
                      Settings
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      onClick={() => {
                        handleDisconnectWallet();
                        toggle();
                      }}
                    >
                      Disconnect Wallet
                    </button>
                  </li>
                  <li className="menu-item">
                    <button
                      onClick={() => {
                        logout();
                        toggle();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>
          ) : (
            <RoundBorderButton label={'Connect'} onClick={handleConnectWallet} />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
