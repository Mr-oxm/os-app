import React, { useState, useRef, ChangeEvent } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
    FiUpload, FiSave, FiRotateCw, FiCrop, FiBrightness, 
    FiContrast, FiImage, FiSliders
} from 'react-icons/fi';

const PhotoEditor: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [rotation, setRotation] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
        }
    };

    const applyFilters = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx && image) {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.drawImage(img, -img.width/2, -img.height/2);
        };
        img.src = image;
        }
    };

    const saveImage = () => {
        const canvas = canvasRef.current;
        if (canvas) {
        const link = document.createElement('a');
        link.download = 'edited_image.png';
        link.href = canvas.toDataURL();
        link.click();
        }
    };

    return (
        <div className="p-4 space-y-4">
        <Card className="card">
            <h2 className="text-2xl font-bold mb-4">Photo Editor</h2>
            <div className="flex space-x-4 mb-4">
            <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md">
                <FiUpload className="lucidBarIcon" />
                <span>Upload Image</span>
                </div>
                <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                />
            </Label>
            <Button onClick={saveImage} disabled={!image}>
                <FiSave className="lucidBarIcon mr-2" />
                Save Image
            </Button>
            </div>
        </Card>

        {image && (
            <div className="space-y-4">
            <Card className="card">
                <div className="flex space-x-4">
                <div className="w-1/2">
                    <h3 className="text-lg font-semibold mb-2">Original Image</h3>
                    <img src={image} alt="Original" className="max-w-full h-auto" />
                </div>
                <div className="w-1/2">
                    <h3 className="text-lg font-semibold mb-2">Edited Image</h3>
                    <canvas ref={canvasRef} className="max-w-full h-auto" />
                </div>
                </div>
            </Card>

            <Card className="card">
                <h3 className="text-lg font-semibold mb-4">Adjustments</h3>
                <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <FiBrightness className="lucidBarIcon" />
                    <Label htmlFor="brightness">Brightness</Label>
                    <Slider
                    id="brightness"
                    min={0}
                    max={200}
                    step={1}
                    value={[brightness]}
                    onValueChange={(value) => setBrightness(value[0])}
                    className="w-64"
                    />
                    <span>{brightness}%</span>
                </div>
                <div className="flex items-center space-x-4">
                    <FiContrast className="lucidBarIcon" />
                    <Label htmlFor="contrast">Contrast</Label>
                    <Slider
                    id="contrast"
                    min={0}
                    max={200}
                    step={1}
                    value={[contrast]}
                    onValueChange={(value) => setContrast(value[0])}
                    className="w-64"
                    />
                    <span>{contrast}%</span>
                </div>
                <div className="flex items-center space-x-4">
                    <FiRotateCw className="lucidBarIcon" />
                    <Label htmlFor="rotation">Rotation</Label>
                    <Slider
                    id="rotation"
                    min={0}
                    max={360}
                    step={1}
                    value={[rotation]}
                    onValueChange={(value) => setRotation(value[0])}
                    className="w-64"
                    />
                    <span>{rotation}°</span>
                </div>
                </div>
                <Button onClick={applyFilters} className="mt-4">
                <FiSliders className="lucidBarIcon mr-2" />
                Apply Filters
                </Button>
            </Card>
            </div>
        )}
        </div>
    );
};

export default PhotoEditor;