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

    return (
        <div className="flex h-full bg-gray-900 text-white gap-2 p-2">
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
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onMouseMove={draw}
                    onClick={addText}
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
                                <div key={layer.id} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                                    <Button onClick={() => toggleLayerVisibility(index)}>
                                        {layer.visible ? <FiEye /> : <FiEyeOff />}
                                    </Button>
                                    <span>Layer {index + 1}</span>
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