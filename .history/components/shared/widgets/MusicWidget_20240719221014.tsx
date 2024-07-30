import React, { useState, useEffect, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50);
    const [audioSrc, setAudioSrc] = useState('');

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
        audioRef.current?.play();
        } else {
        audioRef.current?.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
        const updateTime = () => setCurrentTime(audioRef.current?.currentTime || 0);
        audioRef.current.addEventListener('timeupdate', updateTime);
        return () => audioRef.current?.removeEventListener('timeupdate', updateTime);
        }
    }, []);

    useEffect(() => {
        if (audioRef.current && canvasRef.current && !audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);

        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');

        const draw = () => {
            requestAnimationFrame(draw);
            if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray);

            if (canvasCtx) {
                canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / bufferLength) * 2.5;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2;
                canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
                canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
                }
            }
            }
        };

        draw();
        }
    }, []);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const url = URL.createObjectURL(file);
        setAudioSrc(url);
        if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.onloadedmetadata = () => {
            setDuration(audioRef.current?.duration || 0);
            };
        }
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSkipForward = () => {
        if (audioRef.current) {
        audioRef.current.currentTime += 10;
        }
    };

    const handleSkipBackward = () => {
        if (audioRef.current) {
        audioRef.current.currentTime -= 10;
        }
    };

    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg col-span-2 row-span-2">
        <audio ref={audioRef} src={audioSrc} />
        <canvas ref={canvasRef} width="240" height="60" className="mb-4" />
        
        <div className="mb-4">
            <h2 className="text-lg font-semibold truncate">
            {audioSrc ? audioSrc.split('/').pop() : 'No file selected'}
            </h2>
        </div>
        
        <div className="flex items-center justify-between mb-2">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => {
                if (audioRef.current) {
                audioRef.current.currentTime = value[0];
                }
            }}
            className="w-40"
            />
            <span className="text-xs">{formatTime(duration)}</span>
        </div>
        
        <div className="flex justify-center space-x-4 mb-4">
            <Button variant="ghost" size="icon" onClick={handleSkipBackward}>
            <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSkipForward}>
            <SkipForward className="h-4 w-4" />
            </Button>
        </div>
        
        <div className="flex items-center mb-4">
            <Volume2 className="h-4 w-4 mr-2" />
            <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
            className="w-full"
            />
        </div>

        <input 
            type="file" 
            accept="audio/*" 
            onChange={handleFileChange}
            className="text-sm text-gray-400"
        />
        </div>
    );
};

export default MusicPlayer;