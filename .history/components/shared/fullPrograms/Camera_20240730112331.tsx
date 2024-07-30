import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FaCamera, FaSave, FaUndo } from 'react-icons/fa';

const Camera = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [filter, setFilter] = useState('');

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    const savePhoto = () => {
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = 'captured_photo.jpg';
        link.click();
    };

    const applyFilter = (value) => {
        setFilter(`brightness(${value}%)`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                {imgSrc ? (
                    <div className="space-y-4">
                        <img 
                            src={imgSrc} 
                            alt="captured" 
                            className="w-full max-w-md rounded"
                            style={{ filter }}
                        />
                        <div className="flex justify-between">
                            <Button onClick={retake} variant="outline">
                                <FaUndo className="mr-2" /> Retake
                            </Button>
                            <Button onClick={savePhoto} variant="default">
                                <FaSave className="mr-2" /> Save
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">Brightness</p>
                            <Slider
                                defaultValue={[100]}
                                max={200}
                                step={1}
                                onValueChange={(value) => applyFilter(value[0])}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full max-w-md rounded"
                        />
                        <Button onClick={capture} className="w-full">
                            <FaCamera className="mr-2" /> Capture photo
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Camera;