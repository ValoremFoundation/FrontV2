import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'src/styles/ActivateListing.scss';
import 'src/styles/Global.scss';
import { useSelector, useDispatch } from 'react-redux';
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
import { tokenBurn, tokenById, tokenList, tokenTransfer } from 'src/api';
import LoadingPage from 'src/components/LoadingPage';
import toast from 'react-hot-toast';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import marketplaceABI from 'src/assets/abis/nftMarketplace.json';
import nftABI from 'src/assets/abis/nftAdValorem.json';
import royaltyPoolABI from 'src/assets/abis/royaltyPool.json';
import vlrTokenABI from 'src/assets/abis/adValoremToken.json';
import TransferModal from 'src/components/TransferModal';

const {
  REACT_APP_MARKETPLACE_CONTRACT_ADDRESS,
  REACT_APP_NFT_CONTRACT_ADDRESS,
  REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_ROYALTY_POOL_CONTRACT_ADDRESS,
} = process.env;
const web3 = new Web3(window.ethereum);
const marketplaceContract = new web3.eth.Contract(marketplaceABI, REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
const nftContract = new web3.eth.Contract(nftABI, REACT_APP_NFT_CONTRACT_ADDRESS);
const vlrTokenContract = new web3.eth.Contract(vlrTokenABI, REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS);
const royaltyContract = new web3.eth.Contract(royaltyPoolABI, REACT_APP_ROYALTY_POOL_CONTRACT_ADDRESS);
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
  const [openTransfer, setOpenTransfer] = useState(false);
  const [transferAddress, setTransferAddress] = useState('');
  const [businessOwnerPercent, setBusinessOwnerPercent] = useState(0);
  const [buyerPercent, setBuyerPercent] = useState(0);
  const [marketOwnerPercent, setMarketOwnerPercent] = useState(0);

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

  const getRoyaltyInfo = async () => {
    setBusinessOwnerPercent((await royaltyContract.methods.businessOwnerPercent().call()) / 100);
    setBuyerPercent((await royaltyContract.methods.buyerPercent().call()) / 100);
    setMarketOwnerPercent((await royaltyContract.methods.marketOwnerPercent().call()) / 100);
  };

  useEffect(() => {
    try {
      getTokenDetail();
      getRoyaltyInfo();
    } catch (err) {
      console.log('Error ActivateListing : ', err.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, account]);

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
      const approvedAll = await nftContract.methods
        .isApprovedForAll(account, process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS)
        .call();
      if (!approvedAll) {
        await nftContract.methods
          .setApprovalForAll(process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, true)
          .send({ from: account });
      }
      // if (approvedAddress === zeroAddress) {
      //   await nftContract.methods
      //     .approve(process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, nftData.token_id)
      //     .send({ from: account, gasPrice: gasPrice * 5 });
      // }

      // const { events } = await marketplaceContract.methods
      //   .createMarketItem(
      //     process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
      //     nftData.token_id,
      //     nftData.creator * 100,
      //     nftData.reseller * 100,
      //     nftData.royalty_pool * 100
      //   )
      //   .send({ from: account, gasPrice: gasPrice * 5 });
      // const { itemId } = events.MarketItemCreated.returnValues;

      window.gtag('event', 'Token List', { tokenId: nftData.id });
      window.gtag('event', 'conversion', { send_to: 'AW-826595197/Xd_8CPKMvMIDEP2uk4oD' });

      const {
        transactionHash,
        blockNumber,
        events: listEvents,
      } = await marketplaceContract.methods
        .sellMarketItem(nftData?.market_item_id, Web3.utils.toWei(price))
        .send({ from: account, gasPrice: gasPrice * 5 });
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      console.log('>>>>>>>>>>>>>>>>>> listEvents : ', listEvents);
      let from = web3.eth.abi.decodeParameter('address', listEvents[1]?.raw?.topics[1]);
      let to = web3.eth.abi.decodeParameter('address', listEvents[1]?.raw?.topics[2]);

      await tokenList(nftData.id, {
        hash: transactionHash,
        from: from,
        to: to,
        method: 'list',
        // marketItemId: itemId,
        price: price,
        timestamp: blockTimeStamp,
      });
      setIsLoading(false);
      history.push(`/token-detail/${nftData?.id}`);
      // await getTokenDetail();
      toast.success('Listed for sale success');
    } catch (err) {
      console.log('Error listing : ', err?.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleClickBurn = async () => {
    try {
      setIsLoading(true);
      const { token_id, id } = nftData;
      const gasPrice = await web3.eth.getGasPrice();
      const {
        transactionHash,
        blockNumber,
        events: burnEvents,
      } = await nftContract.methods.burn(token_id).send({ from: account, gasPrice: gasPrice * 5 });
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      console.log('>>>>>>>>>>>>>>> burnEvents : ', burnEvents);
      const from = burnEvents?.Transfer?.returnValues?.from;
      const to = burnEvents?.Transfer?.returnValues?.to;

      await tokenBurn(id, {
        hash: transactionHash,
        from: from,
        to: to,
        method: 'burn',
        timestamp: blockTimeStamp,
      });

      setIsLoading(false);
      history.push('/profile?activeTab=created&actionTab=minted');
      // await getTokenDetail();
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  const handleClickTransfer = async () => {
    const { id, token_id: tokenId } = nftData;
    if (!Web3.utils.isAddress(transferAddress)) {
      toast.error('Invalid Address');
      return;
    }
    setIsLoading(true);
    const gasPrice = await web3.eth.getGasPrice();
    try {
      const {
        transactionHash,
        blockNumber,
        events: transferEvents,
      } = await nftContract.methods
        .safeTransferFrom(account, transferAddress, tokenId)
        .send({ from: account, gasPrice: gasPrice * 5 });
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      const from = transferEvents?.Transfer?.returnValues?.from;
      const to = transferEvents?.Transfer?.returnValues?.to;

      console.log('>>>>>>>>>>>>>>>>> 111111111111 transferEvents :', transferEvents);
      await tokenTransfer(id, {
        hash: transactionHash,
        from,
        to,
        method: 'transfer',
        timestamp: blockTimeStamp,
      });

      setIsLoading(false);
      toast.success('Transfer success!');
      history.push('/profile?activeTab=created&actionTab=listed');
      await getTokenDetail();
    } catch (err) {
      console.log('Error Transfer : ', err.message);
      setIsLoading(false);
    }
  };

  const handleChangePrice = e => {
    setPrice(e.target.value);
  };

  const handleChangeAddress = e => {
    setTransferAddress(e.target.value);
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      {openTransfer && (
        <TransferModal
          title={'Do you wish to transfer this NFT?'}
          modalIsOpen={openTransfer}
          closeModal={() => setOpenTransfer(false)}
          address={transferAddress}
          handleChangeAddress={handleChangeAddress}
          handleCancel={() => setOpenTransfer(false)}
          handleConfirm={handleClickTransfer}
        />
      )}
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
                  <NFTCard token={nftData} price={price} />
                </div>
                <div className="col-12 col-lg-8 my-4">
                  <ActivateListingCard
                    handleClickList={handleClickList}
                    handleClickBurn={handleClickBurn}
                    handleClickTransfer={() => setOpenTransfer(true)}
                    price={price}
                    handleChangePrice={handleChangePrice}
                    token={nftData}
                    businessOwnerPercent={businessOwnerPercent}
                    buyerPercent={buyerPercent}
                    marketOwnerPercent={marketOwnerPercent}
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
