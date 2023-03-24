import React, { useState, useEffect, useRef } from 'react';
import { AiOutlinePauseCircle } from 'react-icons/ai';
import { BsPlay } from 'react-icons/bs';
import { BiVolumeMute } from 'react-icons/bi';
import { VscUnmute } from 'react-icons/vsc'

const VideoPiece = ({ video, videoPiece }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false); 
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }



  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className={`${videoPiece && 'flex justify-center'}`}>
      <div className='relative'>
        <video
          ref={videoRef}
          src={video?.asset?.url}
          className={`w-[300px] h-[270px] ${videoPiece && 'min-h-[300px] h-[400px] min-w-[50%] w-[500px]'}  bg-black cursor-pointer`}
          onClick={handlePlayPause}
        />
        <div className="flex justify-between items-center ml-2">
          {isPlaying ? (
            <div className='absolute bottom-[10px]'>
              <AiOutlinePauseCircle 
                className="text-xl  text-[#f5199797] opacity-80  cursor-pointer"
                onClick={handlePlayPause}  
              />
            </div> ) : (
            <div className='absolute bottom-[10px]'>
              <BsPlay 
                className="text-xl text-[#f5199797] opacity-80 group-hover:opacity-80 cursor-pointer" 
                onClick={handlePlayPause}  
              />
            </div>
          )}
          <div className='absolute bottom-[10px] right-5'>
            {isMuted ? (
              <BiVolumeMute 
                className='text-xl text-[#f5199797] opacity-80 group-hover:opacity-80 cursor-pointer'
                onClick={() => setIsMuted(!isMuted)}
                />
            ) : (
              <VscUnmute 
                className='text-xl text-[#f5199797] opacity-80 group-hover:opacity-80 cursor-pointer'
                onClick={() => setIsMuted(!isMuted)}
                />
            )}  
          </div>
        </div>
    </div>
  </div>
  )
};

export default VideoPiece;