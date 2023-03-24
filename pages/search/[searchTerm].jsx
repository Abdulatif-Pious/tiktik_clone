import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiAccountCircleFill } from 'react-icons/ri';
import { RxVideo } from 'react-icons/rx';
import { GoVerified } from 'react-icons/go';

import axios from 'axios';

import { BASE_URL } from '../../utils';
import  useAuthStore  from '../../store/authStore';
import Post from '../../components/Post';

const searchTerm = ({ videos }) => {
  const [isAccount, setIsAccount] = useState(true);

  const router = useRouter();
  const { searchTerm } = router.query;
  
  const { allUsers } = useAuthStore();

  const searchedAccounts = allUsers?.filter((user) => user?.userName?.toLowerCase().includes(searchTerm));

  const style = 'text-[#f51997] border-b-2 border-gray-400';

  return (
    <div className='w-full'>
      <div className='flex justify-center w-full my-10 border-b-2 border-gray-200 '>
        <div 
          className={`font-semibold text-xl flex items-center  px-4 rounded-lg cursor-pointer hover:bg-gray-100 ${isAccount && style}`}
          onClick={() => setIsAccount(true)}
        >
          <RiAccountCircleFill className='text-[24px]' />
          <p className='ml-2'>Accounts</p>
        </div>
        <div 
          className={`font-semibold text-xl flex items-center  px-4 ml-2 rounded-lg cursor-pointer hover:bg-gray-100  ${!isAccount && style}`}
          onClick={() => setIsAccount(false)}
        >
          <RxVideo className='text-[24px]' />
          <p className='ml-2'>Videos</p>
        </div>
      </div>

      <div className='w-full px-4'>
        {isAccount ? (
          <div>
            {searchedAccounts.length > 0 ? (
              <div>
                {searchedAccounts?.map((item) => (
                  <div key={item?._id} className='flex items-center justify-between mt-2 pb-2 border-b-2 border-gray-200'>
                    <Link href={`/profiles/${item?._id}`} className="hover:bg-gray-200">
                      <div className="flex items-center w-full ">
                        <div>
                          <Image 
                            src={item?.image}
                            alt="username's image"
                            width={50}
                            height={50}
                            className="rounded-full hover:border-2 hover:border-[#f51997ac]"
                          />
                        </div>
                        <div className='flex items-center ml-2'>
                          <p className='font-semibold'>{item?.userName}</p>
                          <GoVerified  className='text-[12px] text-[#f51997] ml-2'/>
                        </div>
                      </div>
                    </Link>
                  <p className='text-[#f51997] cursor-pointer'>
                    Follow
                  </p>
                  </div> 
                ))}
              </div>
            ) : (
              <h3 className='flex justify-center'>
                No Result
              </h3>
            )}
          </div>
        ) : (
          <div className='flex justify-center flex-wrap gap-4 xl:gap-10 w-full h-fit mt-10'>
            {videos?.length > 0 ? (
              videos?.map((video) => (
                <Post post={video} key={video?.video?.asset?._id}/>
              ))
            ) : (
              <h3 className='flex justify-center'>
                No results
              </h3>
            )}
            
          </div>
        )}
      </div>
      {console.log(videos)}
    </div>
  )
}

export default searchTerm;

export const getServerSideProps = async ({ params : { searchTerm }}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props : {
      videos: res.data
    }
  }
};