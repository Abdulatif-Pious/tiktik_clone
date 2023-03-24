import React, { useState, useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';

import useAuthStore from '../store/authStore';

const LikeButton = ({ likes, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);  
  const { userProfile } = useAuthStore();

  const filterLikes = likes?.filter((like) => like?._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false);
    }
  }, [likes, filterLikes]);
  
  return (
    <div className='flex flex-col items-center'>
      {alreadyLiked ? (
        <div 
          className='flex items-center justify-center w-[40px] h-[40px] bg-gray-300 hover:border-2 hover:border-[#f5199790] rounded-full cursor-pointer'
          onClick={handleDislike}
          title="like"
        >
          <AiFillHeart className='text-xl rounded-full fill-[#f51997]' />
        </div>
      ) : (
        <div 
          className='flex items-center justify-center w-[40px] h-[40px] bg-gray-300 hover:border-2 hover:border-[#f5199790] rounded-full cursor-pointer'
          onClick={handleLike}
          title="like"
        > 
          <AiFillHeart className='text-xl rounded-full' />
        </div>
      )}
      <p className="font-bold text-lg text-[#f51997]">{likes?.length || 0}</p>
    </div>
  )
}

export default LikeButton