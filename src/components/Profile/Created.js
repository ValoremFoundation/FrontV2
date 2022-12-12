import React from 'react';
import { useHistory } from 'react-router-dom';
import Tabs, { Tab } from 'src/components/SubLineTab';
// import BoostPost from '../BoostPost';
import MintCard from '../MintCard';
import NFTCard from '../NFTCard';

const Created = ({ actionTab = 'listed', handleClickBuy, handleChangeOption, profile, categories }) => {
  const history = useHistory();
  const mintedTokens = profile?.tokens?.minted;
  const savedForLaterTokens = profile?.tokens?.saved;
  const listedTokens = profile?.tokens?.listed;
  const soldTokens = profile?.tokens?.sold;

  const Minted = () => {
    return (
      <div>
        {mintedTokens?.length > 0 ? (
          mintedTokens?.map((token, index) => (
            <div className="my-4" key={index}>
              <MintCard
                handleClick={() => history.push(`/activate-listing/${token.id}`)}
                token={token}
                userInfo={profile}
                key={index}
                categories={categories}
              />
            </div>
          ))
        ) : (
          <div className="poppins-20-600 text-center">No Data</div>
        )}
      </div>
    );
  };

  const Listed = () => {
    return (
      <div>
        {/* <BoostPost handleClickBuy={handleClickBuy} onChange={handleChangeOption} /> */}
        <div className="row gx-5 my-4">
          {listedTokens?.length > 0 ? (
            listedTokens?.map((item, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
                <NFTCard
                  onClick={() => history.push(`/token-detail/${item?.id}`)}
                  token={item}
                  categories={categories}
                />
              </div>
            ))
          ) : (
            <div className="poppins-20-600 text-center">No Data</div>
          )}
        </div>
      </div>
    );
  };

  const Sold = () => {
    return (
      <div className="row gx-5 my-4">
        {soldTokens?.length > 0 ? (
          soldTokens?.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
              <NFTCard onClick={() => history.push(`/token-detail/${item?.id}`)} token={item} categories={categories} />
            </div>
          ))
        ) : (
          <div className="poppins-20-600 text-center">No Data</div>
        )}
      </div>
    );
  };

  const SavedForLater = () => {
    return (
      <div>
        {savedForLaterTokens?.length > 0 ? (
          savedForLaterTokens?.map((token, index) => (
            <div className="my-4" key={index}>
              <MintCard
                handleClick={() => {}}
                token={token}
                userInfo={profile}
                key={index}
                handleClickEdit={() => history.push(`/token-detail/${token.id}/edit`)}
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
        <Tab active={actionTab === 'minted'} path="/profile?activeTab=created&actionTab=minted">
          Minted
        </Tab>
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
      {actionTab === 'minted' && <Minted />}
      {actionTab === 'listed' && <Listed />}
      {actionTab === 'sold' && <Sold />}
      {actionTab === 'saved-for-later' && <SavedForLater />}
    </div>
  );
};

export default Created;
