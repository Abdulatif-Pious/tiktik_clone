import { useState, useEffect, useRef } from 'react';
import { AiOutlinePauseCircle } from 'react-icons/ai';
import { BsPlay } from 'react-icons/bs';
import { BiVolumeMute } from 'react-icons/bi';
import { VscUnmute } from 'react-icons/vsc'

const VideoItem = ({ video, widthFull }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  
  const PlayPauseIcon = isPlaying ? AiOutlinePauseCircle : BsPlay;
  const ToggleMutedIcon = isMuted ? BiVolumeMute : VscUnmute;

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false); 
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    };

  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className={`group relative bg-black
      ${widthFull ? "w-4/5 " : "w-[340px] h-[300px]"} 
    `}
    >
      <video
        ref={videoRef}
        src={video?.asset?.url}
        className="w-full h-full aspect-video cursor-pointer"
        onClick={handlePlayPause}
      />

      <div className="hidden group-hover:flex justify-between items-center mx-4">
        <div 
          className='group/icon absolute bottom-[10px] p-2 rounded-full bg-gray-700 hover:bg-gray-700/80 cursor-pointer'
          onClick={handlePlayPause}
        >
          <PlayPauseIcon className="text-xl text-[#f5199797] group-hover/icon:opacity-80" /> 
        </div>
        <div
          className='group/icon absolute bottom-[10px] right-5 p-2 rounded-full bg-gray-700 hover:bg-gray-700/80 cursor-pointer'
          onClick={() => setIsMuted(!isMuted)}
        >
          <ToggleMutedIcon 
            className='text-xl text-[#f5199797] group-hover/icon:opacity-80'
          />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;