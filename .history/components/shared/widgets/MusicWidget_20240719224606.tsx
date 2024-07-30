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
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
        audioRef.current?.play();
        initializeAudioContext();
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

    const initializeAudioContext = () => {
        if (!audioContextRef.current && audioRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);

        analyserRef.current.fftSize = 256;
        draw();
        }
    };


    const draw = () => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const drawVisual = () => {
            animationRef.current = requestAnimationFrame(drawVisual);
            analyserRef.current!.getByteFrequencyData(dataArray);

            // Clear the canvas with a transparent background
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            // Set the fill style to the text-foreground color
            canvasCtx.fillStyle = 'var(--foreground)';

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2;
                canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
    
        drawVisual();
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

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

    useEffect(() => {
        return () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        };
    }, []);

    return (
        <div className=" p-4 rounded-lg col-span-8 row-span-2">
            <audio ref={audioRef} src={audioSrc} />
            <canvas ref={canvasRef} width="1000" height="100" className="mb-4 w-full h-16 text-foreground " /> 
            
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
                className="mx-4"
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