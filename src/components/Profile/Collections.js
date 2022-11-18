import React, { useMemo } from 'react';
import Tabs, { Tab } from 'src/components/SubLineTab';
import RedeemedCard from 'src/components/RedeemedCard';
import NotRedeemedCard from 'src/components/NotRedeemedCard';

const Collections = ({
  actionTab = 'redeemed',
  handleClickRedeem,
  handleClickAccept,
  handleClickDeny,
  profile,
  transactions,
  account,
}) => {
  const requestedTokens = profile?.tokens?.requestRedeemed;
  const soldTokens = profile?.tokens?.sold;

  const redeemTokens = useMemo(() => {
    let result = [];
    if (soldTokens) {
      soldTokens.map(token => {
        if (token.minted && !token.for_sale) {
          const mintedSoldNotlistTransaction = transactions.find(
            transaction => transaction.method === 'mint' && transaction.token_id === token.token_id
          );
          if (
            mintedSoldNotlistTransaction?.to &&
            mintedSoldNotlistTransaction?.to.toLowerCase() !== account.toLowerCase()
          ) {
            result.push({ ...token, redeemAddress: mintedSoldNotlistTransaction?.to });
          }
        }
      });
    }

    return result;
  }, [soldTokens]);

  const Redeemed = () => {
    return (
      <div>
        {redeemTokens?.length > 0 ? (
          redeemTokens?.map((token, index) => (
            <div className="my-4" key={index}>
              <RedeemedCard handleClickRedeem={() => handleClickRedeem(token)} token={token} profile={profile} />
            </div>
          ))
        ) : (
          <div className="poppins-20-600 text-center">No Data</div>
        )}
      </div>
    );
  };

  const NotRedeemed = () => {
    return (
      <div>
        {requestedTokens?.length > 0 ? (
          requestedTokens?.map((token, index) => (
            <div className="my-4" key={index}>
              <NotRedeemedCard
                handleClickAccept={() => handleClickAccept(token)}
                handleClickDeny={() => handleClickDeny(token.id)}
                token={token}
                profile={profile}
              />
            </div>
          ))
        ) : (
          <div className="poppins-20-600 text-center">No Data</div>
        )}
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
