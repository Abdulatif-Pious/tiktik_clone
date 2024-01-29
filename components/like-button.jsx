import  { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { BASE_URL } from '@/utils';
import { useGlobalContext } from '@/globalContext/context';
import useAuthStore from '@/store/auth-store';

const LikeButton = ({ likes, postId, color }) => {
  const [isLiked, setIsLiked] = useState(false);

  const { dispatch } = useGlobalContext();
  const { userProfile } = useAuthStore();

  let isLikeByUser = likes?.filter((like) => like?._ref === userProfile?._id);

  useEffect(() => {
    if (!!isLikeByUser?.length) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, []);

  const LikeIcon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
  try {
    if (userProfile) {
      const updatedIsLiked = !isLiked;
      setIsLiked(updatedIsLiked);

      if (isLiked) {
        dispatch({ type: 'UPDATE_LIKES_COUNT', postId, likesCount: likes?.length - 1 })
      } else {
        dispatch({ type: 'UPDATE_LIKES_COUNT', postId, likesCount: likes?.length })
      }

      await axios.put(`${BASE_URL}/api/like`, {
        _id: postId,
        userId: userProfile?._id,
        like: updatedIsLiked,
      });      
    }
  } catch (error) {
    console.log(error);
  }
};
  
  return (
    <LikeIcon 
      className={`
        font-semibold text-xl cursor-pointer hover:opacity-80 
        ${isLiked ? color : "text-gray-500" } 
      `} 
      onClick={handleLike} 
    />
  );
};

export default LikeButton;