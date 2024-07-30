import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    FiUpload, FiSave, FiRotateCw, FiCrop, FiImage, FiSliders, FiLayers, 
    FiSun, FiMoon, FiDroplet, FiEdit3, FiCommand, FiCopy, FiScissors, 
    FiZoomIn, FiZoomOut, FiMaximize, FiMinimize, FiAperture, FiEye, FiEyeOff, 
    FiFilter, FiGrid, FiType
} from 'react-icons/fi';
import { BsFillEraserFill } from 'react-icons/bs';

const PhotoEditor = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [layers, setLayers] = useState([]);
    const [activeLayer, setActiveLayer] = useState(0);
    const [adjustments, setAdjustments] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        blur: 0,
        sepia: 0,
        grayscale: 0,
        invert: 0,
    });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [tool, setTool] = useState('brush');
    const [brushSize, setBrushSize] = useState(10);
    const [brushColor, setBrushColor] = useState("#000000");
    const [isDrawing, setIsDrawing] = useState(false);
    const [text, setText] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const canvasRef = useRef(null);
    const previewCanvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current && previewCanvasRef.current) {
            applyAdjustments();
        }
    }, [adjustments, rotation, zoom, layers]);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setOriginalImage(img);
                    initializeCanvas(img);
                    addLayer(img);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const initializeCanvas = (img) => {
        const canvas = canvasRef.current;
        const previewCanvas = previewCanvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        previewCanvas.width = img.width;
        previewCanvas.height = img.height;
    };

    const applyAdjustments = () => {
        if (!originalImage) return;

        const canvas = previewCanvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        // Apply transformations
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.scale(zoom / 100, zoom / 100);
        ctx.translate(-canvas.width/2, -canvas.height/2);

        // Draw layers
        layers.forEach(layer => {
            ctx.drawImage(layer, 0, 0);
        });

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

    const addLayer = (image = null) => {
        const newLayer = document.createElement('canvas');
        newLayer.width = canvasRef.current.width;
        newLayer.height = canvasRef.current.height;
        const ctx = newLayer.getContext('2d');
        
        if (image) {
            ctx.drawImage(image, 0, 0);
        }

        setLayers(prevLayers => [...prevLayers, newLayer]);
        setActiveLayer(layers.length);
        addToHistory();
    };

    const addToHistory = () => {
        const newHistoryEntry = layers.map(layer => layer.toDataURL());
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

    const loadHistoryState = (index) => {
        const historyState = history[index];
        const newLayers = historyState.map(dataUrl => {
            const img = new Image();
            img.src = dataUrl;
            return img;
        });
        setLayers(newLayers);
    };

    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        addToHistory();
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : brushColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        // Update the active layer
        const layerCtx = layers[activeLayer].getContext('2d');
        layerCtx.drawImage(canvas, 0, 0);
    };

    const addText = (e) => {
        if (tool !== 'text') return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.font = `${brushSize}px Arial`;
        ctx.fillStyle = brushColor;
        ctx.fillText(text, x, y);
        
        // Update the active layer
        const layerCtx = layers[activeLayer].getContext('2d');
        layerCtx.drawImage(canvas, 0, 0);
        addToHistory();
    };

    const saveImage = () => {
        const link = document.createElement('a');
        link.download = 'edited_image.png';
        link.href = previewCanvasRef.current.toDataURL();
        link.click();
    };

    return (
        <div className="flex h-full bg-background/80 gap-2">
            <div className="w-64 bg-foreground/20 card overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Tools</h2>
                <div className="space-y-4">
                    <Button onClick={() => setTool('brush')} className="w-full"><FiEdit3 /> Brush</Button>
                    <Button onClick={() => setTool('eraser')} className="w-full"><BsFillEraserFill /> Eraser</Button>
                    <Button onClick={() => setTool('text')} className="w-full"><FiType /> Text</Button>
                    <Input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
                    <Slider
                        value={[brushSize]}
                        onValueChange={(value) => setBrushSize(value[0])}
                        min={1}
                        max={100}
                        step={1}
                    />
                    {tool === 'text' && (
                        <Input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
                    )}
                    <Button onClick={undo} disabled={historyIndex <= 0}>Undo</Button>
                    <Button onClick={redo} disabled={historyIndex >= history.length - 1}>Redo</Button>
                </div>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
                <div className="mb-4 flex justify-between">
                    <Input type="file" onChange={handleImageUpload} />
                    <Button onClick={saveImage}><FiSave /> Save</Button>
                </div>
                <div className="relative" style={{height: 'calc(100% - 4rem)'}}>
                    <canvas
                        ref={canvasRef}
                        className="border border-gray-300 absolute top-0 left-0"
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseOut={stopDrawing}
                        onMouseMove={draw}
                        onClick={addText}
                    />
                    <canvas
                        ref={previewCanvasRef}
                        className="border border-gray-300 absolute top-0 left-0"
                        style={{maxWidth: '100%', maxHeight: '100%'}}
                    />
                </div>
            </div>
            <div className="w-64 bg-foreground/20 card  overflow-y-auto">
                <Tabs defaultValue="adjust">
                    <TabsList className="w-full">
                        <TabsTrigger value="adjust">Adjust</TabsTrigger>
                        <TabsTrigger value="layers">Layers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="adjust">
                        <div className="space-y-4">
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
                    <TabsContent value="layers">
                        <Button onClick={() => addLayer()}>Add Layer</Button>
                        {layers.map((layer, index) => (
                            <div key={index} className="flex items-center">
                                <Button onClick={() => setActiveLayer(index)}>Layer {index + 1}</Button>
                                <FiEye />
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PhotoEditor;