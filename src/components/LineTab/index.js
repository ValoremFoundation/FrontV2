import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './lineTab.module.scss';

export const Tabs = memo(({ children }) => {
  return <ul className={styles.tabRoot}>{children}</ul>;
});

export const Tab = memo(({ children, active, style, path }) => {
  const history = useHistory();
  const onClick = () => {
    if (path?.includes('https')) {
      window.open(path);
    } else {
      history.push(path);
    }
  };

  return (
    <li className={active ? styles.active : ''} style={{ ...style }} onClick={onClick}>
      {children}
    </li>
  );
});

export default Tabs;
