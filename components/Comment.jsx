import React from 'react'
import Link from 'next/link';
import Image from 'next/image'; 
import { FaComment } from 'react-icons/fa'

import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';

const Comment = ({ comment, setComment, comments, isSending,  handleComment, handleCancel}) => {
  const { userProfile, allUsers } = useAuthStore();

  const commentTarget = (e) => {
    e
  }

  return (
    <div className='mb-36'>
      <div className='flex flex-col items-center justify-center my-4'>
        <div onClick={commentTarget}  className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-gray-300 hover:border-2 hover:border-[#f51997]">
          <FaComment className={`text-xl }`}  title="comment" />
        </div>
        <p className='font-bold  text-[#f51997]'>
          {comments?.length}
        </p> 
      </div>
      {userProfile && (
        <div className="mb-4">
          <input 
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="add a comment"
            className="text-xl w-full border-b-2 border-b-[#f51997] p-3 outline-none rounded-xl cursor-pointer shadow-xl placeholder:font-semibold placeholder:text-gray-600 focus:border-2 focus:border-[#f51997]"
          />
          <div className='flex justify-end'>
            <button 
              className="text-lg min-w-[100px] m-2 p-3 bg-gray-100 rounded-2xl ouline-none cursor-pointer"
              onClick={handleCancel}
            >
              cancel
            </button>
            <button 
              className={`text-lg  min-w-[100px] m-2 p-3 ${comment ? 'bg-[#f51996cc] font-bold text-gray-900' : 'bg-gray-300 cursor-not-allowed' } rounded-2xl ouline-none cursor-pointer`}
              onClick={handleComment}
              disabled={comment ? false : true}
              >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}

      {comments 
        ? <>
            <div className='w-full xl:h-[600px] xl:overflow-y-auto bg-gray-50 rounded-xl py-2'>   
              {comments?.map((item) => (
                <div key={item?._key}>
                  {allUsers?.map((user) => (
                    user?._id === (item?.postedBy?._ref || item.postedBy?._id) && (
                      <div key={item?._key} className="m-4">
                      <Link href={`/profiles/${item?.postedBy?._ref}` || `/profiles/${user?._id}`} className="flex items-center ">
                        <div className='flex items-center'>
                        <Image 
                          src={user?.image}
                          alt="username's picture"
                          className='rounded-full hover:border-2 hover:border-[#f5199790]'
                          width={40}
                          height={40}
                        />
                        <h3 className="font-semibold text-gray-900 text-xl ml-2">{user?.userName}</h3>
                      </div>
                  </Link>
                  <p className="ml-2">{item?.comment}</p>
                  <div className='mt-4'>
                    <p className='font-medium text-sm text-gray-400'>{item?.createdAt}</p>
                  </div>
                </div>
                    )
                ))}
                </div>
              ))}
            </div>
          </> 
        : <div className='flex items-center justify-center'>
            <p className="text-lg font-semibold text-gray-500">
              Be the first to
              <span className="font-bold text-[18px] text-[#f51997] italic">{" "} comment</span>
            </p>
          </div>}
    </div>
  )
}

export default Comment