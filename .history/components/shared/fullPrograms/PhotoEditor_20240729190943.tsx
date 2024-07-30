import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    FiUpload, FiSave, FiRotateCw, FiCrop, FiImage, FiSliders, 
    FiSun, FiMoon, FiDroplet, FiEdit3, FiCommand, FiCopy, FiScissors, 
    FiZoomIn, FiZoomOut, FiMaximize, FiMinimize, FiAperture, FiEye, FiEyeOff, 
    FiFilter, FiGrid, FiType, FiMove, FiMessageSquare, FiShoppingBag, FiCloudRain,
    FiBold, FiItalic, FiUnderline, FiAlignLeft, FiAlignCenter, FiAlignRight,
    FiPenTool, FiHexagon, FiCircle, FiSquare, FiTriangle
} from 'react-icons/fi';
import { BsFillEraserFill, BsVectorPen, BsPaintBucket, BsMagic } from 'react-icons/bs';

interface Adjustments {
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
    blur: number;
    sepia: number;
    grayscale: number;
    invert: number;
}

const PhotoEditor: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
    const [adjustments, setAdjustments] = useState<Adjustments>({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
    });
    const [rotation, setRotation] = useState<number>(0);
    const [zoom, setZoom] = useState<number>(100);
    const [tool, setTool] = useState<string>('brush');
    const [brushSize, setBrushSize] = useState<number>(10);
    const [brushColor, setBrushColor] = useState<string>("#000000");
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && previewCanvasRef.current) {
            applyAdjustments();
        }
    }, [adjustments, rotation, zoom]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const img = new Image();
                img.onload = () => {
                    setOriginalImage(img);
                    initializeCanvas(img);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const initializeCanvas = (img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (canvas && previewCanvas) {
            canvas.width = img.width;
            canvas.height = img.height;
            previewCanvas.width = img.width;
            previewCanvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                addToHistory();
            }
        }
    };

    const applyAdjustments = () => {
        if (!originalImage || !previewCanvasRef.current) return;

        const canvas = previewCanvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        // Apply transformations
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.scale(zoom / 100, zoom / 100);
        ctx.translate(-canvas.width/2, -canvas.height/2);

        // Draw image
        ctx.drawImage(originalImage, 0, 0);

        // Apply filters
        ctx.filter = `
            brightness(${adjustments.brightness}%)
            contrast(${adjustments.contrast}%)
            saturate(${adjustments.saturation}%)
            hue-rotate(${adjustments.hue}deg)
            blur(${adjustments.blur}px)
            sepia(${adjustments.sepia}%)
            grayscale(${adjustments.grayscale}%)
            invert(${adjustments.invert}%)
        `;

        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
    };

    const addToHistory = () => {
        if (!canvasRef.current) return;
        const newHistoryEntry = canvasRef.current.toDataURL();
        setHistory(prevHistory => [...prevHistory.slice(0, historyIndex + 1), newHistoryEntry]);
        setHistoryIndex(prevIndex => prevIndex + 1);
    };

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(prevIndex => prevIndex - 1);
            loadHistoryState(historyIndex - 1);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(prevIndex => prevIndex + 1);
            loadHistoryState(historyIndex + 1);
        }
    };

    const loadHistoryState = (index: number) => {
        const historyState = history[index];
        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                }
            }
        };
        img.src = historyState;
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            addToHistory();
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : brushColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const addText = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (tool !== 'text' || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);
        
        ctx.font = `${brushSize}px Arial`;
        ctx.fillStyle = brushColor;
        ctx.fillText(text, x, y);
        
        addToHistory();
    };

    const saveImage = () => {
        const link = document.createElement('a');
        link.download = 'edited_image.png';
        if (previewCanvasRef.current) {
            link.href = previewCanvasRef.current.toDataURL();
        }
        link.click();
    };

    return (
        <div className="flex h-full bg-gray-900 text-white gap-2 p-2">
            <div className="w-64 bg-gray-800 overflow-y-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Tools</h2>
                <div className="grid grid-cols-3 gap-2">
                    <Button onClick={() => setTool('brush')}><FiEdit3 /></Button>
                    <Button onClick={() => setTool('eraser')}><BsFillEraserFill /></Button>
                    <Button onClick={() => setTool('text')}><FiType /></Button>
                    <Button onClick={() => setTool('move')}><FiMove /></Button>
                    <Button onClick={() => setTool('crop')}><FiCrop /></Button>
                    <Button onClick={() => setTool('pen')}><BsVectorPen /></Button>
                    <Button onClick={() => setTool('bucket')}><BsPaintBucket /></Button>
                    <Button onClick={() => setTool('magic')}><BsMagic /></Button>
                    <Button onClick={() => setTool('shape')}><FiHexagon /></Button>
                </div>
                <Input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} className="mt-4" />
                <Slider
                    value={[brushSize]}
                    onValueChange={(value) => setBrushSize(value[0])}
                    min={1}
                    max={100}
                    step={1}
                    className="mt-4"
                />
                {tool === 'text' && (
                    <Input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" className="mt-4" />
                )}
                <div className="flex gap-2 mt-4">
                    <Button onClick={undo} disabled={historyIndex <= 0}>Undo</Button>
                    <Button onClick={redo} disabled={historyIndex >= history.length - 1}>Redo</Button>
                </div>
            </div>
            <div className="flex-1 flex gap-4 flex-col items-center p-4 bg-gray-800 overflow-hidden">
                <div className="flex justify-between gap-2 w-full">
                    <Input type="file" onChange={handleImageUpload} />
                    <Button onClick={saveImage}><FiSave /> Save</Button>
                </div>
                <div className="relative" style={{height: 'calc(100% - 4rem)'}}>
                    <canvas
                        ref={canvasRef}
                        className="border-none absolute"
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        onMouseMove={draw}
                        onClick={addText}
                    />
                    <canvas
                        ref={previewCanvasRef}
                        className="border-none"
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                    />
                </div>
            </div>
            <div className="w-64 bg-gray-800 overflow-y-auto p-4">
                <Tabs defaultValue="adjust">
                    <TabsList className="w-full bg-gray-700">
                        <TabsTrigger value="adjust">Adjust</TabsTrigger>
                        <TabsTrigger value="effects">Effects</TabsTrigger>
                    </TabsList>
                    <TabsContent value="adjust">
                        <div className="flex flex-col gap-4">
                            {Object.entries(adjustments).map(([key, value]) => (
                                <div key={key}>
                                    <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                                    <Slider
                                        value={[value]}
                                        onValueChange={(newValue) => setAdjustments({...adjustments, [key]: newValue[0]})}
                                        min={0}
                                        max={key === 'hue' ? 360 : 200}
                                        step={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="effects">
                        <div className="grid grid-cols-2 gap-2">
                            <Button><FiSun /> Glow</Button>
                            <Button><FiMoon /> Shadow</Button>
                            <Button><FiDroplet /> Liquify</Button>
                            <Button><FiCloudRain /> Rain</Button>
                            <Button><FiFilter /> Vintage</Button>
                            <Button><FiAperture /> Vignette</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PhotoEditor;