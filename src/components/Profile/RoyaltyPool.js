import React from 'react';
import { dateWithTimestamp, fromWei } from 'src/utils/formartUtils';
import RoundBorderButton from '../RoundBorderButton';

const RoyaltyPool = ({ apr, lockDuration, handleClickHarvest, handleClickWithdraw }) => {
  console.log('>>>>>>>>>>>>> pendingReward : ');
  return (
    <div>
      <div className="global-flex-start gap-5">
        <div>
          <p className="poppins-16-600 my-2">{'Apr'}</p>
          <p className="poppins-16-500">{apr} %</p>
        </div>
        <div>
          <p className="poppins-16-600 my-2">Lock Duration</p>
          <p className="poppins-16-500">{lockDuration / 24 / 60 / 60} days</p>
        </div>
        <div>
          {console.log('>>>>>>>>>>>>> 111111111 pendingReward : ')}
          <p className="poppins-16-600 my-2">Unlocked Time</p>
          <p className="poppins-16-500">{'qweasd'}</p>
        </div>
        <div>
          <p className="poppins-16-600 my-2">Royalty Amount</p>
          <p className="poppins-16-500">{'asd'}</p>
        </div>
        <div>
          <p className="poppins-16-600 my-2">Pending Reward Amount</p>
          <p className="poppins-16-500">{'qweqwe'}</p>
        </div>
      </div>
      <div className="global-flex-start gap-2 mt-2">
        <RoundBorderButton label={'Harvest'} color={'#2A212E'} bgColor={'#FFFFFF'} onClick={handleClickHarvest} />
        <RoundBorderButton label={'Withdraw'} color={'#2A212E'} bgColor={'#FFFFFF'} onClick={handleClickWithdraw} />
      </div>
    </div>
  );
};

export default RoyaltyPool;
