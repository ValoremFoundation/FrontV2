import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'src/styles/layout/Navbar.scss';
import SearchInput from 'src/components/SearchInput';
import RoundBorderButton from 'src/components/RoundBorderButton';
import { FiMenu } from 'react-icons/fi';
import GoogleLoginModal from 'src/components/GoogleLoginModal';
import { useWeb3React } from '@web3-react/core';
import { injected, networkItem } from 'src/utils/connector';
import toast from 'react-hot-toast';
import SwitchNetworkModal from 'src/components/SwitchNetworkModal';
import { LS_KEY } from 'src/constants';
import { truncateAddress } from 'src/utils/formartString';
import { setWalletAddress } from 'src/actions/wallet';
import { setProfile } from 'src/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'src/api';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';

const Navbar = ({ toggle }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const wallet = useSelector(state => state.wallet.address);
  const profile = useSelector(state => state.profile);
  const { active, account, chainId, activate, deactivate } = useWeb3React();
  const [connectShowModal, setConnectShowModal] = useState(false);
  const [switchNetworkModal, setSwitchNetworkModal] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (JSON.parse(localStorage?.getItem('isWalletConnected'))) {
        try {
          await activate(injected);
          localStorage.setItem('isWalletConnected', true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loginAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (!active) {
      localStorage.setItem('authToken', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const provider = window.ethereum?.isTrust ? window?.trustwallet?.Provider : window.ethereum;

    if (!provider) {
      console.error('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
      toast.error('MetaMask is not installed.');
      return;
    }

    const visible = localStorage.getItem(LS_KEY) ? localStorage.getItem(LS_KEY) : false;

    if (!account) {
      if (visible) setSwitchNetworkModal(false);
      return;
    }
    dispatch(setWalletAddress(account));
    if (!JSON.parse(process.env.REACT_APP_SUPPORTED_CHAINS).includes(chainId)) {
      if (visible || JSON.parse(localStorage.getItem('isWalletConnected'))) setSwitchNetworkModal(true);
    } else {
      if (visible || JSON.parse(localStorage.getItem('isWalletConnected'))) setSwitchNetworkModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account]);

  const loginAction = async () => {
    if (account) {
      const userName = JSON.parse(localStorage.getItem('userName'));
      const userEmail = JSON.parse(localStorage.getItem('userEmail'));
      const {
        data: { status, token, user },
      } = await login({ wallet_address: account, userName, userEmail });
      if (!status) {
        console.log('Failed to login');
      } else {
        localStorage.setItem('authToken', token);
        localStorage.setItem(LS_KEY, token);
        // if (user.feature_id > 0 && user.feature_upgraded) {
        //   const {
        //     data: { data: features },
        //   } = await getFeaturs();
        //   const startTime = user.feature_start_time;
        //   const lockTime = features[user.feature_id - 1].lock_time;
        //   const expireTimestamp = Number(startTime) + Number(lockTime * 24 * 60 * 60);
        //   const currentTimestamp = Number(new Date().getTime() / 1000);
        //   if (currentTimestamp > expireTimestamp) {
        //     const params = { wallet_address: account, feature_upgraded: false };
        //     const result = await updateProfileFeatureUpgrade(params);
        //     if (result.status === 200) {
        //       user.feature_upgraded = false;
        //     }
        //   }
        // }
        // delete user.feature_start_time;
        dispatch(setProfile(user));
      }
    }
  };

  const handleConnectWallet = async () => {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', true);
      loginAction();
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDisconnectWallet = () => {
    try {
      deactivate();
      localStorage.setItem('isWalletConnected', false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleSwithNetwork = async networkId => {
    const provider = window.ethereum?.isTrust ? window?.trustwallet?.Provider : window.ethereum;
    if (provider) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${networkId.toString(16)}` }], // chainId must be in hexadecimal numbers
        });
        return true;
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask

        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: networkItem[0].params,
            });
          } catch (addError) {
            console.error(addError);
            return false;
          }
        }
        console.error(error);
        return false;
      }
    }
  };

  const logout = async () => {
    try {
      deactivate();
      localStorage.setItem('isWalletConnected', false);
      localStorage.setItem('authToken', '');
      dispatch(setWalletAddress(''));
      localStorage.setItem(LS_KEY, '');
      history.push('/');
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="nav-container">
      <GoogleLoginModal modalIsOpen={modalIsOpen} closeModal={closeModal} redirectUrl={'/create'} />
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
          <div className="nav-link" exact="true" onClick={openModal}>
            Create
          </div>
          <Link to="/map" className="nav-link" exact="true">
            Map
          </Link>
          {active ? (
            <MDBDropdown>
              <MDBDropdownToggle tag="a" className="caret-none">
                <RoundBorderButton label={truncateAddress(account)}></RoundBorderButton>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem href="" link onClick={() => history.push(`/profile`)}>
                  Profile
                </MDBDropdownItem>
                <MDBDropdownItem href="" link onClick={handleDisconnectWallet}>
                  Disconnect Wallet
                </MDBDropdownItem>
                <MDBDropdownItem href="" link onClick={logout}>
                  Logout
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          ) : (
            <RoundBorderButton label={'Connect'} onClick={handleConnectWallet} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
