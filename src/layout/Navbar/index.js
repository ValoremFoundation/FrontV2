import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'src/styles/layout/Navbar.scss';
import SearchInput from 'src/components/SearchInput';
import RoundBorderButton from 'src/components/RoundBorderButton';
import { FiMenu } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import GoogleLoginModal from 'src/components/GoogleLoginModal';
import SwitchNetworkModal from 'src/components/SwitchNetworkModal';
import { truncateAddress } from 'src/utils/formartUtils';
import MultiMediaView from 'src/components/MultiMediaView';
import LoadingPage from 'src/components/LoadingPage';
import { getTokensByFilters } from 'src/api';

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
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [searchResults, setSearchResults] = useState([]);
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

  const getAllTokens = async () => {
    setIsLoading(true);
    let {
      data: { data: token },
    } = await getTokensByFilters();
    setNftData(token);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTokens();
  }, [account]);

  useEffect(() => {
    if (search) {
      setSearchResults(nftData.filter(item => item?.name?.toLowerCase().match(search)));
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line
  }, [search]);

  const SearchItems = ({ results }) => {
    return (
      <div className="nav-sub-search-item-box">
        {results?.map((token, index) => (
          <div
            className="nav-sub-search-item global-pointer"
            key={index}
            onClick={() => {
              setSearch('');
              history.push(`/token-detail/${token.id}`);
            }}
          >
            <div className="d-flex justify-content-center align-items-center poppins-16-500">
              <MultiMediaView
                src={token?.uri || '/img/blank-image.jpg'}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 4,
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                mediaType={token?.media_type}
              />
              <div className="mx-2">{token?.name}</div>
            </div>
            <div className="poppins-16-500">{token?.price}</div>
          </div>
        ))}
      </div>
    );
  };

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {isLoading && <LoadingPage />}
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
          {searchOpen ? (
            <div className="d-flex justify-content-between align-items-center w-100">
              <IoChevronBack fontSize={30} onClick={() => setSearchOpen(!searchOpen)} />
              <div style={{ position: 'relative', width: '100%' }}>
                <SearchInput
                  placeholder={'Search by listed token'}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onClick={() => setSearch('')}
                />
                <SearchItems results={searchResults} />
              </div>
            </div>
          ) : (
            <>
              <Link to={'/'} className="nav-logo">
                <div className="nav-title">ADVALOREM</div>
              </Link>
              <div className="d-flex justify-content-center algin-item-center">
                <div className="nav-menu-icon me-4" onClick={() => setSearchOpen(!searchOpen)}>
                  <FiSearch fontSize={30} />
                </div>
                <div className="nav-menu-icon" onClick={toggle}>
                  <FiMenu fontSize={30} />
                </div>
              </div>
              <div className="nav-sub-search-container">
                <SearchInput
                  placeholder={'Search by listed token'}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onClick={() => setSearch('')}
                />
                <SearchItems results={searchResults} />
              </div>
              <div className="nav-menu">
                <Link to="/browse" className="nav-link" exact="true">
                  Browse
                </Link>
                <a
                  className="nav-link"
                  href="https://www.advalorem.io/tutorial"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tutorials
                </a>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
