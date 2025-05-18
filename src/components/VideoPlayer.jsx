import { useState, useRef } from 'react';
import Timeline from './Timeline';
import TrimBar from './TrimBar';
import './VideoPlayer.css';
import videoSrc from '../assets/sample-video.mp4';

export default function VideoPlayer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      if (time >= trimEnd) videoRef.current.currentTime = trimStart;
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setTrimEnd(videoRef.current.duration);
    }
  };

  const handleTimelineClick = (time) => {
    if (videoRef.current) {
      const newTime = Math.max(trimStart, Math.min(time, trimEnd));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="video-player">
      <div className="video-container">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          src={videoSrc}
          controls
        />
      </div>
      <Timeline
        currentTime={currentTime}
        duration={duration}
        onTimelineClick={handleTimelineClick}
      />
      <TrimBar
        duration={duration}
        trimStart={trimStart}
        trimEnd={trimEnd}
        onTrimChange={(start, end) => {
          setTrimStart(start);
          setTrimEnd(end);
        }}
      />
    </div>
  );
} 