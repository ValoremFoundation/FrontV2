import React from 'react';
import { Link } from 'react-router-dom';
import 'src/styles/layout/Navbar.scss';
import SearchInput from 'src/components/SearchInput';
import BorderButton from 'src/components/BorderButton';
import { FiMenu } from 'react-icons/fi';

const Navbar = ({ toggle }) => {
  return (
    <div className="nav-container">
      <div className="nav-sub-container">
        <Link to={'/'} className="nav-logo">
          <h1 className="nav-title">ADVALOREM</h1>
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
          <Link to="/create" className="nav-link" exact="true">
            Create
          </Link>
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
