import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Example duration in seconds
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
      <div className="mb-4">
        <h2 className="text-lg font-semibold truncate">Song Title</h2>
        <p className="text-sm text-gray-400 truncate">Artist Name</p>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => setCurrentTime(value[0])}
          className="w-40"
        />
        <span className="text-xs">{formatTime(duration)}</span>
      </div>
      
      <div className="flex justify-center space-x-4 mb-4">
        <Button variant="ghost" size="icon" onClick={() => {}}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => {}}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center">
        <Volume2 className="h-4 w-4 mr-2" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0])}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;