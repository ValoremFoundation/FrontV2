import React, { useState, useEffect } from 'react';
import 'src/styles/Public.scss';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingPage from 'src/components/LoadingPage';
import { useParams } from 'react-router';
import { getTokensByFilters, getUsers } from 'src/api';
import NFTCard from 'src/components/NFTCard';
import { useWeb3React } from '@web3-react/core';
import toast from 'react-hot-toast';
import {
  getEstimateAmount,
  getNativeTokenPrice,
  getQuickPairAddress,
  W_ADDRESS,
  VLR_ADDRESS,
} from 'src/utils/priceProvider';

const Public = () => {
  const history = useHistory();
  const params = useParams();
  const { walletAddress } = params;
  const { account, chainId } = useWeb3React();
  const [nftData, setNftData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [nativePrice, setNativePrice] = useState(0);
  const [unitEstimateOut, setUnitEstimateOut] = useState(0);

  const getAllTokensByWallet = async () => {
    try {
      const { data: oneUser } = await getUsers(walletAddress);
      setUserInfo(oneUser);
      let {
        data: { data: token },
      } = await getTokensByFilters(`user=${oneUser?.id}`);
      setNftData(token);
      getEstimatedVlrPrice();
    } catch (err) {
      console.log('Error: ', err?.message);
      setIsLoading(false);
    }
  };

  const getEstimatedVlrPrice = async () => {
    if (!chainId || !process.env.REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS) return;
    const price = await getNativeTokenPrice(137);
    setNativePrice(price);

    const pairAddress = await getQuickPairAddress(W_ADDRESS[137], VLR_ADDRESS[137], 137);
    if (pairAddress === null) return;
    getEstimateAmount(
      W_ADDRESS[137], // inputToken?.address,
      VLR_ADDRESS[137], // outputToken?.address,
      1, // unit amount
      137 // chainId
    )
      .then(res => {
        setUnitEstimateOut(Number(res));
        setIsLoading(false);
      })
      .catch(err => {
        console.log('unit price error', err);
        setUnitEstimateOut(0);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllTokensByWallet();
    setIsLoading(false);
  }, [walletAddress]);

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
      <div className="public-container">
        <div style={{ background: '#ffffff', position: 'relative', height: '192px' }}>
          <img
            alt="banner"
            src={userInfo?.cover_photo || '/img/default-banner.png'}
            width={'100%'}
            height={192}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="global-pointer"
          />
        </div>
        <div className="avatar-container">
          <img
            alt="avatar"
            src={userInfo?.avatar || '/img/default-avatar.png'}
            width={140}
            height={140}
            className="avatar-image global-pointer"
          />
        </div>
        <div className="public-middle-container p-4">
          <p className="poppins-24-700">{userInfo?.name}</p>
          <p className="poppins-16-500">{userInfo?.header}</p>
          <div className="row">
            <div className="col-12 col-lg-6">
              <p className="cursor-pointer poppins-16-500">{userInfo?.description}</p>
            </div>
          </div>
          <div className="row gx-5 my-4">
            {nftData?.length > 0 ? (
              nftData.map((item, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
                  <NFTCard
                    onClick={() => handleClickNFTCard(item?.id)}
                    token={item}
                    nativePrice={nativePrice}
                    unitEstimateOut={unitEstimateOut}
                  />
                </div>
              ))
            ) : (
              <div className="poppins-20-600 text-center">No Data</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Public;
