import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress, FaFolder } from 'react-icons/fa';

const VideoPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false); 
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
        if (videoSrc) {
            URL.revokeObjectURL(videoSrc);
        }
        };
    }, [videoSrc]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const objectUrl = URL.createObjectURL(file);
        setVideoSrc(objectUrl);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (newVolume: number[]) => {
        const volumeValue = newVolume[0];
        if (videoRef.current) {
        videoRef.current.volume = volumeValue;
        setVolume(volumeValue);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
        setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (newTime: number[]) => {
        const seekTime = newTime[0];
        if (videoRef.current) {
        videoRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
        playerRef.current?.requestFullscreen();
        setIsFullscreen(true);
        } else {
        document.exitFullscreen();
        setIsFullscreen(false);
        }
    };

    return (
        <Card className="card !rounded-none w-full h-full" ref={playerRef}>
            <div 
                className="relative w-full h-full" 
            >
                {videoSrc ? (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        className="w-full h-full object-contain"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onClick={togglePlay}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bgOpacity">
                        <p className="text-gray-500">No video selected</p>
                    </div>
                )} 

                <div className={`absolute bottom-0 left-0 right-0 bgblur bgOpacity card transition-opacity duration-300 peer opacity-0 hover:opacity-100`}>
                    <div className="flex items-center justify-between mb-2">
                        <Slider
                        value={[currentTime]}
                        max={duration}
                        step={0.1}
                        onValueChange={handleSeek}
                        className="w-full"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={togglePlay}
                                className="lucidBarIcon"
                            >
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMute}
                                className="lucidBarIcon"
                            >
                                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </Button>
                            <Slider
                                value={[volume]}
                                max={1}
                                step={0.01}
                                onValueChange={handleVolumeChange}
                                className="w-24"
                            />
                            <span className="text-sm">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => fileInputRef.current?.click()}
                                className="lucidBarIcon bg-background/50 hover:bg-background/70"
                            >
                                <FaFolder />
                            </Button>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <Button 
                            variant="ghost" 
                            size="icon" 
                            className="lucidBarIcon"
                            onClick={toggleFullscreen}
                            >
                                {isFullscreen ? <FaCompress /> : <FaExpand />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default VideoPlayer;