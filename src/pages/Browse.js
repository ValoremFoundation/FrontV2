import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import 'src/styles/Browse.scss';
import 'src/styles/Global.scss';
import { isMobile } from 'react-device-detect';
import { useState } from 'react';
import NFTCard from 'src/components/NFTCard';
import { getTokensByFilters } from 'src/api';
import LoadingPage from 'src/components/LoadingPage';
import CustomRadio from 'src/components/CustomRadio';
import { fetchAllCategories } from 'src/actions/categories';
import { useSelector, useDispatch } from 'react-redux';
import Tabs, { Tab } from 'src/components/Browse/LineTab';
import RoundBorderButton from 'src/components/RoundBorderButton';
import { useWeb3React } from '@web3-react/core';
import toast from 'react-hot-toast';

const Browse = () => {
  const history = useHistory();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const propsCategory = history.location?.category?.data;
  const propsTokenName = history.location?.name?.data;
  const categories = useSelector(state => state.categories.items.items);
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [remotePerson, setRemotePerson] = useState('remote');
  const [category, setCategory] = useState(1);
  const [searchAll, setSearchAll] = useState('');
  const [searchTokenName, setSearchTokenName] = useState('');

  useEffect(() => {
    dispatch(fetchAllCategories());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (propsCategory) setSearchAll('all');
    if (propsTokenName) setSearchTokenName(propsTokenName);
  }, [propsCategory, propsTokenName]);

  useEffect(() => {
    if (propsTokenName) setSearchTokenName(propsTokenName);
    // eslint-disable-next-line
  }, []);

  const getAllTokens = async () => {
    setIsLoading(true);
    let {
      data: { data: token },
    } = await getTokensByFilters();
    setNftData(token);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTokens();
  }, []);

  const filteredData = useMemo(() => {
    if (searchAll === 'all') {
      return nftData;
    } else if (searchTokenName) {
      return nftData?.filter(item => item?.name?.toLowerCase().match(searchTokenName));
    } else {
      return nftData?.filter(item => item.remote_person === remotePerson && item?.category_id === parseInt(category));
    }
  }, [nftData, category, remotePerson, searchAll, searchTokenName]);

  const sortedCategories = useMemo(() => categories?.sort((a, b) => (a.name > b.name ? 1 : -1)), [categories]);

  const handleChangeRemotePerson = e => {
    setRemotePerson(e.target.value);
    setSearchAll('');
    setSearchTokenName('');
  };

  const handleClickNFTCard = itemId => {
    if (account) {
      history.push(`/token-detail/${itemId}`);
    } else {
      toast.error('Please connect wallet!');
      return;
    }
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="browser-container">
        <div className={isMobile ? 'poppins-24-600' : 'poppins-36-600'}>Discover Creators</div>
        <div className={isMobile ? 'poppins-16-600-gray' : 'poppins-20-400-gray'}>
          Learn how you can make money on services you purchase?
        </div>
        <div className="global-flex-between flex-wrap my-4">
          <div className="global-flex-start flex-wrap">
            <div className="me-3 my-1">
              <CustomRadio
                label={'Digital Creators'}
                value={'remote'}
                variable={remotePerson}
                onChange={handleChangeRemotePerson}
              />
            </div>
            <div className="me-3 my-1">
              <CustomRadio
                label={'Brick & Mortar Creators'}
                value={'person'}
                variable={remotePerson}
                onChange={handleChangeRemotePerson}
              />
            </div>
          </div>
          <RoundBorderButton
            label={'Search All'}
            color={searchAll === 'all' ? '#2DC015' : '#202020'}
            onClick={() => {
              setSearchAll('all');
              setCategory(-1);
              setSearchTokenName('');
              setRemotePerson('');
            }}
          />
        </div>
        <Tabs>
          {sortedCategories?.map((item, index) => (
            <Tab
              key={index}
              active={category === item.id}
              onClick={() => {
                setCategory(item.id);
                setSearchTokenName('');
                setSearchAll('');
              }}
            >
              {item.name}
            </Tab>
          ))}
        </Tabs>
        <div className="row gx-5 my-4">
          {filteredData?.length > 0 ? (
            filteredData.map((item, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
                <NFTCard onClick={() => handleClickNFTCard(item?.id)} token={item} />
              </div>
            ))
          ) : (
            <div className="poppins-20-600 text-center">No Data</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Browse;
