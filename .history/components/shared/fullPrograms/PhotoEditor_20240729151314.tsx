import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FiUpload, FiSave, FiRotateCw, FiCrop, FiBrightness, FiContrast, 
  FiImage, FiSliders, FiLayers, FiSun, FiMoon, FiDroplet, FiEdit3, 
  FiCommand, FiCopy, FiScissors, FiZoomIn, FiZoomOut, FiMaximize, 
  FiMinimize, FiAperture, FiEye, FiEyeOff, FiFilter, FiGrid, FiType, FiEraser
} from 'react-icons/fi';

const PhotoEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [layers, setLayers] = useState<string[]>([]);
  const [activeLayer, setActiveLayer] = useState(0);
  const [filters, setFilters] = useState({
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
  const [tool, setTool] = useState<'brush' | 'eraser' | 'text'>('brush');
  const [brushSize, setBrushSize] = useState(10);
  const [brushColor, setBrushColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d');
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, rotation, zoom]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current && ctxRef.current) {
            canvasRef.current.width = img.width;
            canvasRef.current.height = img.height;
            ctxRef.current.drawImage(img, 0, 0);
            setImage(canvasRef.current.toDataURL());
            setLayers([canvasRef.current.toDataURL()]);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilters = () => {
    if (canvasRef.current && ctxRef.current && image) {
      const img = new Image();
      img.onload = () => {
        canvasRef.current!.width = img.width;
        canvasRef.current!.height = img.height;
        ctxRef.current!.filter = `
          brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          saturate(${filters.saturation}%)
          hue-rotate(${filters.hue}deg)
          blur(${filters.blur}px)
          sepia(${filters.sepia}%)
          grayscale(${filters.grayscale}%)
          invert(${filters.invert}%)
        `;
        ctxRef.current!.translate(canvasRef.current!.width/2, canvasRef.current!.height/2);
        ctxRef.current!.rotate(rotation * Math.PI / 180);
        ctxRef.current!.scale(zoom / 100, zoom / 100);
        ctxRef.current!.drawImage(img, -img.width/2, -img.height/2);
        ctxRef.current!.setTransform(1, 0, 0, 1, 0, 0);
      };
      img.src = image;
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current?.beginPath();
    if (canvasRef.current) {
      setImage(canvasRef.current.toDataURL());
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
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
    }
  };

  const addText = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool !== 'text') return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.font = `${brushSize}px Arial`;
      ctx.fillStyle = brushColor;
      ctx.fillText(text, x, y);
      
      setImage(canvas.toDataURL());
    }
  };

  const addLayer = () => {
    setLayers([...layers, canvasRef.current!.toDataURL()]);
    setActiveLayer(layers.length);
  };

  const saveImage = () => {
    const link = document.createElement('a');
    link.download = 'edited_image.png';
    link.href = canvasRef.current!.toDataURL();
    link.click();
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-background p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Tools</h2>
        <div className="space-y-4">
          <Button onClick={() => setTool('brush')} className="w-full"><FiEdit3 /> Brush</Button>
          <Button onClick={() => setTool('eraser')} className="w-full"><FiEraser /> Eraser</Button>
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
            className="border border-gray-300"
            style={{maxWidth: '100%', maxHeight: '100%'}}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
            onClick={addText}
          />
        </div>
      </div>
      <div className="w-64 bg-background p-4 overflow-y-auto">
        <Tabs defaultValue="adjust">
          <TabsList className="w-full">
            <TabsTrigger value="adjust">Adjust</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="layers">Layers</TabsTrigger>
          </TabsList>
          <TabsContent value="adjust">
            <div className="space-y-4">
              {Object.entries(filters).map(([key, value]) => (
                <div key={key}>
                  <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Slider
                    value={[value]}
                    onValueChange={(newValue) => setFilters({...filters, [key]: newValue[0]})}
                    min={0}
                    max={key === 'hue' ? 360 : 200}
                    step={1}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="filters">
            <Select onValueChange={(value) => {
              setFilters({...filters, [value]: 100});
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grayscale">Grayscale</SelectItem>
                <SelectItem value="sepia">Sepia</SelectItem>
                <SelectItem value="invert">Invert</SelectItem>
                <SelectItem value="blur">Blur</SelectItem