import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiUpload, FiSave, FiEdit3, FiType, FiMove } from 'react-icons/fi';
import { BsFillEraserFill, BsPaintBucket } from 'react-icons/bs';

interface Layer {
    id: number;
    type: 'image' | 'text';
    content: HTMLImageElement | string;
    position: { x: number; y: number };
    adjustments: {
        brightness: number;
        contrast: number;
        saturation: number;
    };
}

const PhotoEditor: React.FC = () => {
    const [layers, setLayers] = useState<Layer[]>([]);
    const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0);
    const [tool, setTool] = useState<string>('brush');
    const [brushSize, setBrushSize] = useState<number>(10);
    const [brushColor, setBrushColor] = useState<string>("#000000");
    const [text, setText] = useState<string>('');
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && layers.length > 0) {
            renderCanvas();
        }
    }, [layers]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const img = new Image();
                img.onload = () => {
                    addLayer('image', img);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const addLayer = (type: 'image' | 'text', content: HTMLImageElement | string) => {
        const newLayer: Layer = {
            id: Date.now(),
            type,
            content,
            position: { x: 0, y: 0 },
            adjustments: {
                brightness: 100,
                contrast: 100,
                saturation: 100,
            },
        };
        setLayers(prevLayers => [...prevLayers, newLayer]);
        setActiveLayerIndex(layers.length);
    };

    const renderCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        layers.forEach((layer) => {
            ctx.save();
            ctx.translate(layer.position.x, layer.position.y);

            if (layer.type === 'image' && layer.content instanceof HTMLImageElement) {
                ctx.filter = `
                    brightness(${layer.adjustments.brightness}%)
                    contrast(${layer.adjustments.contrast}%)
                    saturate(${layer.adjustments.saturation}%)
                `;
                ctx.drawImage(layer.content, 0, 0);
            } else if (layer.type === 'text' && typeof layer.content === 'string') {
                ctx.font = '20px Arial';
                ctx.fillStyle = brushColor;
                ctx.fillText(layer.content, 0, 0);
            }

            ctx.restore();
        });
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (tool === 'text') {
            addLayer('text', text);
            setLayers(prevLayers => {
                const newLayers = [...prevLayers];
                newLayers[newLayers.length - 1].position = { x, y };
                return newLayers;
            });
        }
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
        <div className="flex h-full gap-2 p-2">
            <div className="w-64 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Tools</h2>
                <div className="grid grid-cols-3 gap-2">
                    {['brush', 'eraser', 'text', 'move', 'bucket'].map((t) => (
                        <Button 
                            key={t} 
                            onClick={() => setTool(t)}
                            className={tool === t ? 'bg-blue-500' : ''}
                        >
                            {t === 'brush' && <FiEdit3 />}
                            {t === 'eraser' && <BsFillEraserFill />}
                            {t === 'text' && <FiType />}
                            {t === 'move' && <FiMove />}
                            {t === 'bucket' && <BsPaintBucket />}
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
                <div className="mt-4">
                    <Label>Add Layer</Label>
                    <Input type="file" onChange={handleImageUpload} />
                </div>
            </div>
            <div className="flex-1 flex gap-4 flex-col items-center overflow-hidden">
                <div className="flex justify-between gap-2 w-full">
                    <Input type="file" onChange={handleImageUpload}  />
                    <Button onClick={saveImage}><FiSave /> Save</Button>
                </div>
                <canvas
                    ref={canvasRef}
                    className="border-none"
                    style={{maxWidth: '100%', maxHeight: '100%'}}
                    onClick={handleCanvasClick}
                />
            </div>
            <div className="w-64 overflow-y-auto">
                <Tabs defaultValue="adjust">
                    <TabsList className="w-full">
                        <TabsTrigger value="adjust">Adjust</TabsTrigger>
                        <TabsTrigger value="layers">Layers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="adjust">
                        <div className="flex flex-col gap-4">
                            {['brightness', 'contrast', 'saturation'].map((key) => (
                                <div key={key}>
                                    <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                                    <Slider
                                        value={[layers[activeLayerIndex]?.adjustments[key as keyof typeof layers[0]['adjustments']] || 100]}
                                        onValueChange={(newValue) => {
                                            setLayers(prevLayers => prevLayers.map((layer, i) => 
                                                i === activeLayerIndex ? {...layer, adjustments: {...layer.adjustments, [key]: newValue[0]}} : layer
                                            ));
                                        }}
                                        min={0}
                                        max={200}
                                        step={1}
                                    />
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="layers">
                        <div className="flex flex-col gap-2">
                            {layers.map((layer, index) => (
                                <div 
                                    key={layer.id} 
                                    className={`flex items-center justify-between p-2 rounded ${index === activeLayerIndex ? 'bg-blue-500' : 'bg-gray-700'}`}
                                    onClick={() => setActiveLayerIndex(index)}
                                >
                                    <span>{layer.type === 'image' ? 'Image' : 'Text'} Layer {index + 1}</span>
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