import  { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { RiAccountCircleFill } from 'react-icons/ri';
import { RxVideo } from 'react-icons/rx';
import axios from 'axios';

import { BASE_URL } from '@/utils';
import  useAuthStore  from '@/store/auth-store';
import { useGlobalContext } from '@/globalContext/context';
import {  UserAvatar } from '@/components';

import  Post  from '../../components/post';

const Button = ({ account, isAccount, icon: Icon, setIsAccount, label }) => {
  return (
    account ? 
      <div 
        className={`
          flex items-center gap-x-2  hover:opacity-60 py-2 px-4 rounded-full cursor-pointer
          ${!isAccount ? "text-[#f51997] bg-white border-2 border-[#f51997]"  : "text-white bg-[#f51997]"}
        `}
        onClick={() => setIsAccount(true)}
      >
        <Icon />
        <p className='font-semibold'>{label}</p>
      </div>
      :
      <div 
        className={`
          flex items-center gap-x-2  hover:opacity-60 py-2 px-4 rounded-full cursor-pointer
          ${isAccount ? "text-[#f51997] bg-white border-2 border-[#f51997]"  : "text-white bg-[#f51997]"}
        `}
        onClick={() => setIsAccount(false)}
      >
        <Icon />
        <p className='font-semibold'>{label}</p>
      </div>  
    
  );
};

const searchTerm = ({ videos }) => {
  const [posts, setPosts] = useState([]);
  const [isAccount, setIsAccount] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const { userProfile, allUsers } = useAuthStore();
  const { smallSidebar } = useGlobalContext();

  const router = useRouter();
  const { searchTerm } = router.query;

  const searchedAccounts = allUsers?.filter((user) => user?.userName?.toLowerCase().includes(searchTerm.toLowerCase()));

  const otherAccounts = searchedAccounts?.filter((account) => account._id !== userProfile?._id)

  useEffect(() => {
    setPosts(videos)
  }, [videos]);

  useEffect(() => {
    setIsMounted(!isMounted);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`
      flex flex-col items-center gap-y-8 w-full h-full md:ml-8 mt-10
      ${smallSidebar ? "md:pl-[50px]" : "md:pl-[350px]"}  
    `}
    >
      <div className='flex justify-center w-full gap-x-2'>
        <Button 
          isAccount={isAccount}
          setIsAccount={setIsAccount}
          icon={RiAccountCircleFill}
          label="Accounts"
          account
        />
        <Button 
          isAccount={isAccount}
          setIsAccount={setIsAccount}
          icon={RxVideo}
          label="Videos"
        />
      </div>

      {isAccount ? (
        <div 
          className={`
            flex h-full 
            ${!otherAccounts.length  && "items-center"}`
          }
        >
          {!!otherAccounts.length ? (
            <div>
              {otherAccounts?.map((item, i) => (
                <UserAvatar 
                  key={`${item}-${i}`}
                  user={item}
                />
              ))}
            </div>
          ) : (
            <h3 className='font-semibold text-4xl text-[#f51997]'>
              No result
            </h3>
          )}
        </div>
      ) : (
        <div 
          className={`
            flex justify-center   flex-wrap gap-4 xl:gap-10 w-full
            ${!posts.length ? "h-full items-center" : "h-fit"}
          `}
        >
          {!!posts?.length  ? (
            posts?.map((item, i) => (
              <Post 
                key={`${item?.video?.asset?._id}-${i}`}
                post={item} 
              />
            ))
          ) : (
            <h3 className='font-semibold text-4xl text-[#f51997] '>
              No result
            </h3>
          )}
          
        </div>
      )}
    </div>
  );
};

export default searchTerm;

export const getServerSideProps = async ({ params : { searchTerm }}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props : {
      videos: res.data
    }
  }
};