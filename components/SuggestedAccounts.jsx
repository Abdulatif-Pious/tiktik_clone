import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import { useGlobalContext } from '../globalContext/context';

const SuggestedAccounts = () => {
  const { allUsers } = useAuthStore();

  const { mobileSidebar } = useGlobalContext();

  return (
    <div className='my-2 xl:border-b-2 xl:border-gray-200'>
      <p className="hidden xl:block font-bold text-base text-gray-400 my-2">
        Suggested accounts
      </p>

      {allUsers ? (  
        allUsers?.map((user) => (
          <Link key={user?._id} href={`/profiles/${user?._id}`}>
          <article className='flex items-center justify-between my-2 p-2 hover:bg-gray-200 rounded-lg'>
            <div className="flex">
              <div className='flex items-center justify-center'>
                <Image
                  src={user?.image}
                  width={44}
                  height={44}
                  alt="profile-img"
                  className="w-9 h-9 rounded-full"
                />
              </div>
              <div className={`ml-4  xl:flex xl:items-center ${mobileSidebar ? 'flex items-center' : 'hidden'}`}>
                  <h3 className="font-bold text-base ">{user?.userName}</h3>
                  <GoVerified className="text-[#f51997] text-[14px] ml-2" />
              </div>
            </div>
          <p className="hidden xl:block font-semibold text-base text-[#f51997]">Follow</p>
          </article>
        </Link>  
        ))
      ) : (
        <div>
          No Suggested Accounts
        </div>
      )}
    </div>
  )
}

export default SuggestedAccounts