import React, { useState, useEfect, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast'; 
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


import { BASE_URL } from '../utils';
import { topics } from '../utils/constants';
import { client } from '../utils/client';
import  useAuthStore  from '../store/authStore';

const Upload = () => {
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState(topics[0].name);
  const [wrongFileType, setWrongFileType]= useState(false);
  const [loading, setLoading] = useState(false); 
  const [videoAsset, setVideoAsset] = useState(undefined);
  const [isPosting, setIsPosting] = useState(false);
  
  const router = useRouter();  
  const  userProfile  = useAuthStore((state) => state.userProfile);
  
  useEffect(() => {
    if (!userProfile) router.push('/');
}, [userProfile]);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    // upload the asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setLoading(true);
      setWrongFileType(false);
      
      client.assets
        .upload('file', selectedFile, {
          contentType : selectedFile.type,
          filename : selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setLoading(false);
        });
    }  else {
      setLoading(false);
      setWrongFileType(true);
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
      
      await axios.post(`http://localhost:3000/api/post`, doc);
      router.push('/');
      setIsPosting(false);
    } 
  };

  const handleDiscard = () => {
    setVideoAsset(undefined);
    setLoading(false);
    setIsPosting(false);
    setCaption('');
  }

  return (
    <div className='flex  flex-col  w-full mt-10'>
      <div className="flex flex-col items-center ">
        <h2 className="font-bold text-2xl">Upload Video</h2>
        <p className="font-semibold text-base text-gray-300">
          Post a video to your account
        </p>
      </div>

      <div className='flex flex-wrap my-12 px-12 w-full'>
        <label htmlFor='upload-video' className="cursor-pointer">
          <div className="flex flex-col md:w-[400px] md:h-[500px] mr-8 p-8 items-center justify-center border-dashed border-2 rounded-xl border-gray-300 hover:bg-gray-100 hover:border-[#f51997]">
            {loading ? (
              <div className='font-bold text-4xl flex items-center justify-center text-[#f51997]'>
                Loading...
              </div>
            ) : (
              <div>
                {videoAsset ? (
                  <div className="flex flex-col items-center justify-center w-[450px] h-[550px] py-8 mr-6 bg-black rounded-xl">
                    <video 
                      src={videoAsset?.url}
                      loop
                      controls
                      className='w-full h-[400px]'
                    />
                    <div className="flex justify-between px-8   w-full">
                      <p className={`text-lg text-gray-300 ${videoAsset?.originalFilename?.length > 30 && 'truncate'}`}>{videoAsset?.originalFilename.length > 30 ?  videoAsset?.originalFilename.slice(0, 30) : videoAsset?.originalFilename}</p>
                      <button 
                        type="button" 
                        className="flex items-center justify-center w-14 h-14 text-[#f51997] hover:text-[#c5199790] bg-gray-300 rounded-full cursor-pointer"
                        onClick={handleDiscard}
                      >
                        <MdDelete className="text-3xl" />
                      </button>
                    </div>
                  </div>
                ) : (
                <div className="flex flex-col items-center justify-center">
                  <FaCloudUploadAlt className="text-4xl rounded-full text-[#f51997] bg-gray-300" />
                  <h3 className='font-bold text-xl mb-8'>Select video to upload</h3>
                  <p className="text-gray-400 my-2 ">MP4 or WebM or ogg</p>
                  <p className='text-gray-400 my-2 '>720x1080 resolution or higher</p>
                  <p className='text-gray-400 my-2 '>Up to 10 minutes</p>
                  <p className='text-gray-400 my-2 '>Less than 2 GB</p>
                  <p  className="font-semibold w-full text-lg text-white text-center py-2 my-4 rounded-lg bg-[#f51997] hover:font-bold  hover:bg-[#fd05aa71] cursor-pointer">
                    Select file
                  </p>
                  <input 
                    type="file"
                    id='upload-video'
                    className='w-0 h-0'
                    onChange={(e) => handleUpload(e)}

                  />
                  {wrongFileType && (
                    <div className="font-semibold text-xl text-[#f51997] my-6 ">
                      Please select a video file <br />
                      (mp4 or webm, or ogg)
                    </div>
                  )}
                </div>  
              )}
              </div>
            )}
          </div>
        </label>
        <div className="my-8 w-1/2">
          <label htmlFor="caption" className="font-semibold md:text-xl cursor-pointer">Caption</label>
          <input 
            type='text'
            id="caption"
            autoComplete={false}
            className="font-semibold block md:text-xl min-w-[200px] w-full rounded-lg my-4 p-3 outline-none border-gray-300 focus:border-[#f51997] border-2 cursor-pointer"
            placeholder="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <label  className="font-semibold md:text-xl">Choose a topic</label>
          <select 
            onClick={(e) => setTopic(e.target.value) | 'choose a topic'}
            className="capitalize font-semibold block md:text-lg rounded-lg my-4 p-3 min-w-[200px] w-full border-2 border-gray-300 focus:border-[#f51997] outline-none cursor-pointer"
          >  
            {topics.map((item, i) => (
              <option 
                value={item.name} 
                key={`${item.value}-${i}`}
                className="capitalize  min-w-full md:text-base hover:bg-gray-300 cursor-pointer"
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className='flex flex-1'>
            <button 
              type="button" 
              className="font-semibold min-w-[100px] max-w-[150px] md:text-lg my-4 flex justify-center flex-1 py-3 rounded-lg outline-none border-2 border-gray-300 hover:border-[#f51997] cursor-pointer"
              onClick={handleDiscard}  
            >
              Discard
            </button>
            <button 
              disabled={caption && topic && videoAsset ? false : true}
              type="button" 
              onClick={handlePost} 
              className={`font-semibold min-w-[100px] max-w-[150px] md:text-lg text-white  ml-4 my-4 flex justify-center flex-1 py-3 rounded-lg outline-none bg-[#f51997]  cursor-pointer ${caption && topic && videoAsset && !isPosting ? 'cursor-pointer hover:bg-[#d5199796]' : 'cursor-not-allowed'}`}
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