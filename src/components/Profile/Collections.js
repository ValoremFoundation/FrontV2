import React from 'react';
import Tabs, { Tab } from 'src/components/SubLineTab';

const Collections = ({ actionTab = 'redeemed' }) => {
  const Redeemed = () => {
    return <div>Redeemed 111 Page</div>;
  };

  const NotRedeemed = () => {
    return <div>NotRedeemed Page</div>;
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
