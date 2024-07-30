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
  FiMinimize, FiAperture, FiEye, FiEyeOff, FiFilter, FiGrid
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
    sharpen: 0,
  });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [cropMode, setCropMode] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [brushColor, setBrushColor] = useState("#000000");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current && ctx.current) {
            canvasRef.current.width = img.width;
            canvasRef.current.height = img.height;
            ctx.current.drawImage(img, 0, 0);
            setImage(canvasRef.current.toDataURL());
            setLayers([canvasRef.current.toDataURL()]);
            addToHistory(canvasRef.current.toDataURL());
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const addToHistory = (imageData: string) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), imageData]);
    setHistoryIndex(prev => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const prevState = history[historyIndex - 1];
      setImage(prevState);
      applyImageToCanvas(prevState);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      const nextState = history[historyIndex + 1];
      setImage(nextState);
      applyImageToCanvas(nextState);
    }
  };

  const applyImageToCanvas = (imageData: string) => {
    const img = new Image();
    img.onload = () => {
      if (canvasRef.current && ctx.current) {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
        ctx.current.drawImage(img, 0, 0);
      }
    };
    img.src = imageData;
  };

  const applyFilters = () => {
    if (canvasRef.current && ctx.current && image) {
      const img = new Image();
      img.onload = () => {
        canvasRef.current!.width = img.width;
        canvasRef.current!.height = img.height;
        ctx.current!.filter = `
          brightness(${filters.brightness}%)
          contrast(${filters.contrast}%)
          saturate(${filters.saturation}%)
          hue-rotate(${filters.hue}deg)
          blur(${filters.blur}px)
        `;
        ctx.current!.translate(canvasRef.current!.width/2, canvasRef.current!.height/2);
        ctx.current!.rotate(rotation * Math.PI / 180);
        ctx.current!.drawImage(img, -img.width/2, -img.height/2);
        ctx.current!.setTransform(1, 0, 0, 1, 0, 0);
        setImage(canvasRef.current!.toDataURL());
        addToHistory(canvasRef.current!.toDataURL());
      };
      img.src = image;
    }
  };

  const handleBrush = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (ctx.current) {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.current.beginPath();
      ctx.current.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
      ctx.current.fillStyle = brushColor;
      ctx.current.fill();
      setImage(canvasRef.current!.toDataURL());
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
          <Button onClick={() => {}} className="w-full"><FiCrop /> Crop</Button>
          <Button onClick={() => {}} className="w-full"><FiEdit3 /> Brush</Button>
          <Button onClick={() => {}} className="w-full"><FiCommand /> Select</Button>
          <Button onClick={() => {}} className="w-full"><FiCopy /> Clone</Button>
          <Button onClick={() => {}} className="w-full"><FiScissors /> Cut</Button>
          <Button onClick={undo} className="w-full"><FiRotateCw /> Undo</Button>
          <Button onClick={redo} className="w-full"><FiRotateCw className="transform rotate-180" /> Redo</Button>
          <Input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
          <Slider
            value={[brushSize]}
            onValueChange={(value) => setBrushSize(value[0])}
            min={1}
            max={100}
            step={1}
          />
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
            onMouseMove={handleBrush}
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
              <Button onClick={applyFilters}>Apply Adjustments</Button>
            </div>
          </TabsContent>
          <TabsContent value="filters">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose a filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grayscale">Grayscale</SelectItem>
                <SelectItem value="sepia">Sepia</SelectItem>
                <SelectItem value="invert">Invert</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>
          <TabsContent value="layers">
            <Button onClick={addLayer}>Add Layer</Button>
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