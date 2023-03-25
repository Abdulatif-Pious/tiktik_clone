import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { GoVerified } from 'react-icons/go';

import { BASE_URL } from '../../utils';
import LikeButton from '../../components/LikeButton';
import Comment from '../../components/Comment';
import VideoPiece from '../../components/VideoPiece';
import  useAuthStore  from '../../store/authStore'; 

const videoDetail = ({ VideoPost }) => {
  const [post, setPost] = useState(VideoPost);
  const [comment, setComment] = useState('')
  const [isSending, setIsSending] = useState(false);

  const { userProfile }  = useAuthStore();

  const handleLike = async (like) => {
    try {
      if (userProfile) {
        const res = await axios.put(`${BASE_URL}/api/like`, {
          _id : post?._id,
          userId : userProfile?._id,
          like
        });
      setPost({ ...post, likes : res.data.likes });
      } 
    } catch (error) {
    console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      setIsSending(true);
      const res = await axios.put(`${BASE_URL}/api/post/${post?._id}`, {
        userId : userProfile?._id,
        _id : post?._id,
        comment,
        createdAt: new Date().toLocaleString(),
      });
      setPost({ ...post, comments : res.data.comments  })
      setComment("");
      setIsSending(false);
      console.log(post);
    } catch (error) {
      console.log(error);
      setComment("");
      setIsSending(false);
    } 
  }
  
  const handleCancel = () => {
    setComment('');
    setIsSending(false);
  }

  
  return (
    <div className="flex justify-center flex-wrap w-full">
      <div className="flex justify-center  w-full h-fit xl:basis-1/3 mt-[100px]">
        <VideoPiece video={post} videoPiece />
      </div>

      <div className="flex  flex-col w-full xl:basis-2/3 px-4 mt-[100px]" >
        <div className="flex  justify-between items-center">
          <div className="flex items-center">
            <Link href={`/profiles/${post?.postedBy?._id}`} className="flex items-center">
              <Image
                src={post?.postedBy?.image}
                alt="Username's image"
                width={50}
                height={50}
                className=" w-[50px] h-[50px] rounded-full hover:border-2 hover:border-[#f5199790] cursor-pointer"
              />
              <h3 className="font-bold text-xl mx-3 cursor-pointer">{post?.postedBy?.userName}</h3>
            </Link>
            <GoVerified className="w-[14px] h-[14px] flex items-center text-[#f51997]"/>
          </div>
          <h4 className="font-semibold text-lg text-[#f51997] cursor-pointer">Follow</h4>
        </div>
        {post?.caption && (
          <p className="font-medium text-lg">{post?.caption}</p>
        )}
        
        <hr className="my-4 " />
        <LikeButton 
          likes={post?.likes}  
          handleLike={() => handleLike(true)}
          handleDislike={() => handleLike(false)}
        />
        
        <Comment 
          comment={comment}
          setComment={setComment}
          comments={post?.comments}
          isSending={isSending}
          setIsSending={setIsSending}
          handleComment={handleComment}
          handleCancel={handleCancel}
        />
      </div>

    </div>
  )
}


export default videoDetail;

export const getServerSideProps = async ({ params : { videoDetail } }) => {
  const response = await axios.get(`${BASE_URL}/api/post/${videoDetail}`)

  return {
    props : {
      VideoPost : response.data,
      
    }
  }
}