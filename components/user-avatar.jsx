import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";

const UserAvatar = ({ user, notLink, activeLink }) => {
  const  router  = useRouter();
  const { profile } = router.query;

  return (
    <Link 
      href={`/profiles/${user?._id}`} 
      className={`
        group flex items-center  gap-x-2 w-fit 
        ${!notLink && "cursor-pointer"} 
      `}
    >
      <Image 
        src={user?.image} 
        alt="user profile"
        width={40}  
        height={40}
        className={`
          rounded-full object-contain group-hover:border-[#f51997]
          ${notLink ? "border-none" : "border-2"}
          ${(activeLink && profile === user?._id) && "border-[#f51997] border-2"}
        `}
      />
      <h3 
        className={
          `text-sm font-medium 
          ${!notLink  && "group-hover:text-[#f51997]"}
          ${(activeLink && profile === user?._id) && "text-[#f51997]"} 
        `}>{user?.userName}</h3>
    </Link>  
  );
};

export default UserAvatar;