import React, { useState, useEffect, useMemo } from 'react';
import 'src/styles/TokenDetail.scss';
import 'src/styles/Global.scss';
import DiscodIcon from 'src/assets/images/discord-blue.svg';
// import FavoriteBlackIcon from 'src/assets/images/favorite-black-icon.svg';
// import EyeIcon from 'src/assets/images/eye-icon.svg';
import BenefitCard from 'src/components/BenefitCard';
import TokenDetailComment from 'src/components/TokenDetailComment';
import RoundBorderButton from 'src/components/RoundBorderButton';
import ReactMapGL, { Marker, /* Popup, */ NavigationControl, GeolocateControl, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import {
  createComment,
  getComments,
  newTransaction,
  tokenBuy,
  tokenById,
  tokenDelist,
  updateTokenOwner,
} from 'src/api';
import LoadingPage from 'src/components/LoadingPage';
import toast from 'react-hot-toast';
import Web3 from 'web3';
import { useSelector, useDispatch } from 'react-redux';
import marketplaceABI from 'src/assets/abis/nftMarketplace.json';
import vlrTokenABI from 'src/assets/abis/adValoremToken.json';
import nftABI from 'src/assets/abis/nftAdValorem.json';
import { useHistory } from 'react-router-dom';
import { fetchAllCategories } from 'src/actions/categories';
import { ethers } from 'ethers';
import TransferModal from 'src/components/TransferModal';
import { toFixedTail } from 'src/utils/formartUtils';
import Star from 'src/assets/images/star.svg';
import MultiMediaZoomView from 'src/components/MultiMediaZoomView';
import {
  getEstimateAmount,
  getNativeTokenPrice,
  getQuickPairAddress,
  W_ADDRESS,
  VLR_ADDRESS,
} from 'src/utils/priceProvider';

const { REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS, REACT_APP_NFT_CONTRACT_ADDRESS } =
  process.env;
const web3 = new Web3(window.ethereum);
const marketplaceContract = new web3.eth.Contract(marketplaceABI, REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
const vlrTokenContract = new web3.eth.Contract(vlrTokenABI, REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS);
const nftContract = new web3.eth.Contract(nftABI, REACT_APP_NFT_CONTRACT_ADDRESS);

const TokenDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.items.items);
  const profile = useSelector(state => state.profile);
  const [qrImage, setQRImage] = useState('/img/blank-image.jpg');
  const mapStyleLight = 'mapbox://styles/thyjames/ckyj5984oa25w14o1hnuexh2a';
  const [viewport, setViewport] = useState({
    latitude: 38.57,
    longitude: -121.47,
    width: '100%',
    height: '351px',
    zoom: 1,
  });
  const navStyle = {
    position: 'absolute',
    top: 40,
    left: 0,
    padding: '10px',
  };

  const geolocateControlStyle = {
    right: isMobile ? 40 : 40,
    top: isMobile ? 40 : 40,
  };
  const nearMeHandler = () => {};

  const { account, chainId } = useWeb3React();
  const params = useParams();
  const { tokenId } = params;
  const authToken = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [openTransfer, setOpenTransfer] = useState(false);
  const [vlrAmount, setVlrAmount] = useState('');
  const [vlrBalance, setVlrBalance] = useState(0);
  const [commentStarCount, setCommentStarCount] = useState(-1);
  const [commentText, setCommentText] = useState('');
  const [tokenComments, setTokenComments] = useState([]);
  const [tokenStatus, setTokenStatus] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('VLR');
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [nativePrice, setNativePrice] = useState(0);
  const [unitEstimateOut, setUnitEstimateOut] = useState(0);

  useEffect(() => {
    dispatch(fetchAllCategories());
    getEstimatedVlrPrice();
    // eslint-disable-next-line
  }, [dispatch]);

  const getEstimatedVlrPrice = async () => {
    if (!chainId || !REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS) return;
    const price = await getNativeTokenPrice(137);
    setNativePrice(price);

    const pairAddress = await getQuickPairAddress(W_ADDRESS[137], VLR_ADDRESS[137], 137);
    if (pairAddress === null) return;
    setIsLoading(true);
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
    return;
  };

  const getTokenDetail = async () => {
    try {
      setIsLoading(true);
      let {
        data: { data: token },
      } = await tokenById(tokenId, {
        Authorization: `Bearer ${authToken}`,
      });

      const nftOwner = await nftContract.methods.ownerOf(token?.token_id).call();
      const marketItemInfo = await marketplaceContract.methods.idToMarketItem(token?.market_item_id).call();
      if (nftOwner?.toLowerCase() === account?.toLowerCase()) {
        setTokenStatus('list');
        if (nftOwner.toLowerCase() !== token?.user?.walletAddress.toLowerCase()) {
          await updateTokenOwner(token?.id, { account });
        }
        history.push(`/activate-listing/${token?.id}`);
      }
      if (nftOwner?.toLowerCase() === REACT_APP_MARKETPLACE_CONTRACT_ADDRESS?.toLowerCase()) {
        if (account?.toLowerCase() === marketItemInfo?.seller?.toLowerCase()) {
          setTokenStatus('delist');
        } else {
          setTokenStatus('buy');
        }
      }
      setTokenSymbol(await vlrTokenContract.methods.symbol().call());
      setTokenDecimals(await vlrTokenContract.methods.decimals().call());

      const {
        data: { comments },
      } = await getComments(tokenId);
      setTokenComments(comments);

      setViewport({
        latitude: token?.position?.latitude || 38.57,
        longitude: token?.position?.longitude || -121.47,
        width: '100%',
        height: '351px',
        zoom: 1,
      });
      setNftData(token);
      // setQRImage(
      //   token?.user?.id
      //     ? `${process.env.REACT_APP_RESOURCE_URL}/images/qr-${token?.user?.id}.png`
      //     : '/img/blank-image.jpg'
      // );
      setQRImage(
        token?.id && token?.token_id
          ? `${process.env.REACT_APP_RESOURCE_URL}/images/qr-${token?.id}-${token?.token_id}.png`
          : '/img/blank-image.jpg'
      );

      if (Web3.utils.isAddress(account)) {
        const bal = await vlrTokenContract.methods.balanceOf(account).call();
        setVlrBalance(Number(toFixedTail(web3.utils.fromWei(bal, 'ether'), 4)));
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTokenDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, account, chainId]);

  const isOwner = useMemo(() => {
    if (!nftData) return false;

    return nftData.user.walletAddress === account;
  }, [nftData, account]);

  const handleClickDelist = async () => {
    try {
      setIsLoading(true);
      const { market_item_id: marketItemId, id } = nftData;
      const gasPrice = await web3.eth.getGasPrice();
      const {
        transactionHash,
        blockNumber,
        events: delistEvents,
      } = await marketplaceContract.methods.cancelSale(marketItemId).send({ from: account, gasPrice: gasPrice * 5 });
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      console.log('>>>>>>>>>>>>>>>>>> delistEvents : ', delistEvents);
      let from = web3.eth.abi.decodeParameter('address', delistEvents[1]?.raw?.topics[1]);
      let to = web3.eth.abi.decodeParameter('address', delistEvents[1]?.raw?.topics[2]);

      await tokenDelist(id, {
        hash: transactionHash,
        from: from,
        to: to,
        method: 'delist',
        timestamp: blockTimeStamp,
      });
      setIsLoading(false);
      history.push('/profile?activeTab=created&actionTab=minted');
      // await getTokenDetail()
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  const handleClickBuy = async () => {
    try {
      setIsLoading(true);
      const { market_item_id: marketItemId, id, price, token_id, user } = nftData;
      if (vlrBalance < price) {
        toast.error("You don't have enough VLR token!");
        return;
      }

      const gasPrice = await web3.eth.getGasPrice();
      const allowance = await vlrTokenContract.methods
        .allowance(account, process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS)
        .call();
      console.log('>>>>>>>>>>>>>>> allowance : ', allowance);
      if (web3.utils.fromWei(allowance) < ethers.utils.parseEther('1000000')) {
        console.log('>>>>>>>>>>>>>>>  allowance 111111111111111111111111  : ');
        await vlrTokenContract.methods
          .approve(process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, ethers.constants.MaxUint256)
          .send({ from: account });
      }

      const {
        transactionHash,
        blockNumber,
        events: buyEvents,
      } = await marketplaceContract.methods.buyMarketItem(marketItemId).send({ from: account, gasPrice: gasPrice * 5 });
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      console.log('>>>>>>>>>>>>>>>>>> buyEvents : ', buyEvents);
      let from = REACT_APP_MARKETPLACE_CONTRACT_ADDRESS;
      let to = account;
      if (buyEvents[28]?.raw?.topics[1] && buyEvents[28]?.raw?.topics[2]) {
        from = web3.eth.abi.decodeParameter('address', buyEvents[28]?.raw?.topics[1]);
        to = web3.eth.abi.decodeParameter('address', buyEvents[28]?.raw?.topics[2]);
      }

      window.gtag('event', 'Token Buy', { tokenId: nftData.id });
      window.gtag('event', 'conversion', { send_to: 'AW-826595197/5zZSCPWMvMIDEP2uk4oD' });
      const impactClickId = localStorage.getItem('Impact_ClickId');

      await tokenBuy(id, {
        hash: transactionHash,
        from,
        to,
        method: 'sale',
        timestamp: blockTimeStamp,
        price,
        token_id,
        user_id: user.id,
        wallet_address: user.walletAddress,
        impactClickId: impactClickId === 'null' ? null : impactClickId,
      });
      history.push('/profile?activeTab=created&actionTab=minted');
      setIsLoading(false);
      // await getTokenDetail()
    } catch (err) {
      console.log('Error Buy : ', err?.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleClickDiscord = () => {
    window.open(categories[nftData?.category_id - 1]?.discord);
  };

  const handleClickGift = () => {
    setOpenTransfer(true);
  };

  const handleChangeAmount = e => {
    setVlrAmount(e.target.value);
  };

  const handleClickTransfer = async () => {
    if (!Web3.utils.isAddress(nftData?.user?.walletAddress)) {
      toast.error('Please input valid address.');
      return;
    }
    if (vlrAmount < 1 || vlrAmount > vlrBalance) {
      toast.error('Please input valid amount.');
      return;
    }

    try {
      setOpenTransfer(false);
      setIsLoading(true);
      const amount = web3.utils.toWei(vlrAmount.toString());
      const gasPrice = await web3.eth.getGasPrice();
      const {
        transactionHash,
        blockNumber,
        status,
        events: transferEvents,
      } = await vlrTokenContract.methods
        .transfer(nftData?.user?.walletAddress, amount)
        .send({ from: account, gasPrice: gasPrice * 5 });
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      console.log('>>>>>>>>>>>>>>>>>> transferEvents : ', transferEvents);
      const from = transferEvents?.Transfer[0]?.returnValues?.from || '';
      const to = transferEvents?.Transfer[0]?.returnValues?.to || '';

      if (status) {
        const dbRes = await newTransaction({
          hash: transactionHash,
          from: from,
          to: to,
          token_id: nftData?.token_id,
          price: vlrAmount,
          method: 'vlrTransfer',
          timestamp: blockTimeStamp,
        });
        if (dbRes.status) {
          getTokenDetail();
          setIsLoading(false);
          toast.success('Successfully transfered!');
        }
      }
    } catch (e) {
      console.log('Error ', e);
      setIsLoading(false);
      toast.error(e?.message ? e.message : e);
    }
  };

  const renderMarkers = () => {
    if (nftData?.position?.latitude)
      return (
        <Marker latitude={nftData?.position?.latitude} longitude={nftData?.position?.longitude}>
          <div>
            <img
              src="https://cdn.discordapp.com/attachments/930281959047958589/933009976325210202/Valorem-map-pin.png"
              alt="marker"
            />
          </div>
        </Marker>
      );
  };

  const handleClickComment = async () => {
    if (commentText === '' || commentStarCount === -1) {
      toast.error('Please rate and comment information!');
      return;
    }
    try {
      setIsLoading(true);
      await createComment(tokenId, account, commentStarCount + 1, commentText, profile?.avatar);
      const {
        data: { comments },
      } = await getComments(tokenId);
      setCommentStarCount(-1);
      setCommentText('');
      setTokenComments(comments);
      toast.success('Successfully commented');
      setIsLoading(false);
    } catch (err) {
      console.log('Error TokenDetail Comment : ', err?.message);
      setIsLoading(false);
      toast.error(err?.message);
    }
  };

  const generateArray = count => {
    let arr = [];
    for (let i = 0; i > count; i++) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      {openTransfer && (
        <TransferModal
          title={'Do you wish to transfer VLR token?'}
          modalIsOpen={openTransfer}
          closeModal={() => setOpenTransfer(false)}
          amount={vlrAmount}
          handleChangeAmount={handleChangeAmount}
          handleCancel={() => setOpenTransfer(false)}
          handleConfirm={handleClickTransfer}
          type={'vlrTransfer'}
        />
      )}
      <div className="token-detail-container">
        <div className="row gx-5">
          <div className="col-12 col-lg-7 my-4">
            <MultiMediaZoomView
              src={nftData?.uri || '/img/blank-image.jpg'}
              style={{
                width: '100%',
                height: '380px',
                borderRadius: 5,
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              mediaType={nftData?.media_type}
            />
            <div className="my-1">
              {tokenComments?.map((item, idx) => (
                <div className="global-flex-start my-1" key={idx}>
                  <div style={{ minWidth: '120px' }}>
                    <div className="poppins-14-600-gray me-3">Comments</div>
                    <div className="global-flex-start gap-1">
                      {generateArray(item?.star_count).map(index => (
                        <img alt="alt" src={Star} width={20} height={20} key={index} />
                      ))}
                    </div>
                  </div>
                  <div className="global-flex-start">
                    <img
                      alt="alt"
                      src={item?.writer?.avatar || '/img/default-avatar.png'}
                      style={{ width: 48, height: 40 }}
                      className="me-2"
                    />
                    <div className="poppins-14-400">{item?.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-5 my-4">
            <div className="poppins-20-700">
              {categories?.length > 0 ? categories[nftData?.category_id - 1]?.name : ''}
            </div>
            <div className={isMobile ? 'poppins-24-700' : 'poppins-36-700'}>{nftData?.name}</div>
            {/* <div className="global-flex-start my-3">
              <div className="global-flex-start me-3">
                <img alt="alt" src={EyeIcon} width={25} height={17} className="me-1 global-pointer" />
                <div className="poppins-16-500-gray">5</div>
              </div>
              <div className="global-flex-start">
                <img alt="alt" src={FavoriteBlackIcon} width={21} height={18} className="me-1 global-pointer" />
                <div className="poppins-16-500-gray">10</div>
              </div>
            </div> */}
            <BenefitCard
              nftData={nftData}
              isOwner={isOwner}
              handleClickBuy={handleClickBuy}
              handleClickDelist={handleClickDelist}
              handleClickGift={handleClickGift}
              tokenStatus={tokenStatus}
              tokenAddress={REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS}
              tokenSymbol={tokenSymbol}
              tokenDecimals={tokenDecimals}
              chainId={chainId}
              unitEstimateOut={unitEstimateOut}
              nativePrice={nativePrice}
            />
          </div>
        </div>
        <div className="row gx-5">
          <div className="col-12 col-lg-7 my-4">
            <div>
              <div className="poppins-16-500-gray text-center my-1">Rate this service!</div>
              <div className="global-flex-center">
                <div className="token-detail-service">
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <div
                      key={index}
                      className="poppins-16-500 token-detail-rate global-flex-center global-pointer"
                      style={index === commentStarCount ? { background: '#96F2A4' } : {}}
                      onClick={() => setCommentStarCount(index)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-4">
                <TokenDetailComment
                  commentText={commentText}
                  setCommentText={setCommentText}
                  handleClickComment={handleClickComment}
                  avatar={nftData?.user?.avatar}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 my-4 px-5 d-flex justify-content-center align-items-center">
            <RoundBorderButton
              label={'CONTACT SELLER DIRECT'}
              color={'#2A212E'}
              bgColor={'#FFFFFF'}
              icon={DiscodIcon}
              fullWidth={true}
              onClick={handleClickDiscord}
            />
          </div>
        </div>
        <div className="row gx-5">
          <div className="col-12 col-lg-7 my-4">
            <div style={{ position: 'relative' }}>
              <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle={mapStyleLight}
                onViewportChange={viewport => setViewport(viewport)}
                transitionDuration={500}
                transitionInterpolator={new FlyToInterpolator()}
              >
                {renderMarkers()}
                <div style={navStyle}>
                  <NavigationControl />
                </div>
                <GeolocateControl
                  style={geolocateControlStyle}
                  positionOptions={{ enableHighAccuracy: true }}
                  onClick={nearMeHandler}
                />
              </ReactMapGL>
            </div>
          </div>
          <div className="col-12 col-lg-5 my-4">
            <div className="global-flex-center">
              <img alt="QRcode" src={qrImage} style={{ maxWidth: '300px' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenDetail;
