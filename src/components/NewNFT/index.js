import React, { useEffect, memo, useRef } from 'react';
import 'src/styles/Global.scss';
import { useState } from 'react';
import Accordian from 'src/components/Accordian';
import RoundBorderButton from '../RoundBorderButton';
import CustomRadio from '../CustomRadio';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import { giftCardOptions } from 'src/constants';
import { fetchAllCategories } from 'src/actions/categories';
import { useSelector, useDispatch } from 'react-redux';
import MultiMediaView from '../MultiMediaView';

const NewNFT = memo(({ index, itemNFT, handleChangeArrayNFT, handleRemoveNFT, editable = false }) => {
  const dispatch = useDispatch();
  const avatarRef = useRef(null);
  const [statusOpen, setStatusOpen] = useState(editable || false);
  const categories = useSelector(state => state.categories.items.items);

  useEffect(() => {
    dispatch(fetchAllCategories());
    // eslint-disable-next-line
  }, []);

  return (
    <Accordian
      title={itemNFT?.name.value ? itemNFT?.name.value : `New NFT #${index + 1}`}
      active={statusOpen}
      toogleAccordian={() => {
        setStatusOpen(!statusOpen);
      }}
    >
      <div>
        <div className="global-flex-between flex-wrap my-4">
          <div className="global-flex-start my-4">
            <MultiMediaView
              src={itemNFT?.imageUrl.value}
              style={{ width: 100, height: 100, borderRadius: 64, objectFit: 'cover', objectPosition: 'center' }}
              mediaType={itemNFT?.type}
              height={'revert'}
            />
            <div className="poppins-14-400 ms-2">
              {itemNFT?.fileName.value}
              <span className="err-text">{itemNFT?.fileName.error && '**require**'}</span>
            </div>
          </div>

          <div className="my-2">
            <RoundBorderButton label={'Choose NFT '} color={'#2DC015'} onClick={() => avatarRef.current.click()} />
            <input
              ref={avatarRef}
              type="file"
              className="d-none"
              onChange={e => handleChangeArrayNFT(e, 'file', index)}
            />
          </div>
        </div>
        <div>
          <div className="row gx-5">
            <div className="col-12 col-lg-6 my-2">
              <TextInput
                label={'Name of service'}
                type={'text'}
                value={itemNFT?.name.value}
                require={itemNFT?.name.error}
                onChange={e => handleChangeArrayNFT(e, 'name', index)}
              />
            </div>
            <div className="col-12 col-lg-6 my-2">
              <SelectInput
                label={'Category'}
                placeFolder={'Select Category'}
                value={itemNFT?.category.value}
                require={itemNFT?.category.error}
                options={categories}
                onChange={e => handleChangeArrayNFT(e, 'category', index)}
              />
            </div>
          </div>
          <div className="my-3">
            <TextInput
              label={'Tell us about your services'}
              type={'textarea'}
              value={itemNFT?.tellUs.value}
              require={itemNFT?.tellUs.error}
              onChange={e => handleChangeArrayNFT(e, 'tellUs', index)}
            />
          </div>
          <div className="my-4">
            <TextInput
              label={'Describe your service'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'description', index)}
              value={itemNFT?.description.value}
              require={itemNFT?.description.error}
            />
          </div>
        </div>
        <div className="global-flex-start my-3">
          <CustomRadio
            label={'Remote'}
            value={'remote'}
            variable={itemNFT?.remotePerson.value}
            onChange={e => handleChangeArrayNFT(e, 'remotePerson', index)}
          />
          <div className="ms-5">
            <CustomRadio
              label={'In Person'}
              value={'person'}
              variable={itemNFT?.remotePerson.value}
              onChange={e => handleChangeArrayNFT(e, 'remotePerson', index)}
            />
          </div>
        </div>
        <div className="row gx-5 my-3">
          <div className="col-12 col-lg-4 my-2">
            <TextInput
              label={'Location'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'location', index)}
              value={itemNFT?.location.value}
              require={itemNFT?.location.error}
            />
          </div>
          <div className="col-12 col-lg-4 my-2">
            <TextInput
              label={'Website'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'website', index)}
              value={itemNFT?.website.value}
              require={itemNFT?.website.error}
            />
          </div>
          <div className="col-12 col-lg-4 my-2">
            <TextInput
              label={'Discord'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'discord', index)}
              value={itemNFT?.discord.value}
              disabled={true}
            />
          </div>
        </div>
        <div className="row gx-5">
          <div className="col-12 col-lg-4 my-2">
            <TextInput
              label={'Hashtag 1'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'hashtag1', index)}
              value={itemNFT?.hashtag1.value}
              require={itemNFT?.hashtag1.error}
            />
          </div>
          <div className="col-12 col-lg-4 my-2">
            <TextInput
              label={'Hashtag 2'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'hashtag2', index)}
              value={itemNFT?.hashtag2.value}
              require={itemNFT?.hashtag2.error}
            />
          </div>
          <div className="col-12 col-lg-4 my-2">
            <TextInput
              label={'Hashtag 3'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'hashtag3', index)}
              value={itemNFT?.hashtag3.value}
              require={itemNFT?.hashtag3.error}
            />
          </div>
        </div>
        <div className="row gx-5">
          <div className="col-12 col-lg-12 my-2">
            <div className="poppins-20-500 my-3">Set your token percent</div>
          </div>
          <div className="col-12 col-lg-3 my-2">
            <TextInput
              label={'Creator'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'creator', index)}
              value={itemNFT?.creator.value}
              require={itemNFT?.creator.error}
            />
          </div>
          <div className="col-12 col-lg-3 my-2">
            <TextInput
              label={'Reseller'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'reseller', index)}
              value={itemNFT?.reseller.value}
              require={itemNFT?.reseller.error}
            />
          </div>
          <div className="col-12 col-lg-3 my-2">
            <TextInput
              label={'Royalty Pool'}
              type={'text'}
              onChange={e => handleChangeArrayNFT(e, 'royaltyPool', index)}
              value={itemNFT?.royaltyPool.value}
              require={itemNFT?.royaltyPool.error}
            />
          </div>
          <div className="col-12 col-lg-3 my-2">
            <SelectInput
              label={'Expiration'}
              placeFolder={'Never'}
              options={giftCardOptions}
              onChange={e => handleChangeArrayNFT(e, 'expiration', index)}
              value={itemNFT?.expiration.value}
              require={itemNFT?.expiration.error}
            />
          </div>
        </div>
        {!editable && (
          <div className="global-flex-end my-3">
            <RoundBorderButton label={'Remove NFT'} color={'#E75B2E'} onClick={() => handleRemoveNFT(index)} />
          </div>
        )}
      </div>
    </Accordian>
  );
});

export default NewNFT;
