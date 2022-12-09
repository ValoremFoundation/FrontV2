import React from 'react';
import 'src/styles/components/ActivateListingCard.scss';
import 'src/styles/Global.scss';
import BackgroundButton from '../BackgroundButton';
import ShowRoleInfo from '../ShowRoleInfo';
import TextInput from '../TextInput';

const ActivateListingCard = ({
  handleClickList,
  handleClickBurn,
  handleClickTransfer,
  price,
  handleChangePrice,
  token,
  businessOwnerPercent,
  buyerPercent,
  marketOwnerPercent,
  tokenStatus,
}) => {
  return (
    <div className="activate-listing-card">
      <div className="poppins-24-600 my-2">Activating your listing</div>
      <div className="poppins-14-500 my-2">
        {`Set a price, we'll convert it to AdValoremVLR {recent values are estimates}`}
      </div>
      <div className="row gx-5 mt-5">
        <div className="col-12 col-lg-5 mb-4">
          <div className="poppins-14-600">Set your price</div>
          <div className="poppins-12-500">*1 VLR = $1</div>
          <TextInput label={''} type={'text'} value={price} onChange={handleChangePrice} />
        </div>
        <div className="col-12 col-lg-7 mb-4">
          <div className="poppins-12-400" style={{ padding: '28px 24px', background: '#F2E9BA' }}>
            HINT: Watch the prices above change as you set your list price to see an example of how this could work in
            the real world.
          </div>
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="my-2">
            <div className="poppins-14-600 my-2">Token Distributions</div>
            <div className="global-flex-start">
              <div className="me-3">
                <ShowRoleInfo value={(token?.creator * price) / 100} role={'Creator'} unit={'VLR'} />
              </div>
              <div className="me-3">
                <ShowRoleInfo value={(token?.reseller * price) / 100} role={'Buyer'} unit={'VLR'} />
              </div>
              <div className="me-3">
                <ShowRoleInfo value={(token?.royalty_pool * price) / 100} role={'Royalty Pool'} unit={'VLR'} />
              </div>
            </div>
          </div>
          <div className="my-2">
            <div className="poppins-14-600 my-2">Royalty pool breakdowns</div>
            <div className="my-1">
              <ShowRoleInfo value={businessOwnerPercent} role={'Creator'} unit={'%'} />
            </div>
            <div className="my-1">
              <ShowRoleInfo value={buyerPercent} role={'Buyer'} unit={'%'} />
            </div>
            <div className="my-1">
              <ShowRoleInfo value={marketOwnerPercent} role={'AdValorem'} unit={'%'} />
            </div>
          </div>
        </div>
      </div>
      <div className="poppins-12-400 my-1">*Burn Fee</div>
      <div className="poppins-12-400 my-1">*Advalorem transaction fee</div>
      <div className="global-flex-end gap-2">
        {tokenStatus === 'list' && (
          <BackgroundButton label={'List'} color={'#000000'} bgColor={'#96F2A4'} onClick={handleClickList} />
        )}
        <BackgroundButton label={'Burn'} color={'#000000'} bgColor={'#96F2A4'} onClick={handleClickBurn} />
        <BackgroundButton label={'Transfer'} color={'#000000'} bgColor={'#96F2A4'} onClick={handleClickTransfer} />
      </div>
    </div>
  );
};

export default ActivateListingCard;
