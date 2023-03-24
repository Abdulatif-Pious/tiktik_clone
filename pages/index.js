import React from 'react';
import axios from 'axios';

import  Post from '../components/Post';
import { BASE_URL } from '../utils';

export default function Home({ post }) {

  return (
    <div className="flex justify-center w-full ">  
      <div className='flex justify-center flex-wrap gap-4 xl:gap-10 w-full h-fit mt-10'>
        {post.length ? (
          post?.map((item) => (
            <Post post={item} key={item._id} />
          ))
        ) : (
          <h3>No Results</h3>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ query : { topic } }) => {
  let response = await axios.get(`${BASE_URL}/api/post`);
  
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  }
  return {
    props : {
      post : response.data
    }
  };
};
