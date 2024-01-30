import { useState, useEffect } from 'react'
import axios from 'axios';
import { BsBookmarkHeartFill, BsHeartFill  } from 'react-icons/bs';

import { useGlobalContext } from '@/globalContext/context';
import { BASE_URL } from '@/utils';
import { UserAvatar, Post } from '@/components';

const Button = ({ showPosts, setShowPosts,  icon : Icon, label, like }) => {
  
  return (
    like ? 
      <div 
        className={`
          flex items-center gap-x-2  hover:opacity-60 py-2 px-4 rounded-full cursor-pointer
          ${showPosts ? "text-[#f51997] bg-white border-2 border-[#f51997]"  : "text-white bg-[#f51997]"}
        `}
        onClick={() => setShowPosts(false)}  
      >
      <Icon />
      <p className='font-semibold'>
        {label}
      </p>
    </div>
    : 
    <div 
    className={`
      flex items-center gap-x-2  hover:opacity-60 py-2 px-4 rounded-full cursor-pointer
      ${!showPosts ? "text-[#f51997] bg-white border-2 border-[#f51997]"  : "text-white bg-[#f51997]"}
    `}
      onClick={() => setShowPosts(true)}  
    >
      <Icon />
      <p className='font-semibold'>
        {label}
      </p>
    </div>
  );
};

const Profile = ({ profile : { user, userPosts : posts, userLikedPosts } }) => {
  const [showPosts, setShowPosts] = useState(true);
  const [userPosts, setUserPosts] = useState([]);

  const { smallSidebar } = useGlobalContext();

  useEffect(() => {
    const fetchPosts = async () => {
      if (showPosts) {
        setUserPosts(posts)
      } else {
        setUserPosts(userLikedPosts)
      }
    }

    fetchPosts();
  }, [showPosts, posts, userLikedPosts]);

  return (
    <div 
      className={`
        flex flex-col items-center gap-y-8 h-full
        ${smallSidebar ? "md:pl-[50px]" : "md:pl-[350px]"}
       
      `}
    >
      <UserAvatar 
        user={user}
        notLink
      />

      <div className='flex justify-center w-full gap-x-2'>
        <Button 
          showPosts={showPosts}
          setShowPosts={setShowPosts}
          icon={BsBookmarkHeartFill}
          label="posts"
        />
        <Button 
          showPosts={showPosts}
          setShowPosts={setShowPosts}
          icon={BsHeartFill}
          label="liked posts"
          like
        />
      </div>
      <div  
        className={`
          flex justify-center flex-wrap gap-4 xl:gap-10 w-full
          ${!userPosts.length  ? "h-full items-center" : "h-fit"}
        `}
      >
        {!!userPosts.length ? 
          userPosts?.map((userPost, i) => (
            <Post post={userPost} key={`${userPost?._id}-${i}`}/>
          ))
          : 
          <h3 className='font-semibold text-4xl text-[#f51997]'>
            {`No ${showPosts ? "" : 'liked'} posts yet `}
          </h3>
        }
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async ({ params : { profile }}) => {
  const res = await axios(`${BASE_URL}/api/profiles/${profile}`);

  return {
    props: {
      profile: res.data
    }
  }
};