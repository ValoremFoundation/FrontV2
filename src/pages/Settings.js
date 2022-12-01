import React, { useRef, useState, useEffect } from 'react';
import 'src/styles/Settings.scss';
import 'src/styles/Global.scss';
import TextInput from 'src/components/TextInput';
import EditIcon from 'src/assets/images/editIcon.svg';
import BackgroundButton from 'src/components/BackgroundButton';
import { getProfile, updateProfile, uploadFile } from 'src/api';
import LoadingPage from 'src/components/LoadingPage';

const Settings = () => {
  const bannerRef = useRef(null);
  const avatarRef = useRef(null);
  const [bannerFile, setBannerFile] = useState('');
  const [avatarFile, setAvatarFile] = useState('');
  const [bannerSource, setBannerSource] = useState('/img/blank-image.jpg');
  const [avatarSource, setAvatarSource] = useState('/img/default-avatar.png');
  const [name, setName] = useState('');
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState([]);
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (!authToken) return;
        setIsLoading(true);
        const {
          data: { data: profileInfo },
        } = await getProfile({
          Authorization: `Bearer ${authToken}`,
        });
        setProfile(profileInfo);
        setIsLoading(false);
      } catch (err) {
        console.log('Error Settings : ', err);
        setIsLoading(false);
      }
    };
    setGeoLocation({ latitude: 0, longitude: 0 });
    getProfileData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!profile) return;
    setName(profile?.name);
    setHeader(profile?.header);
    setDescription(profile?.description);
    setAvatarSource(profile?.avatar || '/img/default-avatar.png');
    setBannerSource(profile?.cover_photo || '/img/blank-image.jpg');
  }, [profile]);

  const handleCoverPhotoInputChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setBannerFile(file);
    setBannerSource(window.URL.createObjectURL(file));
  };

  const handleAvatarInputChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarSource(window.URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const formData1 = new FormData();
      let profileInfo = profile;

      profileInfo.name = name;
      profileInfo.header = header;
      profileInfo.description = description;
      profileInfo.geoLocation = geoLocation;

      if (avatarFile) {
        formData.append('file', avatarFile);
        const {
          data: { file: _avatarSource },
        } = await uploadFile(formData);
        profileInfo.avatar = _avatarSource;
      }

      if (bannerFile) {
        formData1.append('file', bannerFile);
        const {
          data: { file: _bannerSource },
        } = await uploadFile(formData1);
        profileInfo.cover_photo = _bannerSource;
      }

      const {
        data: { data: newProfile },
      } = await updateProfile(profileInfo, {
        Authorization: `Bearer ${authToken}`,
      });
      localStorage.setItem('userName', name);
      setProfile(newProfile);
      setIsLoading(false);
    } catch (err) {
      console.log('Error Setting Save : ', err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="settings-container">
        <p className="poppins-32-500">Profile Details</p>
        <div className="my-4">
          <TextInput label={'Username'} type={'text'} value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="my-4">
          <TextInput label={'Email'} type={'text'} value={profile?.email} disabled={true} />
        </div>
        <div className="my-4">
          <TextInput label={'Header'} type={'text'} value={header} onChange={e => setHeader(e.target.value)} />
        </div>
        <div className="my-4">
          <TextInput
            label={'Description'}
            type={'textarea'}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="my-4">
          <div className="poppins-14-500 mb-1">{'Profile Image'}</div>
          <div className="settings-avatar-container">
            <div style={{ width: 'fit-content', position: 'relative' }}>
              <img
                alt="avatar"
                src={avatarSource}
                width={140}
                height={140}
                className="settings-avatar-image global-pointer"
                onClick={() => avatarRef.current.click()}
              />
              <div
                className={'settings-avatar-imgOverlay'}
                style={{ borderRadius: '50%' }}
                onClick={() => avatarRef.current.click()}
              >
                <img src={EditIcon} width="40" height="40" color="white" alt="edit" />
              </div>
              <input ref={avatarRef} type="file" className="d-none" onChange={handleAvatarInputChange} />
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="poppins-14-500 mb-1">{'Profile Banner'}</div>
          <div className="settings-banner-container">
            <img
              alt="banner"
              src={bannerSource}
              width={'100%'}
              height={192}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="global-pointer"
              onClick={() => bannerRef.current.click()}
            />
            <div className={'settings-imgOverlay'} onClick={() => bannerRef.current.click()}>
              <img src={EditIcon} width="40" height="40" color="white" alt="edit" />
            </div>
            <input ref={bannerRef} type="file" className="d-none" onChange={handleCoverPhotoInputChange} />
          </div>
        </div>
        <div className="mt-5">
          <BackgroundButton label={'Save'} color={'#2A212E'} bgColor={'#96F2A4'} onClick={handleSave} />
        </div>
      </div>
    </>
  );
};

export default Settings;
