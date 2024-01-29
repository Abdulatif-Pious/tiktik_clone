import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import { useGlobalContext } from '@/globalContext/context';
import { BASE_URL } from '@/utils';
import { topics } from '@/utils/constants';
import { client } from '@/utils/client';
import  useAuthStore  from '@/store/auth-store';

const Upload = () => {
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState("");
  const [wrongFileType, setWrongFileType]= useState(false);
  const [loading, setLoading] = useState(false); 
  const [videoAsset, setVideoAsset] = useState(undefined);
  const [isPosting, setIsPosting] = useState(false);
  
  const { smallSidebar } = useGlobalContext();

  const router = useRouter();  
  const  userProfile  = useAuthStore((state) => state.userProfile);
  
  useEffect(() => {
    if (!userProfile) router.push('/');
}, [userProfile]);

  const handleUpload = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

      // upload the asset to sanity
      if (fileTypes.includes(selectedFile?.type)) {
        setLoading(true);
        setWrongFileType(false);
        
        await client.assets
          .upload('file', selectedFile, {
            contentType : selectedFile.type,
            filename : selectedFile.name,
          })
          .then((data) => {
            setVideoAsset(data);
          });
      } else {
        setWrongFileType(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handlePost = async () => {
    if (caption && videoAsset?._id && topic) {
      setIsPosting(true);  
      const doc = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic,
      };
      
      await axios.post(`${BASE_URL}/api/post`, doc);
      router.push('/');
      setIsPosting(false);
    } 
  };

  const handleCancel = () => {
    setVideoAsset(undefined);
    setLoading(false);
    setIsPosting(false);
    setCaption('');
    setTopic("");
  }

  return (
    <div 
      className={`
        flex flex-col xl:justify-center gap-y-8 w-full h-full md:ml-8 mt-10 xl:mt-0
        ${smallSidebar ? "md:pl-[50px]" : "md:pl-[350px]"}
      `}
    >
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-xl">Upload Video</h2>
        <p className="font-medium text-base text-gray-400">
          Post a video
        </p>
      </div>

      <div className='flex items-center justify-center flex-wrap gap-8 w-full'>
        <div className="flex flex-col items-center justify-center w-[400px] h-[500px]  border-dashed border-2 rounded-xl mx-4 border-gray-400 hover:bg-gray-50 hover:border-[#f51997]">
          {loading ? (
            <div className='font-semibold text-2xl flex items-center justify-center h-full text-[#f51997]'>
              Loading...
            </div>
          ) : (
            <>
              {videoAsset ? (
                <div className="flex flex-col items-center justify-center gap-2 w-full h-full rounded-xl p-2">
                  <video 
                    src={videoAsset?.url}
                    loop
                    controls
                    className='w-full h-full rounded-xl cursor-pointer bg-black'
                  />
                  <div className="flex items-center justify-between w-full">
                    <p className="text-[#f51997] truncate">
                      {videoAsset?.originalFilename.length > 30 
                        ? 
                      videoAsset?.originalFilename.slice(0, 30) 
                      : 
                      videoAsset?.originalFilename}
                    </p>
                    <button 
                      type="button" 
                      className="flex items-center justify-center rounded-full p-3 text-[#f51997] hover:text-[#c51997]/80 bg-gray-300 hover:bg-gray-200  cursor-pointer"
                      onClick={handleCancel}
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col items-center justify-center h-full">
                    <FaCloudUploadAlt className="text-4xl text-[#f51997]" />
                    <h3 className='font-semibold text-xl'>Select a video to upload</h3>
                    <p className="text-gray-400 my-2">MP4 or WebM or ogg</p>
                    <input 
                      type="file"
                      id='upload-video'
                      className='w-0 h-0'
                      onChange={(e) => handleUpload(e)}
                      accept=".mp4, .webm, .ogg"
                    />
                    {wrongFileType && (
                      <h3 className="font-medium text-gray-400 text-center my-4">
                        Please select a video format: <br />
                        <span className='text-[#f51997]'>MP4 or WebM, or ogg</span>
                      </h3>
                    )}
                  </div> 
                  <label 
                    htmlFor='upload-video' 
                    className="block font-semibold text-white hover:text-opacity-90 text-center py-2 rounded-lg bg-[#f51997] hover:bg-[#f51997]/80 cursor-pointer"
                  >
                    Select file
                  </label>
                </div>
              )}
            </>
          )}
        </div>
        <div>
          <label htmlFor="caption" className="font-medium text-sm cursor-pointer">Caption</label>
          <textarea 
            type='text'
            id="caption"
            rows={6}
            className="font-medium block rounded-lg my-4 p-3 outline-none resize-none w-full border-2 border-gray-300 focus:border-[#f51997] placeholder:italic"
            placeholder="caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <label  className="font-medium text-sm">Choose a topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="capitalize font-medium text-sm block rounded-lg my-4 p-3 outline-none w-full border-2 border-gray-300 focus:border-[#f51997] cursor-pointer"
          >  
            <option value="" disabled>
              Choose a topic
            </option>
            {topics.map((item, i) => (
              <option 
                value={item.name} 
                key={`${item.value}-${i}`}
                className="capitalize  cursor-pointer"
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className='flex gap-4 w-full'>
            <button 
              type="button" 
              className="flex justify-center w-full py-3 rounded-lg outline-none border-2 border-gray-300 hover:border-[#f51997] cursor-pointer"
              onClick={handleCancel}  
            >
              Cancel
            </button>
            <button 
              type="submit" 
              onClick={handlePost} 
              className={`
                flex justify-center text-white w-full py-3 rounded-lg outline-none bg-[#f51997]  cursor-pointer 
                ${(caption && topic && videoAsset && !isPosting) ? 'cursor-pointer hover:bg-[#f51997]/80' : 'opacity-80 bg-[#f51997]/80 cursor-not-allowed'}`
              }
            >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Upload;