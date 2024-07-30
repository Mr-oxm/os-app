import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FaCamera, FaSave, FaUndo, FaAdjust, FaVideo, FaStopCircle } from 'react-icons/fa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Filter = 'none' | 'grayscale' | 'sepia' | 'invert' | 'blur' | 'contrast' | 'hue-rotate';
type Effect = 'none' | 'mirror' | 'rotate90' | 'rotate270';

const Camera: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [filter, setFilter] = useState<Filter>('none');
    const [effect, setEffect] = useState<Effect>('none');
    const [brightness, setBrightness] = useState<number>(100);
    const [showControls, setShowControls] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setImgSrc(imageSrc || null);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
        setFilter('none');
        setEffect('none');
        setBrightness(100);
    };

    const savePhoto = () => {
        if (imgSrc) {
            const link = document.createElement('a');
            link.href = imgSrc;
            link.download = 'captured_photo.jpg';
            link.click();
        }
    };

    const applyFilter = (value: Filter) => {
        setFilter(value);
    };

    const applyEffect = (value: Effect) => {
        setEffect(value);
    };

    const applyBrightness = (value: number[]) => {
        setBrightness(value[0]);
    };

    const getFilterStyle = () => {
        let style = `brightness(${brightness}%)`;
        if (filter !== 'none') {
            switch (filter) {
                case 'blur': style += ` blur(5px)`; break;
                case 'contrast': style += ` contrast(200%)`; break;
                case 'hue-rotate': style += ` hue-rotate(90deg)`; break;
                default: style += ` ${filter}(100%)`;
            }
        }
        return style;
    };

    const getEffectStyle = () => {
        switch (effect) {
            case 'mirror': return 'scale(-1, 1)';
            case 'rotate90': return 'rotate(90deg)';
            case 'rotate270': return 'rotate(270deg)';
            default: return '';
        }
    };

    const handleDataAvailable = useCallback(
        ({ data }: BlobEvent) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const startRecording = useCallback(() => {
        setIsRecording(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current!.stream as MediaStream, {
            mimeType: 'video/webm'
        });
        mediaRecorderRef.current.addEventListener(
            'dataavailable',
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setIsRecording, mediaRecorderRef, handleDataAvailable]);

    const stopRecording = useCallback(() => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    }, [mediaRecorderRef, setIsRecording]);

    const saveVideo = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = 'recorded_video.webm';
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                capture();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [capture]);

    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0">
                {imgSrc ? (
                    <img 
                        src={imgSrc} 
                        alt="captured" 
                        className="w-full h-full object-cover"
                        style={{ filter: getFilterStyle(), transform: getEffectStyle() }}
                    />
                ) : (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className=" h-full m-auto"
                        videoConstraints={{ aspectRatio: 16 / 9 }}
                        style={{ filter: getFilterStyle(), transform: getEffectStyle() }}
                    />
                )}
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                {imgSrc ? (
                    <>
                        <Button onClick={retake} variant="secondary" size="icon" className="rounded-full">
                            <FaUndo />
                        </Button>
                        <Button onClick={savePhoto} variant="secondary" size="icon" className="rounded-full">
                            <FaSave />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setShowControls(!showControls)} variant="secondary" size="icon" className="!rounded-full btn">
                            <FaAdjust />
                        </Button>
                        <Button onClick={capture} variant="secondary" size="icon" className="h-16 w-16 !rounded-full btn">
                            <FaCamera className="h-8 w-8" />
                        </Button>
                        {isRecording ? (
                            <Button onClick={stopRecording} variant="destructive" size="icon" className="rounded-full">
                                <FaStopCircle />
                            </Button>
                        ) : (
                            <Button onClick={startRecording} variant="secondary" size="icon" className="!rounded-full btn">
                                <FaVideo />
                            </Button>
                        )}
                    </>
                )}
            </div>
            {showControls && !imgSrc && (
                <div className="absolute top-4 left-4 right-4 card bgOpacity bgblur space-y-4">
                    <div className="flex items-center ">
                        <span className="w-24">Filter</span>
                        <Select onValueChange={(value: Filter) => applyFilter(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a filter" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="grayscale">Grayscale</SelectItem>
                                <SelectItem value="sepia">Sepia</SelectItem>
                                <SelectItem value="invert">Invert</SelectItem>
                                <SelectItem value="blur">Blur</SelectItem>
                                <SelectItem value="contrast">High Contrast</SelectItem>
                                <SelectItem value="hue-rotate">Hue Rotate</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center ">
                        <span className="w-24">Effect</span>
                        <Select onValueChange={(value: Effect) => applyEffect(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose an effect" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="mirror">Mirror</SelectItem>
                                <SelectItem value="rotate90">Rotate 90°</SelectItem>
                                <SelectItem value="rotate270">Rotate 270°</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center ">
                        <span className="w-24">Brightness</span>
                        <Slider
                            defaultValue={[100]}
                            max={200}
                            step={1}
                            onValueChange={applyBrightness}
                            className="flex-grow"
                        />
                    </div>
                </div>
            )}
            {recordedChunks.length > 0 && (
                <div className="absolute top-4 right-4">
                    <Button onClick={saveVideo} variant="secondary" className='btn-normal'>
                        Save Video
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Camera;