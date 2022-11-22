import React from 'react';
import 'src/styles/components/TokenDetailComment.scss';
import 'src/styles/Global.scss';
import TextInput from '../TextInput';

const TokenDetailComment = ({ commentText, setCommentText, handleClickComment, avatar }) => {
  return (
    <div className="global-flex-between" style={{ height: '76px' }}>
      <img alt="alt" src={avatar || '/img/default-avatar.png'} style={{ width: 106, height: 76 }} />
      <div style={{ background: '#F3F3F3', flex: 1, padding: '16px 4px' }}>
        <TextInput
          type={'text'}
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="Comment"
        />
      </div>
      <div className="global-flex-center global-pointer" style={{ background: '#D9D9D9' }} onClick={handleClickComment}>
        <div className="poppins-14-600 px-4">Comment</div>
      </div>
    </div>
  );
};

export default TokenDetailComment;
