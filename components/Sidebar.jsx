import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


import Footer from './Footer';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import { useGlobalContext } from '../globalContext/context';
import tiktikLogo from '../utils/tiktik-logo.png';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { mobileSidebar, setMobileSidebar } = useGlobalContext();
  const { pathname } = useRouter();
  
  return (
    <div>
      <div className={`hidden md:block h-screen bg-gray-50 z-20 px-4 overflow-auto`}>
        <div className={`flex items-center w-[50px] justify-center p-3 cursor-pointer rounded-full hover:bg-gray-200`} onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? <AiOutlineClose/> : <AiOutlineMenu />}
        </div>
        {showSidebar && (
          <div className='w-20 xl:w-[400px] xl:border-none'>
            <div>
              <Link href='/'>
                <div className={`flex items-center  p-4 my-3  ${pathname === '/' && 'text-[#F51997]'} xl:border-b-2 xl:border-gray-300 hover:bg-gray-100 rounded-xl xl:shadow-lg`}>
                  <FaHome className='font-bold text-3xl ' />
                  <span className="font-semibold text-xl hidden xl:block ml-2">For You</span>
                </div>
              </Link>
            </div>

            <Discover />
            <SuggestedAccounts />
            <Footer />
            
          </div>
        )}
      </div>

      {/* mobile sidebar */}
      <div 
        className={` ${mobileSidebar ? 'block' : 'hidden'} md:hidden absolute w-full inset-0 z-20 bg-[rgba(0,0,0,0.2)]`}
        onClick={() => setMobileSidebar(false)}
      >
        <div className='w-3/5 overflow-y-auto bg-gray-50 p-3  h-screen'>
          <div className='flex items-center justify-between m-3'>
            <div>
            <Link href='/' >
              <Image 
                src={tiktikLogo}
                alt="logo picture"
                width={100}
                height={100}
                className="cursor-pointer"
              />
            </Link>
            </div>
            <div>
              <button
                className={`rounded-full p-3   ${mobileSidebar && 'hover:bg-gray-200 cursor-pointer'}`}
                onClick={() => setMobileSidebar(false)}
              >
                {mobileSidebar && <AiOutlineClose /> }
              </button>
            </div>
          </div>
          <Link href='/' >
            <div className={`${pathname === '/' && 'text-[#F51997]'} flex hover:bg-gray-200 p-3 rounded-lg cursor-pointer`}>
                <FaHome className='font-bold text-3xl ' />
                <span className="font-semibold text-xl ml-2">For You</span>
            </div>
          </Link>
          <hr />

          <h3 className='text-center font-semibold text-gray-600'>
            Suggested Accounts
          </h3>
          <SuggestedAccounts />
          <hr />

          <h3 className='text-center font-semibold text-gray-600'>
            Popular topics
          </h3>
          <Discover />
          <hr />
        </div>
      </div>
    </div>
  )
}

export default Sidebar