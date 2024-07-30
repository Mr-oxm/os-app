import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FaCamera, FaSave, FaUndo, FaAdjust } from 'react-icons/fa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Filter = 'none' | 'grayscale' | 'sepia' | 'invert';

const Camera: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [filter, setFilter] = useState<Filter>('none');
    const [brightness, setBrightness] = useState<number>(100);
    const [showControls, setShowControls] = useState<boolean>(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setImgSrc(imageSrc || null);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
        setFilter('none');
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

    const applyBrightness = (value: number[]) => {
        setBrightness(value[0]);
    };

    const getFilterStyle = () => {
        let style = `brightness(${brightness}%)`;
        if (filter !== 'none') {
            style += ` ${filter}(100%)`;
        }
        return style;
    };

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
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="relative w-full max-w-4xl aspect-video">
                <div className="absolute inset-0 bgblur bgOpacity"></div>
                <div className="relative z-10 h-full flex flex-col">
                    <div className="flex-grow flex items-center justify-center">
                        {imgSrc ? (
                            <img 
                                src={imgSrc} 
                                alt="captured" 
                                className="w-full h-full object-contain"
                                style={{ filter: getFilterStyle() }}
                            />
                        ) : (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-contain"
                                videoConstraints={{ aspectRatio: 16 / 9 }}
                            />
                        )}
                    </div>
                    <div className="card mt-4 flex items-center justify-between">
                        {imgSrc ? (
                            <>
                                <Button onClick={retake} variant="ghost" size="icon">
                                    <FaUndo />
                                </Button>
                                <Button onClick={savePhoto} variant="default" size="icon">
                                    <FaSave />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => setShowControls(!showControls)} variant="ghost" size="icon">
                                    <FaAdjust />
                                </Button>
                                <Button onClick={capture} variant="default" size="icon" className="h-16 w-16 rounded-full">
                                    <FaCamera className="h-8 w-8" />
                                </Button>
                                <div className="w-10"></div> {/* Spacer for alignment */}
                            </>
                        )}
                    </div>
                    {showControls && !imgSrc && (
                        <div className="card mt-4 space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="w-24">Filter:</span>
                                <Select onValueChange={(value: Filter) => applyFilter(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a filter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        <SelectItem value="grayscale">Grayscale</SelectItem>
                                        <SelectItem value="sepia">Sepia</SelectItem>
                                        <SelectItem value="invert">Invert</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="w-24">Brightness:</span>
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
                </div>
            </div>
        </div>
    );
};

export default Camera;