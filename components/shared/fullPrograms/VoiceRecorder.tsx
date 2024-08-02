import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaSave, FaPlay, FaTrash, FaPause } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTheme } from 'next-themes';

const VoiceRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const { theme } = useTheme();
    const [themeColor, setThemeColor] = useState(theme === 'dark' ? 'white' : 'black');

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);
    const audioElement = useRef<HTMLAudioElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const playbackSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const [audioSource, setAudioSource] = useState<MediaStreamAudioSourceNode | MediaElementAudioSourceNode | null>(null);

    useEffect(() => {
        if (audioURL) { 
            audioElement.current = new Audio(audioURL);
            audioElement.current.addEventListener('ended', () => setIsPlaying(false));
            
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (!analyserRef.current) {
                analyserRef.current = audioContextRef.current.createAnalyser();
            }
            const source = audioContextRef.current.createMediaElementSource(audioElement.current);
            source.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
            setAudioSource(source);
        }
        return () => {
            if (audioElement.current) {
                audioElement.current.pause();
                audioElement.current.src = '';
            }
            disconnectPlaybackSource();
        };
    }, [audioURL]);

    const disconnectPlaybackSource = () => {
        if (playbackSourceRef.current) {
            playbackSourceRef.current.disconnect();
            playbackSourceRef.current = null;
        }
        if (analyserRef.current) {
            analyserRef.current.disconnect();
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRecording && !isPaused) {
            interval = setInterval(() => {
                setDuration((prev) => prev + 1);
            }, 1000);
        } else if (!isRecording) {
            setDuration(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording, isPaused]);

    useEffect(() => {
        if (isRecording || isPlaying || isPaused) {
            drawBars();
        } else if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        }
    }, [isRecording, isPlaying, isPaused]);

    const drawBars = () => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            if (!isPaused) {
                analyserRef.current!.getByteFrequencyData(dataArray);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = themeColor;

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };

        draw();
    };

    useEffect(() => {
        setThemeColor(theme === 'dark' ? 'white' : 'black');
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if ((isPlaying || isRecording) && audioContextRef.current && analyserRef.current) {
            drawBars();
        }
    }, [theme, isPlaying, isRecording]);


    const startRecording = async () => {
        disconnectPlaybackSource();
        audioChunks.current = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        mediaRecorder.current = new MediaRecorder(stream);

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (!analyserRef.current) {
            analyserRef.current = audioContextRef.current.createAnalyser();
        }
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        setAudioSource(source);

        analyserRef.current.fftSize = 256;

        mediaRecorder.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };

        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
        };

        mediaRecorder.current.start();
        setIsRecording(true);
        setIsPaused(false);
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setIsRecording(false);
            setIsPaused(false);

            // Disconnect and stop the microphone stream
            if (audioSource) {
                audioSource.disconnect();
                setAudioSource(null);
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        }
    };

    const pauseRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.pause();
            setIsPaused(true);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.resume();
            setIsPaused(false);
        }
    };

    const playRecording = () => {
        if (audioElement.current && audioContextRef.current && analyserRef.current) {
            // Ensure analyser is connected to destination only during playback
            analyserRef.current.connect(audioContextRef.current.destination);
            audioElement.current.play();
            setIsPlaying(true);
        }
    };

    const saveRecording = () => {
        if (audioURL) {
            const link = document.createElement('a');
            link.href = audioURL;
            link.download = 'recording.wav';
            link.click();
        }
    };

    const deleteRecording = () => {
        if (audioElement.current) {
            audioElement.current.pause();
            setIsPlaying(false);
            disconnectPlaybackSource();
        }
        setAudioURL(null);
        setDuration(0);
        audioChunks.current = [];

        // Ensure everything is disconnected and stopped
        if (audioSource) {
            audioSource.disconnect();
            setAudioSource(null);
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };

    const togglePlayPause = () => {
        if (audioElement.current) {
            if (isPlaying) {
                audioElement.current.pause();
                setIsPlaying(false);
                disconnectPlaybackSource();
            } else {
                playRecording();
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className='w-full h-full card bgOpacity bgblur flex flex-col items-center justify-around gap-4'>
                <div className="text-3xl font-bold text-center text-foreground h-1/6">
                    Voice Recorder 
                    <div className="text-5xl font-mono text-foreground">
                        {new Date(duration * 1000).toISOString().slice(14, 19)}
                    </div>
                </div>

                <canvas ref={canvasRef} width="2000" height="200" className="w-full !h-3/6" />

                <Progress value={(duration / 300) * 100} className="w-full" />

                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`btn !rounded-full ${isRecording ? '!bg-red-500 hover:!bg-red-700' : ''}`}
                        onClick={isRecording ? stopRecording : startRecording}
                    >
                        {isRecording ? <FaStop className="h-4 text-foreground" /> : <FaMicrophone className="h-4 text-foreground" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="btn !rounded-full"
                        onClick={isPaused ? resumeRecording : pauseRecording}
                        disabled={!isRecording}
                    >
                        {isPaused ? <FaPlay className="h-4 text-foreground" /> : <FaPause className="h-4 text-foreground" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="btn !rounded-full"
                        onClick={togglePlayPause}
                        disabled={!audioURL}
                    >
                        {isPlaying ? <FaPause className="h-4 text-foreground" /> : <FaPlay className="h-4 text-foreground" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="btn !rounded-full"
                        onClick={saveRecording}
                        disabled={!audioURL}
                    >
                        <FaSave className="h-4 text-foreground" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="btn !rounded-full"
                        onClick={deleteRecording}
                        disabled={!audioURL}
                    >
                        <FaTrash className="h-4 text-foreground" />
                    </Button>
                </div> 
            </div>
        </div>
    );
};

export default VoiceRecorder;