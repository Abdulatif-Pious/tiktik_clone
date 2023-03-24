import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const topicStyle = 'flex  items-center justify-center  m-1 p-2 border-gray-300 xl:border-2 rounded xl:rounded-full cursor-pointer hover:bg-gray-100';
  const activeTopicStyle = 'flex justify-center text-[#f51997] items-center m-1 p-2 xl:border-[#f51997] xl:border-2 rounded xl:rounded-full cursor-pointer hover:bg-gray-100';

  return (
    <div className="my-3 xl:border-b-2 xl:border-gray-200">
        <p className='hidden xl:block font-bold text-gray-400 my-2'>
          Popular topics
        </p>
        <div className="flex  flex-wrap my-3">
          {topics.map((item, i) => (
            <Link href={`/?topic=${item.name}`} key={`${topics.name}-${i}`}>
              <div className={topic === item.name ? activeTopicStyle : topicStyle}> 
                <span className='font-bold text-2xl mx-2' title={item.name}>{item.icon}</span>
                <span className="hidden xl:block capitalize font-medium mr-2">{item.name}</span>
              </div>
            </Link>
        ))}
        </div>
    </div>
  )
}

export default Discover