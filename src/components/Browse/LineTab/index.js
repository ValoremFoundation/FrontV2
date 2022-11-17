import React, { memo } from 'react';
import styles from './lineTab.module.scss';

export const Tabs = memo(({ children }) => {
  return <ul className={styles.tabRoot}>{children}</ul>;
});

export const Tab = memo(({ children, active, style, onClick }) => {
  return (
    <li className={active ? styles.active : ''} style={{ ...style }} onClick={onClick}>
      {children}
    </li>
  );
});

export default Tabs;
