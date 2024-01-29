import Link from "next/link";
import Image from "next/image"; 
import { useRouter } from "next/router";
import { FaHome } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import { useGlobalContext } from '@/globalContext/context';
import useAuthStore from '@/store/auth-store';
import { Footer, Discover, SuggestedAccounts } from "@/components";

const MobileSidebar = () => {
  const { mobileSidebar, setMobileSidebar } = useGlobalContext();
  const { allUsers } = useAuthStore();
  
  const { pathname, query } = useRouter();

  return (
    <>
      {/* MOBILE SIDEBAR IN LESS 768PX*/}
      {mobileSidebar && (
        <div className='fixed top-0 bottom-0  block md:hidden w-full h-screen'>
          <div className='flex flex-col  bg-white w-4/5 h-full'>
            <div className="flex items-center gap-x-3 h-[80px] px-2">
              <div
                className="p-3 rounded-full hover:bg-gray-200 cursor-pointer"
                onClick={() => setMobileSidebar(false)} 
              > 
                <AiOutlineClose />
              </div>
              <Link 
                href="/"
                onClick={() => setMobileSidebar(false)}
              >
                <Image 
                  alt="logo_png"
                  src="/tiktik-logo.png"
                  width={120}
                  height={120}
                  className="object-contain w-[120px] h-[120px]"
                />
              </Link>
            </div>

            <div className="overflow-auto p-2">
              <Link 
                href='/'
                className={`
                  flex items-center gap-x-2 border-2 p-3 my-1 hover:bg-gray-100
                  ${pathname === '/' && !Object.keys(query).length ? 'text-[#F51997] border-[#f519975c] rounded-lg' : "rounded-full"}
                  `} 
                onClick={() => setMobileSidebar(false)}
              >
                <FaHome className='w-[32px] h-[32px]' />
                <p className="font-semibold text-xl">Home</p>
              </Link>

              <Discover />
              {!!allUsers.length && (
                <SuggestedAccounts />
              )}
              <Footer />
            </div>
          </div>
          <div 
            className="absolute right-0 bottom-0 top-0 w-1/5 bg-[rgba(0,0,0,0.2)] " 
            onClick={() => setMobileSidebar(false)}
          />
        </div>
      )}
    </>
  );
};

export default MobileSidebar;