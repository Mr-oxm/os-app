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
    FiEyeOff, FiEye
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

interface BaseLayer {
    id: number;
    type: 'image' | 'text';
    position: { x: number; y: number };
    size: { width: number; height: number };
    adjustments: Adjustments;
    visible: boolean;
}

interface ImageLayer extends BaseLayer {
    type: 'image';
    image: HTMLImageElement;
}

interface TextLayer extends BaseLayer {
    type: 'text';
    content: string;
    font: string;
    fontSize: number;
    color: string;
}

type Layer = ImageLayer | TextLayer;

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
    const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);
    const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);
    const [shapeStart, setShapeStart] = useState<{ x: number; y: number } | null>(null);

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
                    addImageLayer(img);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const addImageLayer = (img: HTMLImageElement) => {
        const newLayer: ImageLayer = {
            id: Date.now(),
            type: 'image',
            image: img,
            position: { x: 0, y: 0 },
            size: { width: img.width, height: img.height },
            adjustments: {...adjustments},
            visible: true,
        };
        setLayers(prevLayers => [...prevLayers, newLayer]);
        setActiveLayerIndex(layers.length);
        initializeCanvas(img);
    };

    const addTextLayer = (content: string, x: number, y: number) => {
        const newLayer: TextLayer = {
            id: Date.now(),
            type: 'text',
            content,
            position: { x, y },
            size: { width: 100, height: 30 }, // Estimate initial size
            font: 'Arial',
            fontSize: brushSize,
            color: brushColor,
            adjustments: {...adjustments},
            visible: true,
        };
        setLayers(prevLayers => [...prevLayers, newLayer]);
        setActiveLayerIndex(layers.length);
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
            ctx.translate(layer.position.x, layer.position.y);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.scale(zoom / 100, zoom / 100);

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

            if (layer.type === 'image') {
                ctx.drawImage(layer.image, 0, 0, layer.size.width, layer.size.height);
            } else if (layer.type === 'text') {
                ctx.font = `${layer.fontSize}px ${layer.font}`;
                ctx.fillStyle = layer.color;
                ctx.fillText(layer.content, 0, layer.fontSize);
            }

            ctx.restore();

            if (index === selectedLayerIndex) {
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 2;
                ctx.strokeRect(layer.position.x, layer.position.y, layer.size.width, layer.size.height);
            }
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

    const handleToolAction = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        switch (tool) {
            case 'brush':
            case 'eraser':
                handleBrush(x, y);
                break;
            case 'text':
                if (!isDrawing) {
                    addTextLayer(text, x, y);
                    renderCanvas();
                    addToHistory();
                }
                break;
            case 'move':
                handleMove(x, y);
                break;
            case 'crop':
                // Implement crop logic
                break;
            case 'shape':
                handleShape(x, y);
                break;
            default:
                console.log('Tool not implemented');
        }
    };

    const handleBrush = (x: number, y: number) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx || !isDrawing) return;

        ctx.beginPath();
        ctx.moveTo(lastPosition?.x ?? x, lastPosition?.y ?? y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.stroke();

        setLastPosition({ x, y });
    };

    const handleMove = (x: number, y: number) => {
        if (selectedLayerIndex !== null && isDrawing) {
            setLayers(prevLayers => prevLayers.map((layer, index) => 
                index === selectedLayerIndex
                    ? { ...layer, position: { x: x - layer.size.width / 2, y: y - layer.size.height / 2 } }
                    : layer
            ));
        }
    };

    const handleShape = (x: number, y: number) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

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
    };

    const applyEffect = (effect: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        switch (effect) {
            case 'glow':
                ctx.shadowBlur = 20;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
                break;
            case 'shadow':
                ctx.shadowBlur = 20;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
                break;
            case 'vintage':
                ctx.filter = 'sepia(50%) contrast(150%) saturate(80%)';
                break;
            case 'vignette':
                const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(1, 'rgba(0,0,0,0.5)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                break;
            default:
                console.log('Effect not implemented');
        }

        renderCanvas();
        addToHistory();

        // Reset effects
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
        ctx.filter = 'none';
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

    const saveImage = () => {
        const link = document.createElement('a');
        link.download = 'edited_image.png';
        if (canvasRef.current) {
            link.href = canvasRef.current.toDataURL();
        }
        link.click();
    };

    return (
        <div className="flex h-full bgOpacity gap-2 p-2">
            <div className="w-64 bgOpacity card overflow-y-auto card ">
                <h2 className="text-2xl font-bold mb-4">Tools</h2>
                <div className="grid grid-cols-3 gap-2">
                    {['brush', 'eraser', 'text', 'move', 'crop', 'shape'].map((t) => (
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
            <div className="flex-1 flex gap-4 flex-col items-center bgOpacity card overflow-hidden">
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
            <div className="w-64 bgOpacity card overflow-y-auto">
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
                                    <span>{layer.type === 'image' ? `Image ${index + 1}` : `Text ${index + 1}`}</span>
                                    {layer.type === 'image' && (
                                        <img 
                                            src={layer.image.src} 
                                            alt={`Layer ${index + 1} preview`} 
                                            className="w-10 h-10 object-cover"
                                        />
                                    )}
                                    {layer.type === 'text' && (
                                        <span className="w-10 h-10 flex items-center justify-center">{layer.content.substring(0, 2)}</span>
                                    )}
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