import React from 'react';
import { useHistory } from 'react-router-dom';
import Tabs, { Tab } from 'src/components/SubLineTab';
import RedeemedCard from 'src/components/RedeemedCard';
import NotRedeemedCard from 'src/components/NotRedeemedCard';

const Collections = ({ actionTab = 'redeemed', handleClickRedeem, handleClickAccept, handleClickDeny }) => {
  const history = useHistory();

  const Redeemed = () => {
    return (
      <div>
        {[0, 1, 2].map(index => (
          <div className="my-4" key={index}>
            <RedeemedCard
              handleClickRedeem={() => handleClickRedeem(index)}
              handleClick={() => history.push(`/token-detail/${index}`)}
            />
          </div>
        ))}
      </div>
    );
  };

  const NotRedeemed = () => {
    return (
      <div>
        {[0, 1, 2].map(index => (
          <div className="my-4" key={index}>
            <NotRedeemedCard
              handleClickAccept={() => handleClickAccept(index)}
              handleClickDeny={() => handleClickDeny(index)}
              handleClick={() => history.push(`/token-detail/${index}`)}
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
