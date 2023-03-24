import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSearch  } from 'react-icons/fa';
import { RiVideoUploadFill } from 'react-icons/ri';
import {  AiOutlineMenu } from 'react-icons/ai';


import { GoogleLogin, googleLogout } from '@react-oauth/google';
import useAuthStore from '../store/authStore';
import { createOrGetUser } from '../utils';
import { useGlobalContext } from '../globalContext/context';
import tiktikLogo from '../utils/tiktik-logo.png';

const Navbar = () => {
  const [userAccount, setUserAccount] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { mobileSidebar, setMobileSidebar } = useGlobalContext();

  const { userProfile, addUser,  removeUser} = useAuthStore();
  const router = useRouter();


  useEffect(() => {
    setUserAccount(userProfile)
  }, [userProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      router.push(`/search/${searchTerm}`)
      setSearchTerm("");
    }
  }


  return (
    <nav className="flex items-center bg-gray-50  px-4 z-10">
      {/* Mobile Sidebar*/}
      <div
        className={`mr-4 p-3 block md:hidden  rounded-full ${!mobileSidebar && 'hover:bg-gray-200 cursor-pointer'}`}
        onClick={() => setMobileSidebar(!mobileSidebar)} 
      > 
        { !mobileSidebar && <AiOutlineMenu />}
      </div>
  
      <div className="flex items-center justify-between  w-full">
        <Link href='/'>
          <div >
            <Image 
              src={tiktikLogo} 
              width={120} 
              height={120} 
              alt='logo image' 
              className="cursor-pointer" />
          </div>
        </Link>
        
        <div className="flex items-center justify-center ">
          <form className="hidden md:block relative " onSubmit={handleSubmit}>
            <input 
              type="text"
              value={searchTerm} 
              onChange={((e) => setSearchTerm(e.target.value))}
              className="font-semibold text-sm w-[250px] max-w-[300px]   py-2 px-4 border-2 rounded-full cursor-pointer outline-none focus:border-gray-400 " 
              placeholder="Search accounts and videos"
            />
            <button  type="submit" className="absolute w-[18px] h-full right-4" onClick={handleSubmit}>
              <FaSearch className='text-gray-600 w-full h-full  border-l-2 border-l-gray-200 pl-2' />
            </button>
          </form>          
        </div>

        {userAccount ? (
          <div className="flex items-center  justify-between ">
            <Link href='/upload'>
              <button type="button" className="text-[40px] p-3 m-2 rounded-full  cursor-pointer hover:bg-gray-200" >
                <RiVideoUploadFill className='text-[#f51997]' />
              </button>
            </Link>
            <Link href="/" className="m-2 p-3">
              <Image 
                src={userProfile?.image}
                width={100}
                height={100}
                alt="profile picture"
                className='rounded-full w-[50px] h-[50px] hover:border-2 hover:border-[#f51997]'
                
              />
            </Link>
            <button 
              type="button" 
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            className="font-medium text-2xl text-white bg-[#f51997] p-4 rounded-lg hover:bg-[#c5159780] cursor-pointer">
              Logout
            </button>
          </div>
        ) : (
          <div onClick={() => setUserAccount(userProfile)}>
            <GoogleLogin 
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log('Login failed')}
            />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar