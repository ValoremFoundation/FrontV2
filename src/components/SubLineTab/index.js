import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './subLineTab.module.scss';

export const Tabs = memo(({ children }) => {
  return <ul className={styles.tabRoot}>{children}</ul>;
});

export const Tab = memo(({ children, active, style, path }) => {
  const history = useHistory();
  const onClick = () => {
    history.push(path);
  };

  return (
    <li className={active ? styles.active : ''} style={{ ...style }} onClick={onClick}>
      {children}
    </li>
  );
});

export default Tabs;
