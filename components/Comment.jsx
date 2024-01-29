
import useAuthStore from '@/store/auth-store';
import { timeDifference } from '@/utils/time-difference';
import { UserAvatar } from '@/components';

const Comment = ({ comment, setComment, comments, isSending,  handleComment, handleCancel}) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div>
      {userProfile && (
        <div className="mb-4">
          <input 
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="comment..."
            className="font-medium text-gray-500 w-full p-3 outline-none rounded-xl border-2 border-gray-400 focus:border-[#f51997] placeholder:italic"
          />
          <div className='flex justify-end ml-auto w-1/4 min-w-[200px] gap-x-2 mt-4'>
            <button 
              type="button"
              className="w-full p-3 border-2 border-gray-300 hover:border-[#f51997] rounded-xl ouline-none cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className={`text-white w-full p-3 rounded-xl ouline-none cursor-pointer
                ${comment ? 'cursor-pointer bg-[#f51997]' : 'opacity-80 bg-[#f51997]/80 cursor-not-allowed' } 
              `}
              onClick={handleComment}
              disabled={comment ? false : true}
              >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}

      {!!comments.length ? 
      <div className='w-full bg-gray-50 rounded-xl p-2'>   
        {comments?.map((item, i) => {
          const user = allUsers.filter((user) => user?._id === item?.postedBy?._ref);

          return (
            <div key={`${item?._key}_${i}`} className="border-b-2 border-[#f51997]/20 mb-2">
              <div className='flex items-center justify-between'>
                <UserAvatar user={user[0]} />
                <p className='text-gray-500 italic'>{timeDifference(item?.createdAt)} ago</p>
              </div>
              
              <p className='font-medium text-gray-500 my-2'>{item?.comment}</p>
            </div>
          )
        })}
      </div>
      : 
      <div className='flex items-center justify-center'>
        <p className="text-lg font-semibold text-gray-500">
          Be the first to
          <span className="font-bold text-[18px] text-[#f51997] italic">{" "} comment</span>
        </p>
      </div>}
    </div>
  );
};

export default Comment