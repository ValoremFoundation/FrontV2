import React from 'react';
import { format } from 'date-fns';
import styles from './profile.module.scss';

const Transactions = ({ transactions }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={`${styles.tableWrapper} ${styles.tableThWrap}`}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>Txn Hash</th>
            <th>Method</th>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((item, index) => (
            <tr key={index}>
              <td>
                <a
                  rel="noopener noreferrer"
                  href={`https://${
                    process.env.REACT_APP_NODE_ENV === 'production' ? 'polygonscan.com' : 'mumbai.polygonscan.com'
                  }/tx/${item?.hash}`}
                  target="_blank"
                >{`${item?.hash.slice(0, 5)}...${item?.hash.slice(item?.hash.length - 5, item?.hash.length)}`}</a>
              </td>
              <td>{item?.method}</td>
              <td>{`${item?.from.slice(0, 5)}...${item?.from.slice(item?.from.length - 5, item?.from.length)}`}</td>
              <td>{`${item?.to.slice(0, 5)}...${item?.to.slice(item?.to.length - 5, item?.to.length)}`}</td>
              <td>{format(new Date(item?.created_at), 'MM dd, yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
