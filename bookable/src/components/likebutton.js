import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const toggleLike = () => {
    setLiked(!liked);
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <div>
      <Button variant={liked ? 'success' : 'outline-success'} onClick={toggleLike}>
        {liked ? 'Liked' : 'Like'}
      </Button>
      <span style={{ marginLeft: '10px' }}>{likeCount} Likes</span>
    </div>
  );
};

export default LikeButton;
