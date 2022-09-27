import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'src/styles/layout/Navbar.scss';
import SearchInput from 'src/components/SearchInput';
import RoundBorderButton from 'src/components/RoundBorderButton';
import { FiMenu } from 'react-icons/fi';
import GoogleLoginModal from 'src/components/GoogleLoginModal';

const Navbar = ({ toggle }) => {
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
          <a className="nav-link" href="https://discord.gg/3kjQ8fBpks" target="_blank" rel="noopener noreferrer">
            Resources
          </a>
          <div className="nav-link" exact="true" onClick={openModal}>
            Create
          </div>
          <Link to="/map" className="nav-link" exact="true">
            Map
          </Link>
          <RoundBorderButton label={'Connect'} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
