import { useEffect, useState } from 'react'
import Link from 'next/link';
import { AiOutlineComment, } from 'react-icons/ai';

import { useGlobalContext } from '@/globalContext/context';
import useAuthStore from "@/store/auth-store";
import { timeDifference } from '@/utils/time-difference';
import {VideoItem, LikeButton, UserAvatar} from "@/components";

const Post = ({ post : { caption, _createdAt, comments, likes, video, _id, postedBy } }) => {
  {/* IF THE LENGTH OF ITEMS IS MORE 30 CHARACTERS*/}
  const [isFullCaption, setIsFullCaption] = useState(false);  
  const [commentObj, setCommentObj] = useState({ _key: null, isFullComment: false });
  
  const [likesLength, setLikesLength] = useState(likes?.length);  
  
  const { userProfile } = useAuthStore();
  const { likesState } = useGlobalContext(); 

  const commentedByUser = comments?.filter((comment) => comment?.postedBy?._id === userProfile?._id);

  useEffect(() => {
    if (likesState.postId === _id) {
      setLikesLength(likesState.likesCount);
    }
  }, [likesState]);

  const handleFullComment = (_key) => {
    const filteredComment = comments.filter((comment) => comment._key === _key);
    if (filteredComment._key === _key) {
      setCommentObj({ _key, isFullComment: true });
    } else {
      setCommentObj({ _key, isFullComment: false });
    }
  }

  return (
    <article className='w-[380px] space-y-2 p-2 bg-gray-50 rounded-2xl'>
      <div className='flex items-center justify-between'>
        <UserAvatar
          user={postedBy}
        />
        <p className='text-gray-500 italic'>
          {timeDifference(_createdAt)} ago
        </p>       
      </div>
      <VideoItem video={video} />
      
      <div className="w-[340px]">
        <div className='flex gap-x-1'>
          <LikeButton 
            likes={likes} 
            postId={_id}
            color="text-[#f51997]"
          />
          <Link href={`/videoDetails/${_id}`}>
            <AiOutlineComment 
              className={`
                font-semibold text-xl hover:opacity-80 cursor-pointer
                ${!!commentedByUser?.length ? "text-[#f51997]" : "text-gray-500"}
              `} 
            />
          </Link>
        </div>
        
        <div>
          {!!likesLength ? 
            <p className='font-semibold text-gray-500'>
              <span className="font-semibold text-[#f51997]">{likesLength} {" "}</span>
              {likesLength > 1 ? "likes" : "like"}
            </p>
            : 
            <p className="font-medium text-gray-500">Be the first to
              <span className='font-semibold text-[#f51997] italic'>{" "}like</span>
            </p>
          }

          {!!caption.length && 
            (caption?.length > 30 && !isFullCaption) ? 
            <>
              <p className="font-medium">
                {caption?.slice(0, 30)}...
              </p>  
              <span 
                className="font-medium text-[#f51997]/80 hover:opacity-60 cursor-pointer italic" 
                onClick={() => setIsFullCaption(true)}
              >more
              </span>
            </>
            : 
            <>
              <p className='font-semibold'>{caption}</p>
              {isFullCaption && 
                <span 
                  className="font-medium text-[#f51997]/80 hover:opacity-60 cursor-pointer italic" 
                  onClick={() => setIsFullCaption(false)}
                >less
                </span>
              }
            </>
          }

          <hr className='my-2 border-[#f51997]'/>

          {!!comments?.length ? 
            comments?.slice(0, 2).map((comment) => (
              <div key={comment?._key}>
                <UserAvatar user={comment?.postedBy} />
                <>
                  {(comment?.comment?.length > 30 && commentObj._key !== comment?._key) ? 
                    <>
                      <p>{comment?.comment.slice(0, 30)}...</p>
                      <span 
                        className='font-semibold text-[#f51997]/80 hover:opacity-60 cursor-pointer italic'
                        onClick={() => handleFullComment(comment?._key)}
                      >more
                      </span>
                    </>
                  :  
                    <>
                      <p>{comment?.comment}</p>
                      {commentObj._key === comment?._key && 
                        <span 
                          className="font-medium text-[#f51997]/80 hover:opacity-60 cursor-pointer italic" 
                          onClick={() => setCommentObj({ _key: null, isFullComment: false } )}
                        >less
                        </span>
                      }
                    </>
                  }
                </>
              </div>  
            ))
            : 
            <Link href={`/videoDetails/${_id}`} className="font-medium text-gray-500">
              Be the first to 
              <span className='font-semibold text-[#f51997] italic'>{" "}comment</span>
            </Link>
          }
            {comments?.length > 2 && 
              <Link href={`/videoDetails/${_id}`} className='hover:text-gray-400'>
                View all 
                <span className="font-semibold text-[#f51997] "> {comments?.length} </span>
                comments
              </Link>
            }
        </div>
      </div>
    </article>
  );
};

export default Post