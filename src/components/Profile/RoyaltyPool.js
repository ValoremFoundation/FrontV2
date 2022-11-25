import React from 'react';
import { dateWithTimestamp, fromWei, numberFormat } from 'src/utils/formartUtils';
import RoundBorderButton from '../RoundBorderButton';

const RoyaltyPool = ({
  apr,
  lockDuration,
  handleClickHarvest,
  handleClickWithdraw,
  userPoolInfo,
  pendingRewardAmount,
}) => {
  return (
    <div>
      <div className="d-flex justify-content-start gap-5">
        <div>
          <p className="poppins-16-600 my-2">{'Apr'}</p>
          <p className="poppins-16-500">{apr} %</p>
        </div>
        <div>
          <p className="poppins-16-600 my-2">Unlock Time</p>
          <p className="poppins-16-500">
            {dateWithTimestamp((parseInt(userPoolInfo?.timeDeposited) + parseInt(lockDuration)) * 1000)}
          </p>
        </div>
        <div>
          <p className="poppins-16-600 my-2">Royalty Amount</p>
          <p className="poppins-16-500">
            {numberFormat(fromWei(userPoolInfo?.amount), fromWei(userPoolInfo?.amount) > 1 ? 4 : 9)} VLR
          </p>
        </div>
        <div>
          <p className="poppins-16-600 my-2">Pending Reward Amount</p>
          <p className="poppins-16-500">
            {numberFormat(fromWei(pendingRewardAmount), fromWei(pendingRewardAmount) > 1 ? 4 : 9)} VLR
          </p>
        </div>
      </div>
      <div className="global-flex-start gap-2 mt-2">
        <RoundBorderButton label={'Harvest'} color={'#2A212E'} bgColor={'#FFFFFF'} onClick={handleClickHarvest} />
        <RoundBorderButton label={'Withdraw'} color={'#E75B2E'} bgColor={'#FFFFFF'} onClick={handleClickWithdraw} />
      </div>
    </div>
  );
};

export default RoyaltyPool;
