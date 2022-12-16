import React, { useState, useEffect } from 'react';
import './App.css';
import './assets/fonts/FuturaBT-Medium.ttf';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'src/pages/Home';
import { toastOptions } from 'src/utils/toastOptions';
import { Toaster } from 'react-hot-toast';
import Navbar from 'src/layout/Navbar';
import Sidebar from 'src/layout/Sidebar';
// import Resources from 'src/pages/Resources';
import Browse from 'src/pages/Browse';
import Create from 'src/pages/Create';
import Map from 'src/pages/Map';
import NotFound from 'src/pages/NotFound';
import Profile from 'src/pages/Profile';
import ActivateListing from 'src/pages/ActivateListing';
import TokenDetail from 'src/pages/TokenDetail';
import Settings from 'src/pages/Settings';
import TokenEdit from './pages/TokenEdit';
import Public from './pages/Public';
import { useDispatch } from 'react-redux';
import { login } from 'src/api';
import { useWeb3React } from '@web3-react/core';
import { injected, networkItem } from 'src/utils/connector';
import toast from 'react-hot-toast';
import { setWalletAddress } from 'src/actions/wallet';
import { setAuthToken } from 'src/actions/auth';
import { setProfile } from 'src/actions/profile';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { active, account, chainId, activate, deactivate } = useWeb3React();
  const [switchNetworkModal, setSwitchNetworkModal] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
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

    const visible = localStorage.getItem('login-with-metamask') ? localStorage.getItem('login-with-metamask') : false;

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
      const userName = localStorage.getItem('userName');
      const userEmail = localStorage.getItem('userEmail');
      const {
        data: { status, token, user },
      } = await login({ wallet_address: account, userName, userEmail });
      if (!status) {
        console.log('Failed to login');
      } else {
        localStorage.setItem('authToken', token);
        dispatch(setAuthToken(token));
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
      window.location.replace('/');
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
      localStorage.setItem('login-with-google', '');
      localStorage.setItem('login-with-metamask', '');
      dispatch(setWalletAddress(''));
      window.location.replace('/');
    } catch (ex) {
      console.log(ex);
    }
  };

  const MainLayout = ({ children, ...rest }) => {
    return (
      <React.Fragment>
        <Sidebar
          isOpen={isOpen}
          toggle={toggle}
          switchNetworkModal={switchNetworkModal}
          setSwitchNetworkModal={setSwitchNetworkModal}
          handleSwithNetwork={handleSwithNetwork}
          account={account}
          active={active}
          handleDisconnectWallet={handleDisconnectWallet}
          logout={logout}
          handleConnectWallet={handleConnectWallet}
        />
        <Navbar
          toggle={toggle}
          switchNetworkModal={switchNetworkModal}
          setSwitchNetworkModal={setSwitchNetworkModal}
          handleSwithNetwork={handleSwithNetwork}
          account={account}
          active={active}
          handleDisconnectWallet={handleDisconnectWallet}
          logout={logout}
          handleConnectWallet={handleConnectWallet}
        />
        {children}
      </React.Fragment>
    );
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainLayout>
            <Home />
          </MainLayout>
        </Route>
        <Route path="/browse" exact>
          <MainLayout>
            <Browse />
          </MainLayout>
        </Route>
        <Route path="/create" exact>
          <MainLayout>
            <Create />
          </MainLayout>
        </Route>
        <Route path="/map" exact>
          <MainLayout>
            <Map />
          </MainLayout>
        </Route>
        <Route path="/profile" exact>
          <MainLayout>
            <Profile />
          </MainLayout>
        </Route>
        <Route path="/settings" exact>
          <MainLayout>
            <Settings />
          </MainLayout>
        </Route>
        <Route path="/activate-listing/:tokenId" exact>
          <MainLayout>
            <ActivateListing />
          </MainLayout>
        </Route>
        <Route path="/token-detail/:tokenId" exact>
          <MainLayout>
            <TokenDetail />
          </MainLayout>
        </Route>
        <Route path="/token-detail/:tokenId/edit" exact>
          <MainLayout>
            <TokenEdit />
          </MainLayout>
        </Route>
        <Route path="/public/:walletAddress" exact>
          <MainLayout>
            <Public />
          </MainLayout>
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Toaster position="top-right" toastOptions={toastOptions} />
    </Router>
  );
}

export default App;
