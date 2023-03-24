import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import { BsBookmarkHeartFill, BsHeartFill  } from 'react-icons/bs';

import { BASE_URL } from '../../utils';
import Post from '../../components/Post'

const profile = ({ profile : {user, userPosts : posts, userLikedPosts } }) => {
  const [showPosts, setShowPosts] = useState(true);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (showPosts) {
        setUserPosts(posts)
      } else {
        setUserPosts(userLikedPosts)
      }
    }

    fetchPosts();
  }, [showPosts, posts, userLikedPosts]);

  const postStyle= "text-[#f51997] border-b-2 border-gray-400";
  const likedPostStyle = "text-[#f51997] border-b-2 border-gray-400";
  
  return (
    <div> {console.log(userLikedPosts)} 

      <div className='flex items-center justify-center mt-10'>
        <div>
          <Image 
            src={user?.image}
            alt="user picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className='flex items-center'>
          <h3 className='font-semibold text-xl ml-6 mr-2'>{user?.userName}</h3>
          <GoVerified className="text-xl text-[#f51997]" />
        </div>
      </div>

      <div>
        <div className='flex justify-center w-full my-20 border-b-2 border-gray-200 '>
          <div 
            className={`flex items-center ${showPosts && postStyle} cursor-pointer hover:bg-gray-100 px-4 rounded-lg`}
            onClick={() => setShowPosts(true)}  
          >
            <BsBookmarkHeartFill />
            <p className='font-semibold text-lg ml-2'>
              Posts
            </p>
          </div>
          <div 
            className={`flex items-center ${!showPosts && likedPostStyle} cursor-pointer hover:bg-gray-100 px-4 rounded-lg ml-2`}
            onClick={() => setShowPosts(false)}    
          >
            <BsHeartFill />
            <p className='font-semibold text-lg ml-2'>
              Liked Posts
            </p>
        </div>
        </div>
        <div className='flex justify-center flex-wrap gap-4 xl:gap-10 w-full h-fit mt-2 xl:mt-10'>
          {userPosts.length > 0 
            ? userPosts?.map((userPost, i) => (
                <Post post={userPost} key={`${userPost?._id}-${i}`}/>
              ))
            : <h2>
                {`No ${showPosts ? "" : 'Liked'} Posts yet `}
              </h2>
          }
        </div>
      </div>
    </div>
  )
}

export default profile;

export const getServerSideProps = async ({ params : { profile }}) => {
  const res = await axios(`${BASE_URL}/api/profiles/${profile}`);

  return {
    props: {
      profile: res.data
    }
  }
};