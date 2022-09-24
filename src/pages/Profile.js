import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'src/styles/Profile.scss';
import 'src/styles/Global.scss';
import Avatar2 from 'src/assets/images/avatar-1.png';
import ProfileNumberName from 'src/components/ProfileNumberName';
import ListingCard from 'src/components/ListingCard';
import RedemptionCard from 'src/components/RedemptionCard';

const Profile = () => {
  const history = useHistory();
  const data1 = [
    {
      count: 1,
      name: 'Items',
    },
    {
      count: 0,
      name: 'Owners',
    },
    {
      count: 0,
      name: 'Total Volume',
    },
    {
      count: 0,
      name: 'Floor Price',
    },
  ];
  const categoryTabList = [
    {
      id: 0,
      label: 'Created',
    },
    {
      id: 1,
      label: 'Collections',
    },
    {
      id: 2,
      label: 'Transactions',
    },
    {
      id: 3,
      label: 'Royalty Pool',
    },
    {
      id: 4,
      label: 'Earn liquidity rewards',
    },
  ];
  const actionTabList = [
    {
      id: 0,
      label: 'Inactive',
    },
    {
      id: 1,
      label: 'Active',
    },
    {
      id: 2,
      label: 'Sold',
    },
    {
      id: 3,
      label: 'Saved for later',
    },
  ];

  const [selectedCategoryTabIndex, setSelectedCategoryTabIndex] = useState(0);
  const [selectedActionTabIndex, setSelectedActionTabIndex] = useState(4);

  const handleClickActive = index => {
    history.push(`/token-detail/${index}`);
  };

  const handleClickAccept = index => {};
  const handleClickDeny = index => {};

  return (
    <div className="profile-container">
      <div style={{ background: '#F4F5FB' }}>
        <div className="profile-sub-container">
          <div className="profile-first-section">
            <img alt="alt" src={Avatar2} className="profile-first-avatar" />
          </div>
        </div>
      </div>
      <div style={{ background: '#FFFFFF' }}>
        <div className="profile-sub-container">
          <div className="profile-second-section">
            <p className="poppins-24-700">Rhinos NFT Studios</p>
            <p className="poppins-16-500">By Ryan M Elder</p>
            <div className="row">
              <div className="col-12 col-lg-6">
                <p className="cursor-pointer poppins-16-500">
                  Lucid Creations of a SCAD Mind. ART And Music NFTs Created during lucid enlightened Psycosis
                </p>
              </div>
            </div>
            <div className="d-flex justify-conent-start align-items-center flex-wrap">
              {data1.map((item, index) => (
                <ProfileNumberName data={item} key={index} />
              ))}
            </div>
            <div className="global-flex-lg-between-sm-center">
              <div className="global-flex-between">
                {categoryTabList.map((item, index) =>
                  selectedCategoryTabIndex === item.id ? (
                    <div
                      key={index}
                      className="poppins-16-600 me-5 my-2 global-pointer"
                      onClick={() => setSelectedCategoryTabIndex(item.id)}
                    >
                      {item?.label}
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="poppins-16-500-gray me-5 my-2 global-pointer"
                      onClick={() => setSelectedCategoryTabIndex(item.id)}
                    >
                      {item?.label}
                    </div>
                  )
                )}
              </div>
              <div className="global-flex-between">
                <div className="poppins-16-600 global-pointer mx-2">Buy Matic</div>
                <div className="poppins-16-600 global-pointer mx-2">Buy VLR</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: '#F4F5FB' }}>
        <div className="profile-sub-container">
          <div className="profile-third-section">
            {selectedCategoryTabIndex === 0 && (
              <>
                <div className="global-flex-lg-between-sm-center mb-4">
                  <div className="global-flex-start">
                    <div
                      className={
                        selectedActionTabIndex === 4
                          ? 'poppins-20-700 global-pointer me-3'
                          : 'poppins-20-700-gray global-pointer me-3'
                      }
                      onClick={() => setSelectedActionTabIndex(4)}
                    >
                      Listings
                    </div>
                    <div
                      className={
                        selectedActionTabIndex === 5
                          ? 'poppins-20-700 global-pointer me-3'
                          : 'poppins-20-700-gray global-pointer me-3'
                      }
                      onClick={() => setSelectedActionTabIndex(5)}
                    >
                      Redemptions
                    </div>
                  </div>
                  <div className="global-flex-lg-between-sm-center my-2">
                    {actionTabList.map((item, index) =>
                      selectedActionTabIndex === item.id ? (
                        <div
                          key={index}
                          className="poppins-14-500 mx-2 global-pointer"
                          onClick={() => setSelectedActionTabIndex(item.id)}
                        >
                          {item?.label}
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="poppins-14-500-gray mx-2 global-pointer"
                          onClick={() => setSelectedActionTabIndex(item.id)}
                        >
                          {item?.label}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  {selectedActionTabIndex === 4 && (
                    <>
                      {[0, 1, 2].map(index => (
                        <div className="my-4" key={index}>
                          <ListingCard handleClickActive={() => handleClickActive(index)} />
                        </div>
                      ))}
                    </>
                  )}
                  {selectedActionTabIndex === 5 && (
                    <>
                      {[0, 1, 2].map(index => (
                        <div className="my-4" key={index}>
                          <RedemptionCard
                            handleClickAccept={() => handleClickAccept(index)}
                            handleClickDeny={() => handleClickDeny(index)}
                          />
                        </div>
                      ))}
                    </>
                  )}
                  {selectedActionTabIndex === 0 && (
                    <>
                      <div className="my-4">
                        <div className="poppins-20-700">Inactive page</div>
                      </div>
                    </>
                  )}
                  {selectedActionTabIndex === 1 && (
                    <>
                      <div className="my-4">
                        <div className="poppins-20-700">Active page</div>
                      </div>
                    </>
                  )}
                  {selectedActionTabIndex === 2 && (
                    <>
                      <div className="my-4">
                        <div className="poppins-20-700">Sold page</div>
                      </div>
                    </>
                  )}
                  {selectedActionTabIndex === 3 && (
                    <>
                      <div className="my-4">
                        <div className="poppins-20-700">Saved for later page</div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {selectedCategoryTabIndex === 1 && (
              <>
                <div className="global-flex-lg-between-sm-center mb-4">
                  <div className="poppins-20-700">Collection page</div>
                </div>
              </>
            )}
            {selectedCategoryTabIndex === 2 && (
              <>
                <div className="global-flex-lg-between-sm-center mb-4">
                  <div className="poppins-20-700">Transactions page</div>
                </div>
              </>
            )}
            {selectedCategoryTabIndex === 3 && (
              <>
                <div className="global-flex-lg-between-sm-center mb-4">
                  <div className="poppins-20-700">Royalty Pool page</div>
                </div>
              </>
            )}
            {selectedCategoryTabIndex === 4 && (
              <>
                <div className="global-flex-lg-between-sm-center mb-4">
                  <div className="poppins-20-700">Earn liquidity rewards</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
