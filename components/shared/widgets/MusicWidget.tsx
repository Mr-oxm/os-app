import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Input } from '@/components/ui/input';

const MusicPlayer = ({isWidget=true}:{isWidget?:boolean} ) => { 
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50);
    const [audioSrc, setAudioSrc] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [titlePosition, setTitlePosition] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null); 
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationRef = useRef<number | null>(null);

    const { theme } = useTheme();
    const [themeColor, setThemeColor] = useState(theme === 'dark' ? 'white' : 'black');
    const canvasTopRef = useRef<HTMLCanvasElement | null>(null);
    const canvasBottomRef = useRef<HTMLCanvasElement | null>(null);

    const draw = useCallback(() => {
        if (!canvasTopRef.current || !canvasBottomRef.current || !analyserRef.current) return;
        
        const canvasTop = canvasTopRef.current;
        const canvasBottom = canvasBottomRef.current;
        const canvasTopCtx = canvasTop.getContext('2d');
        const canvasBottomCtx = canvasBottom.getContext('2d');
        if (!canvasTopCtx || !canvasBottomCtx) return;
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const drawVisual = () => {
            animationRef.current = requestAnimationFrame(drawVisual);
            analyserRef.current!.getByteFrequencyData(dataArray);
        
            canvasTopCtx.clearRect(0, 0, canvasTop.width, canvasTop.height);
            canvasBottomCtx.clearRect(0, 0, canvasBottom.width, canvasBottom.height);
            canvasTopCtx.fillStyle = themeColor;
            canvasBottomCtx.fillStyle = themeColor;
        
            const barWidth = (canvasTop.width / bufferLength) * 2.5;
            let x = 0;
        
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 2;
                
                // Draw top bars
                canvasTopCtx.fillRect(x, canvasTop.height - barHeight, barWidth, barHeight);
                
                // Draw bottom bars (flipped)
                canvasBottomCtx.fillRect(x, 0, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        };
        
        drawVisual();
    }, [themeColor]);

    useEffect(() => {
        let animationId: number;
        if (!isWidget && songTitle) {
            const animate = () => {
                setTitlePosition((prev) => (prev + 1) % (window.innerWidth + songTitle.length * 20));
                animationId = requestAnimationFrame(animate);
            };
            animationId = requestAnimationFrame(animate);
        }
        return () => cancelAnimationFrame(animationId);
    }, [isWidget, songTitle]);

    useEffect(() => {
        if (isPlaying && audioContextRef.current && analyserRef.current) {
            draw();
        }
    }, [isPlaying, draw]);

    useEffect(() => {
        setThemeColor(theme === 'dark' ? 'white' : 'black');
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (isPlaying && audioContextRef.current && analyserRef.current) {
            draw();
        }
    }, [theme, isPlaying, draw]);

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

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioSrc(url);
            setSongTitle(file.name.replace(/\.[^/.]+$/, "").toUpperCase());
            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.onloadedmetadata = () => {
                    setDuration(audioRef.current?.duration || 0);
                    audioRef.current?.play().then(() => {
                        setIsPlaying(true);
                    }).catch(error => {
                        console.error("Error playing audio:", error);
                    });
                };
            }
        }
    };

    const opacityClass = isWidget ? "opacity-0 group-hover:opacity-100" : "opacity-100";


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
        <div className={`group !border-transparent bg-transparent shadow-none select-none backdrop-blur-0  transition-all ease-in-out card flex flex-col justify-center gap-2 h-full ${isWidget ? 'hover:!bgOpacity hover:bgblur' : 'relative overflow-hidden !rounded-none'}`}>
            {!isWidget && (
                <div 
                    className="absolute top-10 left-0 whitespace-nowrap text-6xl font-bold text-foreground/40"
                    style={{ transform: `translateX(${titlePosition}px)` }}
                >
                    {songTitle}
                </div>
            )}
            <audio ref={audioRef} src={audioSrc} />
            <div>
                <canvas ref={canvasTopRef} width="2000" height="100" className=" w-full h-20 text-background" />
                <canvas ref={canvasBottomRef} width="2000" height="100" className="w-full h-8 text-background opacity-50" />
            </div>
            
            <div className={`flex items-center justify-between ${opacityClass} transition-all ease-in-out`}>
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
            
            <div className={`flex justify-center space-x-4 ${opacityClass} transition-all ease-in-out`}>
                <Button variant="ghost" size="icon" className='btn !rounded-full' onClick={handleSkipBackward}>
                    <SkipBack className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className='btn !rounded-full' onClick={togglePlay}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className='btn !rounded-full' onClick={handleSkipForward}>
                    <SkipForward className="h-4 w-4" />
                </Button>
            </div>
            
            <div className={`flex items-center ${opacityClass} transition-all ease-in-out`}>
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
                className={`text-sm file:bgOpacity file:!border-transparent file:transition-all file:hover:!bg-muted border-none w-full !m-0 file:text-foreground file:card ${opacityClass} transition-all ease-in-out`}
            />
        </div>
    );
};

export default MusicPlayer;