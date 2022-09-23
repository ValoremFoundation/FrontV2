import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'src/styles/layout/Navbar.scss';
import SearchInput from 'src/components/SearchInput';
import BorderButton from 'src/components/BorderButton';
import { FiMenu } from 'react-icons/fi';
import GoogleLoginModal from 'src/components/GoogleLoginModal';

const Navbar = ({ toggle }) => {
  const hisotry = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="nav-container">
      <GoogleLoginModal modalIsOpen={modalIsOpen} closeModal={closeModal} redirectUrl={'/create'} />
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
          <Link to="/resources" className="nav-link" exact="true">
            Resources
          </Link>
          <div className="nav-link" exact="true" onClick={openModal}>
            Create
          </div>
          <Link to="/map" className="nav-link" exact="true">
            Map
          </Link>
          <BorderButton label={'Connect'} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
