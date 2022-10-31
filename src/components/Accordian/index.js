import React, { FC, memo, useState, useRef, useEffect } from 'react';
import ArrowDownIcon from '../Icons/ArrowDownIcon';
import styles from './accordian.module.scss';

export const Accordian = memo(({ children, title, icon, active, toogleAccordian = null, className }) => {
  const [show, setShow] = useState(false);
  const childElem = useRef(null);

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        childElem.current.style.overflow = 'inherit';
      }, 300);
    } else {
      childElem.current.style.overflow = 'hidden';
    }
  }, [active]);

  return (
    <div className={className ? `${styles.root} ${className}` : styles.root}>
      <div
        className={styles.titleBar}
        onClick={() => {
          if (childElem.current) {
            if (!active) childElem.current.style.height = childElem.current.scrollHeight + 24 + 'px';
            else childElem.current.style.height = '0px';
          }
          toogleAccordian !== null ? toogleAccordian() : setShow(!show);
        }}
      >
        <div className="flex justify-start align-center">
          {icon}
          {title}
        </div>
        <ArrowDownIcon
          className={(toogleAccordian !== null && active) || (toogleAccordian === null && show) ? styles.active : ''}
          width="20"
          height="20"
        />
      </div>
      <div
        ref={childElem}
        className={
          (toogleAccordian !== null && active) || (toogleAccordian === null && show)
            ? styles.childWrapperActive
            : styles.childWrapper
        }
      >
        {children}
      </div>
    </div>
  );
});

export default Accordian;
