import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '@/utils/constants';
import { useGlobalContext } from '@/globalContext/context';

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const { mobileSidebar, smallSidebar, setMobileSidebar } = useGlobalContext();

  return (
    <div className="my-1">
      {(!smallSidebar || mobileSidebar) && 
        <p className='font-semibold text-gray-500 my-2'>
          Popular topics
        </p>
      }
      <div className="flex flex-wrap gap-x-2">
        {topics.map((item, i) => (
          <Link 
            key={`${topics.name}-${i}`}
            href={`/?topic=${item.name}`} 
            className={`
                flex items-center justify-center gap-x-2 w-full border-2 p-3 my-1 cursor-pointer hover:bg-gray-100 
                ${item.name === topic ? "text-[#f51997] border-[#f519975c]  rounded-lg" : "border-gray-300 rounded-full"}
              `
            }
            onClick={() => {
              if (window.innerWidth < 768) {
                setMobileSidebar(false)
              }
            }}
            title={item.name}
          >
            <span>{item.icon}</span>
            {(mobileSidebar || !smallSidebar) && (
              <span className={`capitalize font-medium mr-2`}>{item.name}</span>
            )}    
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;