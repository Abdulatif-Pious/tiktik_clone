import React from 'react'

import { links1, links2, links3 } from '../utils/constants';

const Footer = () => {
  return (
    <div className='hidden xl:block'>
      <div className="my-3">
        {links1.map((link) => (
          <span key={link} className="text-sm mr-1   capitalize text-gray-400 hover:underline cursor-pointer">
            {link}
          </span>
        ))}
      </div>
      <div className='my-3'>
        {links2.map((link) => (
          <span key={link} className="text-sm mr-1   capitalize text-gray-400 hover:underline cursor-pointer">
            {link}
          </span>
        ))}
      </div>
      <div className='my-3'>
        {links3.map((link) => (
          <span key={link} className="text-sm mr-1   capitalize text-gray-400 hover:underline cursor-pointer">
            {link}
          </span>
        ))}
      </div>
      
      <p className="font-semibold text-sm text-gray-400 mt-4">© 2023 TikTik</p>
    </div>
  )
}

export default Footer