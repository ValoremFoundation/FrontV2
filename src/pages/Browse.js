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
import SelectInput from 'src/components/SelectInput';

const Browse = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.items.items);
  const profile = useSelector(state => state.profile);
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [remotePerson, setRemotePerson] = useState('remote');
  const [category, setCategory] = useState(0);

  useEffect(() => {
    dispatch(fetchAllCategories());
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

  const filteredData = useMemo(
    () =>
      nftData?.filter(item =>
        parseInt(category) === 0
          ? item?.remote_person === remotePerson
          : item?.remote_person === remotePerson && item?.category_id === parseInt(category)
      ),
    [nftData, category, remotePerson]
  );

  const handleChangeRemotePerson = e => {
    setRemotePerson(e.target.value);
  };

  const handleChangeCategory = e => {
    setCategory(e.target.value);
  };

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
            <CustomRadio
              label={'Remote'}
              value={'remote'}
              variable={remotePerson}
              onChange={handleChangeRemotePerson}
            />
          </div>
          <div className="me-3 my-1">
            <CustomRadio
              label={'In Person'}
              value={'person'}
              variable={remotePerson}
              onChange={handleChangeRemotePerson}
            />
          </div>
        </div>
        <div style={{ maxWidth: '350px' }}>
          <SelectInput
            label={'Category'}
            placeFolder={'Select Category'}
            value={category}
            options={categories}
            onChange={handleChangeCategory}
          />
        </div>
        <div className="row gx-5 my-4">
          {filteredData?.length > 0 ? (
            filteredData.map((item, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
                <NFTCard onClick={() => history.push(`/token-detail/${item?.id}`)} profile={profile} token={item} />
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
