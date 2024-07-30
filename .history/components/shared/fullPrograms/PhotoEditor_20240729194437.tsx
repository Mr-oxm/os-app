import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
    FiUpload, FiSave, FiRotateCw, FiCrop, FiEdit3, FiType, FiMove,
    FiSun, FiMoon, FiDroplet, FiCloudRain, FiFilter, FiAperture, FiLayers,
    FiEyeOff,
    FiEye
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

interface Layer {
    id: number;
    image: HTMLImageElement;
    adjustments: Adjustments;
    visible: boolean;
}

type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion';

const PhotoEditor: React.FC = () => {
    const [layers, setLayers] = useState<Layer[]>([]);
    const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
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
    const [history, setHistory] = useState<ImageData[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [blendMode, setBlendMode] = useState<BlendMode>('normal');

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);
    const [layerPositions, setLayerPositions] = useState<{ x: number; y: number }[]>([]);
    const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);
    const [shapeStart, setShapeStart] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        if (canvasRef.current && layers.length > 0) {
            requestAnimationFrame(renderCanvas);
        }
    }, [layers, adjustments, rotation, zoom, blendMode]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const img = new Image();
                img.onload = () => {
                    addLayer(img);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const addLayer = (img: HTMLImageElement) => {
        const newLayer: Layer = {
            id: Date.now(),
            image: img,
            adjustments: {...adjustments},
            visible: true,
        };
        setLayers(prevLayers => [...prevLayers, newLayer]);
        setActiveLayerIndex(layers.length);
        initializeCanvas(img);
    };

    const initializeCanvas = (img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = img.width;
            canvas.height = img.height;
            renderCanvas();
            addToHistory();
        }
    };

    const renderCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        layers.forEach((layer, index) => {
            if (!layer.visible) return;

            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.scale(zoom / 100, zoom / 100);
            ctx.translate(-canvas.width/2, -canvas.height/2);

            ctx.globalCompositeOperation = index === 0 ? 'source-over' : blendMode;

            ctx.filter = `
                brightness(${layer.adjustments.brightness}%)
                contrast(${layer.adjustments.contrast}%)
                saturate(${layer.adjustments.saturation}%)
                hue-rotate(${layer.adjustments.hue}deg)
                blur(${layer.adjustments.blur}px)
                sepia(${layer.adjustments.sepia}%)
                grayscale(${layer.adjustments.grayscale}%)
                invert(${layer.adjustments.invert}%)
            `;

            ctx.drawImage(layer.image, 0, 0);
            ctx.restore();
        });
        if (selectedLayerIndex !== null) {
            const layer = layers[selectedLayerIndex];
            const position = layerPositions[selectedLayerIndex] || { x: 0, y: 0 };
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.strokeRect(position.x, position.y, layer.image.width, layer.image.height);
            
            // Draw resize handles
            const handleSize = 10;
            ctx.fillStyle = 'blue';
            ctx.fillRect(position.x - handleSize / 2, position.y - handleSize / 2, handleSize, handleSize);
            ctx.fillRect(position.x + layer.image.width - handleSize / 2, position.y - handleSize / 2, handleSize, handleSize);
            ctx.fillRect(position.x - handleSize / 2, position.y + layer.image.height - handleSize / 2, handleSize, handleSize);
            ctx.fillRect(position.x + layer.image.width - handleSize / 2, position.y + layer.image.height - handleSize / 2, handleSize, handleSize);
        }
    };

    const addToHistory = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        setHistory(prevHistory => [...prevHistory.slice(0, historyIndex + 1), imageData]);
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
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const imageData = history[index];
        ctx.putImageData(imageData, 0, 0);
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
        if (canvasRef.current) {
            link.href = canvasRef.current.toDataURL();
        }
        link.click();
    };

    const applyEffect = (effect: string) => {
        // Implement effect logic here
    };

    const toggleLayerVisibility = (index: number) => {
        setLayers(prevLayers => prevLayers.map((layer, i) => 
            i === index ? {...layer, visible: !layer.visible} : layer
        ));
    };

    const moveLayer = (fromIndex: number, toIndex: number) => {
        setLayers(prevLayers => {
            const newLayers = [...prevLayers];
            const [removed] = newLayers.splice(fromIndex, 1);
            newLayers.splice(toIndex, 0, removed);
            return newLayers;
        });
    };

    const getPixelColor = (imageData: ImageData, x: number, y: number) => {
        const index = (y * imageData.width + x) * 4;
        return {
            r: imageData.data[index],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3]
        };
    };
    
    const setPixelColor = (imageData: ImageData, x: number, y: number, color: { r: number, g: number, b: number, a: number }) => {
        const index = (y * imageData.width + x) * 4;
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = color.a;
    };
    
    const colorMatch = (color1: { r: number, g: number, b: number, a: number }, color2: { r: number, g: number, b: number, a: number }) => {
        return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
    };
    
    const floodFill = (imageData: ImageData, x: number, y: number, targetColor: { r: number, g: number, b: number, a: number }, fillColor: { r: number, g: number, b: number, a: number }) => {
        const stack = [{x, y}];
        const width = imageData.width;
        const height = imageData.height;
    
        while (stack.length > 0) {
            const pixel = stack.pop()!;
            if (pixel.x < 0 || pixel.x >= width || pixel.y < 0 || pixel.y >= height) continue;
    
            const currentColor = getPixelColor(imageData, pixel.x, pixel.y);
            if (!colorMatch(currentColor, targetColor)) continue;
    
            setPixelColor(imageData, pixel.x, pixel.y, fillColor);
    
            stack.push({x: pixel.x + 1, y: pixel.y});
            stack.push({x: pixel.x - 1, y: pixel.y});
            stack.push({x: pixel.x, y: pixel.y + 1});
            stack.push({x: pixel.x, y: pixel.y - 1});
        }
    };
    
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: 255
        } : {r: 0, g: 0, b: 0, a: 255};
    };

    const handleToolAction = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
        switch (tool) {
            case 'brush':
            case 'eraser':
                if (isDrawing) {
                    ctx.beginPath();
                    ctx.moveTo(lastPosition?.x ?? x, lastPosition?.y ?? y);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : brushColor;
                    ctx.lineWidth = brushSize;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }
                setLastPosition({ x, y });
                break;
    
            case 'text':
                ctx.font = `${brushSize}px Arial`;
                ctx.fillStyle = brushColor;
                ctx.fillText(text, x, y);
                addToHistory();
                break;
    
            case 'bucket':
                // Simplified flood fill algorithm
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const targetColor = getPixelColor(imageData, Math.floor(x), Math.floor(y));
                floodFill(imageData, Math.floor(x), Math.floor(y), targetColor, hexToRgb(brushColor));
                ctx.putImageData(imageData, 0, 0);
                addToHistory();
                break;
    
            case 'pen':
                if (isDrawing) {
                    ctx.beginPath();
                    ctx.moveTo(lastPosition?.x ?? x, lastPosition?.y ?? y);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = brushColor;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
                setLastPosition({ x, y });
                break;
    
            case 'shape':
                if (!isDrawing) {
                    setShapeStart({ x, y });
                } else if (shapeStart) {
                    ctx.beginPath();
                    ctx.rect(shapeStart.x, shapeStart.y, x - shapeStart.x, y - shapeStart.y);
                    ctx.strokeStyle = brushColor;
                    ctx.lineWidth = brushSize;
                    ctx.stroke();
                    setShapeStart(null);
                    addToHistory();
                }
                break;
    
            case 'move':
                if (selectedLayerIndex !== null) {
                    const newPositions = [...layerPositions];
                    newPositions[selectedLayerIndex] = {
                        x: x - canvas.width / 2,
                        y: y - canvas.height / 2
                    };
                    setLayerPositions(newPositions);
                }
                break;
    
            case 'crop':
                // Implement crop logic here
                break;
    
            case 'magic':
                // Implement magic wand selection tool here
                break;
    
            default:
                console.log('Tool not implemented');
        }
    };

    return (
        <div className="flex h-full bgOp gap-2 p-2">
            <div className="w-64 bg-gray-800 overflow-y-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Tools</h2>
                <div className="grid grid-cols-3 gap-2">
                    {['brush', 'eraser', 'text', 'move', 'crop', 'pen', 'bucket', 'magic', 'shape'].map((t) => (
                        <Button 
                            key={t} 
                            onClick={() => setTool(t)}
                            className={tool === t ? 'bg-blue-500' : ''}
                        >
                            {t === 'brush' && <FiEdit3 />}
                            {t === 'eraser' && <BsFillEraserFill />}
                            {t === 'text' && <FiType />}
                            {t === 'move' && <FiMove />}
                            {t === 'crop' && <FiCrop />}
                            {t === 'pen' && <BsVectorPen />}
                            {t === 'bucket' && <BsPaintBucket />}
                            {t === 'magic' && <BsMagic />}
                            {t === 'shape' && '⬡'}
                        </Button>
                    ))}
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
                <div className="mt-4">
                    <Label>Blend Mode</Label>
                    <Select onValueChange={(value: BlendMode) => setBlendMode(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select blend mode" />
                        </SelectTrigger>
                        <SelectContent>
                            {['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion'].map((mode) => (
                                <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-4">
                    <Label>Add Layer</Label>
                    <Input type="file" onChange={handleImageUpload} />
                </div>
            </div>
            <div className="flex-1 flex gap-4 flex-col items-center p-4 bg-gray-800 overflow-hidden">
                <div className="flex justify-between gap-2 w-full">
                    <Input type="file" onChange={handleImageUpload} />
                    <Button onClick={saveImage}><FiSave /> Save</Button>
                </div>
                <canvas
                    ref={canvasRef}
                    className="border-none"
                    style={{maxWidth: '100%', maxHeight: '100%'}}
                    onMouseDown={(e) => {
                        setIsDrawing(true);
                        handleToolAction(e);
                    }}
                    onMouseUp={() => {
                        setIsDrawing(false);
                        setLastPosition(null);
                        addToHistory();
                    }}
                    onMouseOut={() => {
                        setIsDrawing(false);
                        setLastPosition(null);
                    }}
                    onMouseMove={handleToolAction}
                />
            </div>
            <div className="w-64 bg-gray-800 overflow-y-auto p-4">
                <Tabs defaultValue="adjust">
                    <TabsList className="w-full bg-gray-700">
                        <TabsTrigger value="adjust">Adjust</TabsTrigger>
                        <TabsTrigger value="effects">Effects</TabsTrigger>
                        <TabsTrigger value="layers">Layers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="adjust">
                        <div className="flex flex-col gap-4">
                            {Object.entries(adjustments).map(([key, value]) => (
                                <div key={key}>
                                    <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                                    <Slider
                                        value={[value]}
                                        onValueChange={(newValue) => {
                                            setAdjustments(prev => ({...prev, [key]: newValue[0]}));
                                            setLayers(prevLayers => prevLayers.map((layer, i) => 
                                                i === activeLayerIndex ? {...layer, adjustments: {...layer.adjustments, [key]: newValue[0]}} : layer
                                            ));
                                        }}
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
                            <Button onClick={() => applyEffect('glow')}><FiSun /> Glow</Button>
                            <Button onClick={() => applyEffect('shadow')}><FiMoon /> Shadow</Button>
                            <Button onClick={() => applyEffect('liquify')}><FiDroplet /> Liquify</Button>
                            <Button onClick={() => applyEffect('rain')}><FiCloudRain /> Rain</Button>
                            <Button onClick={() => applyEffect('vintage')}><FiFilter /> Vintage</Button>
                            <Button onClick={() => applyEffect('vignette')}><FiAperture /> Vignette</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="layers">
                        <div className="flex flex-col gap-2">
                            {layers.map((layer, index) => (
                                <div 
                                    key={layer.id} 
                                    className={`flex items-center justify-between bg-gray-700 p-2 rounded ${index === activeLayerIndex ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => setActiveLayerIndex(index)}
                                >
                                    <Button onClick={() => toggleLayerVisibility(index)}>
                                        {layer.visible ? <FiEye /> : <FiEyeOff />}
                                    </Button>
                                    <span>Layer {index + 1}</span>
                                    <img 
                                        src={layer.image.src} 
                                        alt={`Layer ${index + 1} preview`} 
                                        className="w-10 h-10 object-cover"
                                    />
                                    <div>
                                        <Button onClick={() => moveLayer(index, Math.max(0, index - 1))} disabled={index === 0}>↑</Button>
                                        <Button onClick={() => moveLayer(index, Math.min(layers.length - 1, index + 1))} disabled={index === layers.length - 1}>↓</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
</TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PhotoEditor;