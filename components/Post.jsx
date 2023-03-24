import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { TbDots } from 'react-icons/tb';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { TbSend } from 'react-icons/tb'
import { BsBookmarkHeart } from 'react-icons/bs';

import VideoPiece from './VideoPiece'; 
import LikeButton from './LikeButton';

const Post = ({ post : { caption, _createdAt, comments, likes, video, _id, postedBy } }) => {

  return (
    <article className='flex flex-col items-center h-fit  p-2 bg-gray-50 rounded-2xl'>
      <div className="flex  justify-between w-full ">
        <div className="flex items-center">
          <Link href={`/profiles/${postedBy?._id}`} className="cursor-pointer">
            <div className="flex items-center justify-center w-full">
              <Image 
                src={postedBy?.image} 
                alt="user profile"
                width={30}  
                height={30}
                className="rounded-full object-contain hover:border-2 hover:border-[#f5199790]"
                />
              <h3 className="font-semibold text-[18px] ml-4 mr-1">{postedBy?.userName}</h3>
              <GoVerified  className="text-[12px] flex items-center justify-center text-[#F51997]" />
            </div>
          </Link>
          <div className='flex items-center justify-center ml-2'>
            <h4 className={`font-semibold text-base text-[#f51997] cursor-pointer`}>
              Follow  
            </h4>
          </div>           
        </div>
        <div className="flex items-center ">
          <TbDots className="text-base text-gray-500 cursor-pointer" />
        </div>
      </div>

      <div className="mt-4 relative">
        <VideoPiece video={video} />
      </div>
      <div className="w-[300px]">
        <div className="flex justify-between mt-2">
          <div className='flex'>
            <AiOutlineHeart className="font-semibold text-xl cursor-pointer" />
            <Link href={`/videoDetails/${_id}`}>
              <AiOutlineComment className="font-semibold text-xl mx-2 cursor-pointer" />
            </Link>            
            <Link href={`/direct/`}>
              <TbSend className="font-semibold text-xl cursor-pointer" />
            </Link>          </div>
          <div>
            <BsBookmarkHeart className="font-semibold text-xl cursor-pointer" />
          </div>
        </div>
        <div>
          {likes?.length > 0 ? (
            <p>
              <span className="font-semibold text-[#f51997] ">{likes?.length} {" "}</span>
              likes
            </p>
          ) : (
            <p className="font-semibold text-base text-gray-400">Be the first to
              <span className='font-semibold text-[#f51997] italic'>{" "}like</span>
            </p>
          )}
          {caption.length  && (
            <div className='w-[300px]'>
              <Link href={`/profiles/${postedBy?._id}`}>
                <h3 className="font-semibold inline-block text-[#f51997]">
                  {postedBy?.userName}
                </h3>
              </Link>
                {caption?.length > 30 ? (
                  <div>
                    <p className="font-semibold text-base truncate">
                      {caption?.slice(0, 30)}...
                    </p> 
                    <span className="font-semibold text-[#f51997] cursor-pointer italic" >{" "}more</span>
                  </div>
                  ) : (
                    <p className='font-semibold text-base'>
                      {" "}{caption}
                    </p>
                  )}
            </div>
          )}
          <hr className='my-2'/>

          <div className='w-[300px]'>
            {comments && (
              comments?.slice(0, 2).map((comment) => (
                <div key={comment?._key} className="flex items-center mt-2">
                  <Link href={`/profiles/${comment?.postedBy?._id}`}>
                    <Image 
                      src={comment?.postedBy?.image}
                      alt="userName's picture"
                      width={30}
                      height={30}
                      className="object-contain rounded-full hover:border-2 border-[#f5199790]"
                    /> 
                  </Link>
                  <div className='ml-2'>
                    {comment?.comment?.length > 30 
                      ? <div>
                          <p>{comment?.comment.slice(0, 30)}...</p>
                          <span className='font-semibold text-[#f51997] cursor-pointer italic'>more</span>
                        </div>
                    :  <p>{comment?.comment}</p>
                    }
                  </div>
                </div>
              ))
            )}
            {comments?.length > 0 ? (
              <Link href={`/videoDetails/${_id}`}>
                <p className='mt-3'>View all
                  <span className="font-semibold text-[#f51997]"> {comments?.length} </span>
                  comments
                </p>
              </Link>
            ) : (
              <Link href={`/videoDetails/${_id}`}>
                <p className='font-semibold text-gray-400'>
                  Be the first to 
                  <span className='font-semibold text-[#f51997] italic'>{" "}comment</span>
                  </p>
              </Link>
            )}
            <p className='mt-2'>{_createdAt}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Post