import { useState, useEffect } from "react";

import useAuthStore from '@/store/auth-store';
import { useGlobalContext } from "@/globalContext/context";
import { UserAvatar } from '@/components';

const SuggestedAccounts = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { allUsers, userProfile } = useAuthStore();
  const {  setMobileSidebar } = useGlobalContext();

  const otherUsers = allUsers.filter((users) => users?._id !== userProfile?._id)

  useEffect(() => {
    setIsMounted(!isMounted);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (    
    <div className='my-2'>
      <p className="font-semibold text-gray-500 my-2">Suggested accounts</p>

        {!!otherUsers.length &&
          <div 
            className='space-y-4 my-4'
            onClick={() => {
              if (window.innerWidth < 768) {
                setMobileSidebar(false)
              }
            }}
          >
            {otherUsers?.slice(0, 5).map((user, i) => (
              <UserAvatar 
                key={`${user?._id}-${i}`}
                user={user}
                activeLink
              />
            ))}
          </div>    
        }
    </div>
  );
};

export default SuggestedAccounts