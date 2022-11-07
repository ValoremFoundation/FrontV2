import React from 'react';
import { useHistory } from 'react-router-dom';
import Tabs, { Tab } from 'src/components/SubLineTab';
import BoostPost from '../BoostPost';
import NFTCard from '../NFTCard';

const Created = ({ actionTab = 'listed', handleClickBuy, handleChangeOption }) => {
  const history = useHistory();
  const Listed = () => {
    return (
      <div className="my-4">
        <BoostPost handleClickBuy={handleClickBuy} onChange={handleChangeOption} />
        <div className="row gx-5 my-4">
          {[0, 1, 2].map(index => (
            <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
              <NFTCard onClick={() => history.push(`/token-detail/${index}`)} />
            </div>
          ))}
        </div>
      </div>
    );
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
