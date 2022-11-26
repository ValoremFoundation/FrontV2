import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BackgroundButton from 'src/components/BackgroundButton';
import 'src/styles/Home.scss';
import 'src/styles/Global.scss';
import NFTCard from 'src/components/NFTCard';
import NFTCardAvatar from 'src/components/NFTCardAvatar';
import HomeCategoryCard from 'src/components/HomeCategoryCard';
import HomeCateImage1 from 'src/assets/images/home-cate-1.svg';
import HomeCateImage2 from 'src/assets/images/home-cate-2.svg';
import HomeCateImage3 from 'src/assets/images/home-cate-3.svg';
import HomeSearchMan from 'src/assets/images/home-search-man.png';
import HomeSearchInput from 'src/components/HomeSearchInput';
import GoogleLoginModal from 'src/components/GoogleLoginModal';
import { useSelector } from 'react-redux';
import { getProfile, getRandomTokenBuyNum } from 'src/api';
import LoadingPage from 'src/components/LoadingPage';

const Home = () => {
  const history = useHistory();
  const [profile, setProfile] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [randomToken, setRandomToken] = useState([]);
  const authToken = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const params = { num: 3 };
      const {
        data: { tokens },
      } = await getRandomTokenBuyNum(params, {
        Authorization: `Bearer ${authToken}`,
      });

      setRandomToken(tokens);
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isLoading && <LoadingPage />}
      <GoogleLoginModal modalIsOpen={modalIsOpen} closeModal={closeModal} redirectUrl={'/create'} />
      <div className="home-top-section">
        <div className="home-top-overlay">
          <div className="home-top-container">
            <div className="home-top-text-title">
              The new economy for
              <br />
              your community
            </div>
            <div className="home-top-text-middle">Get creative. Get paid. Get royalties.</div>
            <div className="global-flex-start my-4">
              <BackgroundButton label={'Create'} color={'#2A212E'} bgColor={'#96F2A4'} onClick={openModal} />
              <div className="ms-3">
                <BackgroundButton label={'Discover'} color={'#ffffff'} bgColor={'#000000'} />
              </div>
            </div>
            <div className="home-top-text-bottom">How it works?</div>
          </div>
        </div>
      </div>
      <div className="home-trending-container">
        <div className="home-trending-title mb-4">Treding Communities</div>
        <div className="row gx-5">
          {randomToken?.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
              <NFTCard onClick={() => history.push(`/token-detail/${item?.id}`)} token={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="home-browse-container">
        <div className="home-top-text-title">Browse Communities</div>
        <div className="row text-center">
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 p-3" key={index}>
              <NFTCardAvatar />
            </div>
          ))}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 p-3 home-trending-title d-flex justify-content-center align-items-center">
            See all
          </div>
        </div>
      </div>
      <div className="home-bottom-container my-5">
        <div className="row flex-wrap justify-content-around">
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 p-3 d-flex justify-content-center">
            <HomeCategoryCard
              image={HomeCateImage1}
              description={
                'Create and list a service like video editing, paralegal, web design with us we automotically turn it into an NFT for you.'
              }
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 p-3 d-flex justify-content-center">
            <HomeCategoryCard
              image={HomeCateImage2}
              description={
                'Once customers recieve their order they will have the option to resell your services on the market.'
              }
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 p-3 d-flex justify-content-center">
            <HomeCategoryCard
              image={HomeCateImage3}
              description={'Collect royalties when your customers resell your services!'}
            />
          </div>
        </div>
        <div className="home-bottom-search-section mt-5">
          <div className="row flex-wrap justify-content-between">
            <div className="col-12 col-md-7 col-lg-7 home-cate-search-section">
              <div className="home-cate-search-title">Search categories</div>
              <HomeSearchInput placeholder={'What are you looking for?'} />
            </div>
            <div className="col-12 col-md-5 col-lg-5 home-cate-search-image">
              <img alt="alt" src={HomeSearchMan} width={'100%'} style={{ objectFit: 'cover', maxWidth: 330 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
