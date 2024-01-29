import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSearch  } from 'react-icons/fa';
import { RiVideoUploadFill } from 'react-icons/ri';
import {  AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import useAuthStore from '@/store/auth-store';
import { createOrGetUser } from '@/utils';
import { useGlobalContext } from '@/globalContext/context';
import tiktikLogo from '@/utils/tiktik-logo.png';

const Navbar = () => {
  const [userAccount, setUserAccount] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { mobileSidebar, setMobileSidebar, setSmallSidebar, smallSidebar } = useGlobalContext();

  const { userProfile, addUser,  removeUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setUserAccount(userProfile)
  }, [userProfile]);

  useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 768) {
          setMobileSidebar(false);
        } else {
          setSmallSidebar(!smallSidebar);
        }
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 

  const handleClick = () => {
    if (window.innerWidth < 768)  {
      setMobileSidebar(true)
    } else {
      setSmallSidebar(!smallSidebar)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      router.push(`/search/${searchTerm}`)
      setSearchTerm("");
    }
  };

  return (
    <>
      <div className='flex items-center gap-x-3'>
        <div
          className="p-3 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={handleClick} 
        > 
          {(mobileSidebar || smallSidebar) ? <AiOutlineMenu /> : <AiOutlineClose />} 
        </div>

        <Link href='/'>
          <Image 
            src={tiktikLogo} 
            width={120} 
            height={120} 
            alt='logo image' 
            className="cursor-pointer object-contain" 
          />
        </Link>
      </div>
      
      <form className="relative hidden md:block" onSubmit={handleSubmit}>
        <input 
          type="text"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-sm w-[250px] min-w-[300px] py-2 pl-4 pr-10 border-2 rounded-full outline-none focus:border-[#f51997] placeholder:text-gray-400 placeholder:italic" 
          placeholder="Search accounts and videos"
        />
        <button 
          type="submit" 
          className={`
            absolute right-2 top-1 flex items-center justify-center w-[35px] h-3/4 rounded-full border-2 
            ${!!searchTerm.length ? "border-[#f519975c] cursor-pointer hover:border-[#f51997]" : "border-gray-300 cursor-not-allowed"}
            `}
          onClick={handleSubmit}
        >
          <FaSearch 
            className={` 
              w-[16px] h-full
              ${!!searchTerm.length ? "text-[#f519975c]" : "text-gray-300"}
            `} 
          />
        </button>
      </form>          
    
      {userAccount ? (
        <div className='flex items-center gap-x-2'>
          <Link 
            href='/upload'
            className="p-3 rounded-full cursor-pointer hover:bg-gray-200"
          >
            <RiVideoUploadFill className='text-[#f51997] w-5 h-5' />
          </Link>
          <Link href={`/profiles/${userProfile?._id}`} className="p-3">
            <Image 
              src={userProfile?.image}
              width={100}
              height={100}
              alt="profile_picture"
              className='rounded-full w-[50px] h-[50px] hover:border-2 hover:border-[#f51997]'
            />
          </Link>
          {/* <button 
            type="button" 
            onClick={() => {
              googleLogout()
              removeUser()
            }}
            className="font-medium text-2xl text-white bg-[#f51997] p-4 rounded-lg hover:bg-[#c5159780] cursor-pointer"
          >
            Logout
          </button> */}
        </div>
      ) : (
        <div onClick={() => setUserAccount(userProfile)}>
          <GoogleLogin 
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Login failed')}
          />
        </div>
      )}
    
    </>
  )
}

export default Navbar