import axios from 'axios';

import { useGlobalContext } from '@/globalContext/context';
import { BASE_URL } from '@/utils';

import  Post  from '../components/post';

export default function Home({ post }) {
  const { smallSidebar } = useGlobalContext();
  
  return (
    <div 
      className={`
        flex justify-center  w-full h-full md:ml-8 my-10 xl:my-0
        ${smallSidebar ? "md:pl-[50px]" : "md:pl-[350px]"}
        ${!post.length  && "items-center"}
      `}
    >  
      <div 
        className={`
          flex justify-center flex-wrap gap-4 xl:gap-10 w-full h-fit
          ${!post.length  && "h-full"}
        `}
      >
        {!!post.length ? (
          post?.map((item) => (
            <Post post={item} key={item._id} />
          ))
        ) : (
          <h3 className='font-semibold text-4xl text-[#f51997]'>No result</h3>
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
