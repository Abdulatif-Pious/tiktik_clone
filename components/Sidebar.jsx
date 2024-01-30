import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

import useAuthStore from '@/store/auth-store';
import { useGlobalContext } from '@/globalContext/context';
import {  SuggestedAccounts, Footer, Discover } from "@/components";

const Sidebar = () => {
  const { smallSidebar } = useGlobalContext();
  const { allUsers, userProfile } = useAuthStore();

  const { pathname, query } = useRouter();

  const otherUsers = allUsers.filter((users) => users?._id !== userProfile?._id);

  return (
    <div className='h-full  mx-2 my-4'>
      {smallSidebar ? (
        // SMALL SIDEBAR
        <div className="hidden md:block w-[50px] mb-auto">
          <Link 
            href='/' 
            className={` 
              flex flex-col items-center border-2  p-2 cursor-pointer hover:bg-gray-100 
              ${(pathname === '/' && !Object.keys(query).length) ? 'text-[#F51997] border-[#f519975c]  rounded-lg' : "border-gray-300 rounded-full"}
            `
            }
          >
            <FaHome className='w-[20px] h-[20px]' />
            <p className="font-medium text-[10px]">Home</p>
          </Link>
          <Discover />
        </div>
      ) : (
        // DESKTOP SIDEBAR
        <div className='hidden md:flex flex-col justify-between w-[350px] h-full'>
          <Link 
            href='/'
            className={`
              flex items-center gap-x-2 border-2 p-3 my-1  hover:bg-gray-100 
              ${(pathname === '/' && !Object.keys(query).length) ? 'text-[#F51997] border-[#f519975c] rounded-lg' : "rounded-full"}
            `}
          >
            <FaHome className='w-[32px] h-[32px]' />
            <p className="font-semibold text-xl">Home</p>
          </Link>
          <Discover />
          {!!otherUsers.length && (
            <SuggestedAccounts />
          )}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;