import React from 'react';
import { Link } from 'react-router-dom';
import 'src/styles/layout/Sidebar.scss';
import 'src/styles/Global.scss';
import { CgClose } from 'react-icons/cg';
import RoundBorderButton from 'src/components/RoundBorderButton';

const Sidebar = ({ isOpen, toggle }) => {
  const handleClickConnect = () => {
    toggle();
  };

  return (
    <aside className="side-container" style={{ opacity: isOpen ? '100%' : '0', top: isOpen ? '0' : '100%' }}>
      <div className="side-close-icon" onClick={toggle}>
        <CgClose fontSize={30} />
      </div>
      <div className="side-bar-menu">
        <Link to="/browse" className="nav-link" exact="true" onClick={toggle}>
          Browse
        </Link>
        <Link to="/resources" className="nav-link" exact="true" onClick={toggle}>
          Resources
        </Link>
        <Link to="/create" className="nav-link" exact="true" onClick={toggle}>
          Create
        </Link>
        <Link to="/map" className="nav-link" exact="true" onClick={toggle}>
          Map
        </Link>
        <div className="global-flex-center">
          <RoundBorderButton label={'Connect'} onClick={handleClickConnect} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
