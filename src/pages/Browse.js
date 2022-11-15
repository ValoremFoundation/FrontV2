import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'src/styles/Browse.scss';
import 'src/styles/Global.scss';
import { isMobile } from 'react-device-detect';
import CustomBlackRadio from 'src/components/CustomBlackRadio';
import { useState } from 'react';
import NFTCard from 'src/components/NFTCard';
import { getTokensByFilters } from 'src/api';
import LoadingPage from 'src/components/LoadingPage';
import { useSelector, useDispatch } from 'react-redux';

const Browse = () => {
  const history = useHistory();
  const profile = useSelector(state => state.profile);
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const handleChangeOption = event => {
    console.log('>>>>>>>>>>>>>>>>>> : ', event.target.value);
  };
  const categoryTabList = [
    {
      id: 0,
      label: 'On the rise',
    },
    {
      id: 1,
      label: 'Artists',
    },
    {
      id: 2,
      label: 'Content Creator',
    },
    {
      id: 3,
      label: 'Video Editing',
    },
    {
      id: 4,
      label: 'UX Design',
    },
    {
      id: 5,
      label: 'Social Media',
    },
    {
      id: 6,
      label: 'Video Explainer',
    },
  ];

  const getAllTokens = async () => {
    setIsLoading(true);
    let {
      data: { data: token },
    } = await getTokensByFilters();
    console.log('>>>>>>>>>>>>>>>>> all tokens ', token);
    setNftData(token);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTokens();
  }, []);

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="browser-container">
        <div className={isMobile ? 'poppins-24-600' : 'poppins-36-600'}>Discover Creators</div>
        <div className={isMobile ? 'poppins-16-600-gray' : 'poppins-20-400-gray'}>
          Learn how you can make money on services your purchase?
        </div>
        <div className="global-flex-start flex-wrap my-4">
          <div className="me-3 my-1">
            <CustomBlackRadio label={'Digital Creators'} value={'digital'} onChange={handleChangeOption} />
          </div>
          <div className="me-3 my-1">
            <CustomBlackRadio label={'Brick & Mortar Creators'} value={'brick'} onChange={handleChangeOption} />
          </div>
        </div>
        <div className="global-flex-lg-start-sm-center">
          {categoryTabList.map((item, index) =>
            item.id === selectedTabIndex ? (
              <div
                key={index}
                className="poppins-16-600 browser-selected-tab-text me-5 my-1"
                onClick={() => setSelectedTabIndex(item.id)}
              >
                {item.label}
              </div>
            ) : (
              <div
                key={index}
                className="poppins-16-600  browser-tab-text me-5 my-1"
                onClick={() => setSelectedTabIndex(item.id)}
              >
                {item.label}
              </div>
            )
          )}
        </div>
        <div className="my-4">
          {selectedTabIndex === 0 && (
            <div className="row gx-5">
              {nftData?.map((token, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
                  <NFTCard onClick={() => history.push(`/token-detail/${token?.id}`)} token={token} profile={profile} />
                </div>
              ))}
            </div>
          )}
          {selectedTabIndex === 1 && (
            <div className="row gx-5">
              {[0, 1, 2].map(index => (
                <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
                  <NFTCard onClick={() => history.push(`/token-detail/${index}`)} />
                </div>
              ))}
            </div>
          )}
          {selectedTabIndex === 2 && (
            <div>
              <div className="poppins-20-600">Content Creator page</div>
            </div>
          )}
          {selectedTabIndex === 3 && (
            <div>
              <div className="poppins-20-600">Video Editing page</div>
            </div>
          )}
          {selectedTabIndex === 4 && (
            <div>
              <div className="poppins-20-600">UX Design page</div>
            </div>
          )}
          {selectedTabIndex === 5 && (
            <div>
              <div className="poppins-20-600">Social Media page</div>
            </div>
          )}
          {selectedTabIndex === 6 && (
            <div>
              <div className="poppins-20-600">Video Explainer page</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Browse;
