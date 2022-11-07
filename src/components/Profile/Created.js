import React from 'react';
import Tabs, { Tab } from 'src/components/SubLineTab';

const Created = ({ actionTab = 'listed' }) => {
  const Listed = () => {
    return <div>Listed Page</div>;
  };

  const Sold = () => {
    return <div>Sold Page</div>;
  };

  const SavedForLater = () => {
    return <div>SavedForLater Page</div>;
  };

  return (
    <div>
      <Tabs>
        <Tab active={actionTab === 'listed'} path="/profile?activeTab=created&actionTab=listed">
          Listed
        </Tab>
        <Tab active={actionTab === 'sold'} path="/profile?activeTab=created&actionTab=sold">
          Sold
        </Tab>
        <Tab active={actionTab === 'saved-for-later'} path="/profile?activeTab=created&actionTab=saved-for-later">
          Saved for Later
        </Tab>
      </Tabs>
      {actionTab === 'listed' && <Listed />}
      {actionTab === 'sold' && <Sold />}
      {actionTab === 'saved-for-later' && <SavedForLater />}
    </div>
  );
};

export default Created;
