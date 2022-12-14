import React from 'react';
import { Link } from 'react-router-dom';
import 'src/styles/layout/Sidebar.scss';
import { CgClose } from 'react-icons/cg';
import BorderButton from 'src/components/BorderButton';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <aside className="side-container" style={{ opacity: isOpen ? '100%' : '0', top: isOpen ? '0' : '100%' }}>
      <div className="side-close-icon" onClick={toggle}>
        <CgClose fontSize={30} />
      </div>
      <div className="side-bar-menu">
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
        <div>
          <BorderButton label={'Connect'} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
