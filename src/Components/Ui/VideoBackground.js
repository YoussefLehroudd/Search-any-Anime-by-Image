import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsVolumeMuteFill, BsVolumeUpFill } from 'react-icons/bs';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const VideoContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;

  @media (max-width: 768px) {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
    &::after {
      display: none;
    }
  }
  
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

    @media (max-width: 768px) {
      display: none;
    }
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const VideoBackground = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(() => {
    const savedMute = localStorage.getItem('videoMuted');
    return savedMute ? JSON.parse(savedMute) : false;
  });

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const startVideo = useCallback(async () => {
    if (videoRef.current && !isMobile) {
      try {
        await videoRef.current.play();
      } catch (error) {
        console.log("Video autoplay failed:", error);
        setIsMuted(true);
        videoRef.current.muted = true;
        try {
          await videoRef.current.play();
        } catch (retryError) {
          console.log("Retry with muted video failed:", retryError);
        }
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      startVideo();
      
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          startVideo();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [startVideo, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('videoMuted', JSON.stringify(isMuted));
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
      }
    }
  }, [isMuted, isMobile]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <VideoContainer>
        {!isMobile && (
          <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            muted={isMuted}
            preload="auto"
            onCanPlay={startVideo}
            onEnded={(e) => e.target.play()}
          >
            <source src="/THIS IS 4K ANIME (Jujutsu Kaisen).mp4" type="video/mp4" />
          </video>
        )}
      </VideoContainer>
      {!isMobile && (
        <MuteButton onClick={toggleMute}>
          {isMuted ? <BsVolumeMuteFill size={20} /> : <BsVolumeUpFill size={20} />}
        </MuteButton>
      )}
    </>
  );
};

export default VideoBackground;
