import React from 'react';
import { useHistory } from 'react-router-dom';
import Tabs, { Tab } from 'src/components/SubLineTab';
import RedeemedCard from 'src/components/RedeemedCard';
import NotRedeemedCard from 'src/components/NotRedeemedCard';
import { useMemo } from 'react';
import { useState } from 'react';

const Collections = ({
  actionTab = 'redeemed',
  handleClickRedeem,
  handleClickAccept,
  handleClickDeny,
  profile,
  transactions,
  account,
}) => {
  const history = useHistory();
  const requestedTokens = profile?.tokens?.requestRedeemed;
  const soldTokens = profile?.tokens?.sold;
  const redeemTokens = soldTokens?.map(token => {
    if (token.minted && !token.for_sale) {
      const mintedSoldNotlistTransaction = transactions.find(
        transaction => transaction.method === 'mint' && transaction.token_id === token.token_id
      );
      if (mintedSoldNotlistTransaction?.to.toLowerCase() !== account.toLowerCase()) {
        return { ...token, redeemAddress: mintedSoldNotlistTransaction?.to };
      }
    }
  });

  const Redeemed = () => {
    return (
      <div>
        {redeemTokens?.map((token, index) => (
          <div className="my-4" key={index}>
            <RedeemedCard handleClickRedeem={() => handleClickRedeem(token)} token={token} profile={profile} />
          </div>
        ))}
      </div>
    );
  };

  const NotRedeemed = () => {
    return (
      <div>
        {requestedTokens?.map((token, index) => (
          <div className="my-4" key={index}>
            <NotRedeemedCard
              handleClickAccept={() => handleClickAccept(token)}
              handleClickDeny={() => handleClickDeny(token.id)}
              token={token}
              profile={profile}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Tabs>
        <Tab active={actionTab === 'redeemed'} path="/profile?activeTab=collections&actionTab=redeemed">
          Redeemed
        </Tab>
        <Tab active={actionTab === 'not-redeemed'} path="/profile?activeTab=collections&actionTab=not-redeemed">
          Not Redeemed
        </Tab>
      </Tabs>
      {actionTab === 'redeemed' && <Redeemed />}
      {actionTab === 'not-redeemed' && <NotRedeemed />}
    </div>
  );
};

export default Collections;
