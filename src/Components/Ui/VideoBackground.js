import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsVolumeMuteFill, BsVolumeUpFill } from 'react-icons/bs';

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }

  video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MuteButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const VideoBackground = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(() => {
    const savedMute = localStorage.getItem('videoMuted');
    return savedMute ? JSON.parse(savedMute) : false;
  });

  const startVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch (error) {
        console.log("Video autoplay failed:", error);
        // If autoplay fails, try again with muted video
        setIsMuted(true);
        videoRef.current.muted = true;
        try {
          await videoRef.current.play();
        } catch (retryError) {
          console.log("Retry with muted video failed:", retryError);
        }
      }
    }
  };

  useEffect(() => {
    startVideo();
    
    // Add event listeners for visibility change
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        startVideo();
      }
    });

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", startVideo);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('videoMuted', JSON.stringify(isMuted));
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <VideoContainer>
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          onCanPlay={startVideo}
          onEnded={(e) => e.target.play()}
        >
          <source src="/THIS IS 4K ANIME (Jujutsu Kaisen).mp4" type="video/mp4" />
        </video>
      </VideoContainer>
      <MuteButton onClick={toggleMute}>
        {isMuted ? <BsVolumeMuteFill size={20} /> : <BsVolumeUpFill size={20} />}
      </MuteButton>
    </>
  );
};

export default VideoBackground;
