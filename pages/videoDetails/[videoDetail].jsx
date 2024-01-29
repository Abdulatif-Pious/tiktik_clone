import  { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineComment, } from 'react-icons/ai';

import { useGlobalContext } from '@/globalContext/context'
import  useAuthStore  from '@/store/auth-store'; 
import { BASE_URL } from '@/utils';
import { timeDifference } from '@/utils/time-difference';
import { LikeButton, Comment, VideoItem, UserAvatar } from '@/components';

const Button = ({ likes, postId, color, likesLength, commentedByUser, post }) => {
  return (
    <div className='text-xs md:text-base flex items-center justify-center flex-wrap gap-x-2 py-2 px-4 rounded-full bg-[#f51997]/80'>
      {likes ? (
        <>
          <LikeButton 
            likes={likes}
            postId={postId}
            color={color}
          />
          {!!likesLength ? 
            <p className='font-medium text-white'>
              <span className="font-semibold">{likesLength} {" "}</span>
              {likesLength > 1 ? "likes" : "like"}
            </p>
            : 
            <p className="font-medium text-center text-white">Be the first to
              <span className='font-semibold italic'>{" "}like</span>
            </p>
          }
        </>
      )
      : 
      (
        <>
          <AiOutlineComment  
            className={`font-semibold text-xl 
              ${!!commentedByUser.length && "text-white"} 
            `} 
          />
          {!!post?.comments ? 
          <p className='font-medium text-white'>
            <span className='font-semibold '>{post?.comments.length}{" "}</span>
            {post?.comments?.length > 1 ? "comments" : "comment" }
          </p>
          : 
          <p className="text-xs md:text-base font-medium text-white">Be the first to
            <span className='font-semibold  italic'>{" "}comment</span>
          </p>
          }
        </>
      )}
    </div>
  );
};

const videoDetail = ({ VideoPost }) => {
  const [post, setPost] = useState(VideoPost);
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [likesLength, setLikesLength] = useState(post?.likes?.length);

  const { smallSidebar, likesState } = useGlobalContext();
  const { userProfile }  = useAuthStore();

  useEffect(() => {
    if (likesState.postId === post?._id) {
      setLikesLength(likesState.likesCount);
    }
  }, [likesState]);

  const commentedByUser = post?.comments?.filter((comment) => comment?.postedBy?._ref === userProfile?._id);

  const handleComment = async () => {
    try {
      setIsSending(true);
      const res = await axios.put(`${BASE_URL}/api/post/${post?._id}`, {
        userId : userProfile?._id,
        _id : post?._id,
        comment,
        createdAt: new Date(),
      });
      setPost({ ...post, comments : res.data.comments  })
    } catch (error) {
      console.log(error);
    } finally {
      setComment("");
      setIsSending(false);
    }
  }
  
  const handleCancel = () => {
    setComment('');
    setIsSending(false);
  }

  useEffect(() => {
    setIsMounted(!isMounted)
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className={`
        flex flex-col items-center gap-y-8 w-full h-full md:ml-8 mt-10
        ${smallSidebar ? "md:pl-[50px]" : "md:pl-[350px]"}
    `}
    >
      <div className="flex justify-center w-full">
        <VideoItem video={post?.video} widthFull />
      </div>

      <div className='flex flex-col w-4/5'>
        <div className='flex items-center  justify-between flex-wrap gap-6'>
          <UserAvatar user={post?.postedBy} />
          <div className='flex items-center gap-x-2'>
            <Button 
              likes={post?.likes}
              postId={post?._id}
              color="text-white"
              likesLength={likesLength}
            />
            <Button 
              commentedByUser={commentedByUser}
              post={post}
            />
          </div>
          <p className='ml-auto text-gray-500 italic'>{timeDifference(post?._createdAt)} ago</p>
        </div>
      
        {post?.caption && (
          <p className="font-medium my-4">{post?.caption}</p>
        )}
        
        <Comment 
          comment={comment}
          setComment={setComment}
          comments={post?.comments}
          isSending={isSending}
          setIsSending={setIsSending}
          handleComment={handleComment}
          handleCancel={handleCancel}
        />
      </div>

    </div>
  )
}


export default videoDetail;

export const getServerSideProps = async ({ params : { videoDetail } }) => {
  const response = await axios.get(`${BASE_URL}/api/post/${videoDetail}`)

  return {
    props : {
      VideoPost : response.data,
    }
  };
};