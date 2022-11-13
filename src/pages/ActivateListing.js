import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'src/styles/ActivateListing.scss';
import 'src/styles/Global.scss';
import { useSelector, useDispatch } from 'react-redux';
import Avatar2 from 'src/assets/images/avatar-1.png';
import NFTCard from 'src/components/NFTCard';
import ActivateListingCard from 'src/components/ActivateListingCard';
import UserWithName from 'src/components/UserWithName';
import StepOrder from 'src/components/StepOrder';
import {
  user1InfoListing,
  user2InfoListing,
  user3InfoListing,
  user4InfoListing,
  step1Listing,
  step2Listing,
  step3Listing,
} from 'src/constants';
import { useParams } from 'react-router';
import { tokenById, tokenList } from 'src/api';
import LoadingPage from 'src/components/LoadingPage';
import toast from 'react-hot-toast';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import marketplaceABI from 'src/assets/abis/nftMarketplace.json';
import nftABI from 'src/assets/abis/nftAdValorem.json';
import royaltyPoolABI from 'src/assets/abis/royaltyPool.json';
import vlrTokenABI from 'src/assets/abis/adValoremToken.json';

const { REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, REACT_APP_NFT_CONTRACT_ADDRESS, REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS } =
  process.env;
const web3 = new Web3(window.ethereum);
const marketplaceContract = new web3.eth.Contract(marketplaceABI, REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
const nftContract = new web3.eth.Contract(nftABI, REACT_APP_NFT_CONTRACT_ADDRESS);
const vlrTokenContract = new web3.eth.Contract(vlrTokenABI, REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS);
const zeroAddress = '0x0000000000000000000000000000000000000000';

const ActivateListing = () => {
  const history = useHistory();
  const { account, chainId } = useWeb3React();
  const params = useParams();
  const { tokenId } = params;
  const authToken = useSelector(state => state.auth.token);
  const profile = useSelector(state => state.profile);
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [price, setPrice] = useState(0);

  const getTokenDetail = async () => {
    setIsLoading(true);
    let {
      data: { data: token },
    } = await tokenById(tokenId, {
      Authorization: `Bearer ${authToken}`,
    });
    setNftData(token);
    setIsLoading(false);
  };

  useEffect(() => {
    getTokenDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleClickList = async () => {
    if (price < 0.5) {
      toast.error('The value should be bigger than 0.5');
      return;
    }
    try {
      setIsLoading(true);
      const tokenPrice = Web3.utils.toWei(price);
      const approvedAddress = await nftContract.methods.getApproved(nftData.token_id).call();
      const gasPrice = await web3.eth.getGasPrice();
      if (approvedAddress === zeroAddress) {
        await nftContract.methods
          .approve(process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, nftData.token_id)
          .send({ from: account, gasPrice: gasPrice * 5 });
      }

      const { events } = await marketplaceContract.methods
        .createMarketItem(
          process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
          nftData.token_id,
          nftData.creator * 100,
          nftData.reseller * 100,
          nftData.royalty_pool * 100
        )
        .send({ from: account, gasPrice: gasPrice * 5 });

      window.gtag('event', 'Token List', { tokenId: nftData.id });
      window.gtag('event', 'conversion', { send_to: 'AW-826595197/Xd_8CPKMvMIDEP2uk4oD' });

      const { itemId } = events.MarketItemCreated.returnValues;

      const { from, to, transactionHash, blockNumber } = await marketplaceContract.methods
        .sellMarketItem(nftData.token_id, Web3.utils.toWei(price))
        .send({ from: account, gasPrice: gasPrice * 5 });

      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);

      await tokenList(nftData.id, {
        hash: transactionHash,
        from: to,
        to: from,
        method: 'list',
        marketItemId: itemId,
        price: price,
        timestamp: blockTimeStamp,
      });
      setIsLoading(false);
      await getTokenDetail();
      toast.success('Listed for sale success');
    } catch (err) {
      console.log('Error listing : ', err?.message);
      setIsLoading(false);
    }
  };

  const handleClickBurn = () => {};

  const handleClickTransfer = () => {};

  const handleChangePrice = e => {
    setPrice(e.target.value);
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="activate-listing-container">
        <div style={{ background: '#ffffff', position: 'relative', height: '192px' }}>
          <img
            alt="banner-image"
            src={profile?.cover_photo || '/img/default-banner.png'}
            width={'100%'}
            height={192}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="global-pointer"
          />
        </div>
        <div className="avatar-container">
          <img
            alt="avatar-image"
            src={profile?.avatar || '/img/default-avatar.png'}
            width={140}
            height={140}
            className="avatar-image global-pointer"
          />
        </div>
        <div style={{ background: '#F4F5FB' }}>
          <div className="listing-sub-container">
            <div className="listing-second-section">
              <div className="row gx-5">
                <div className="col-12 col-lg-4 my-4">
                  <NFTCard token={nftData} profile={profile} price={price} />
                </div>
                <div className="col-12 col-lg-8 my-4">
                  <ActivateListingCard
                    handleClickList={handleClickList}
                    handleClickBurn={handleClickBurn}
                    handleClickTransfer={handleClickTransfer}
                    price={price}
                    handleChangePrice={handleChangePrice}
                  />
                </div>
              </div>
              <div className="listing-service-price my-4">
                <div className="poppins-24-600">Activating your service and setting a price</div>
                <div className="poppins-20-500 my-3">Remember this example?</div>
                <div className="global-flex-lg-between-sm-center">
                  <UserWithName userInfo={user1InfoListing} />
                  <StepOrder step={step1Listing} existGift={user1InfoListing?.gift.length} />
                  <UserWithName userInfo={user2InfoListing} />
                  <StepOrder step={step2Listing} existGift={user1InfoListing?.gift.length} />
                  <UserWithName userInfo={user3InfoListing} />
                  <StepOrder step={step3Listing} existGift={user1InfoListing?.gift.length} />
                  <UserWithName userInfo={user4InfoListing} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivateListing;
