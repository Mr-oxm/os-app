"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import useAppStore from '@/lib/Store/useAppStore';
import { Button } from '@/components/ui/button';
import useOSMemoryStore from '@/lib/Store/useOSMemoryStore';

interface ButtonProps {
    handleExit: () => void;
    handleMaximize: () => void;
    handleMinimize: () => void;
    windowDir: number;
    windowType: number;
}

const MacWindow = ({
    children,
    programId,
    minimized,
}: Readonly<{
    children: React.ReactNode;
    programId: string;
    minimized: boolean;
}>) => {
    const [isMaximized, setIsMaximized] = useState(true);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [lastPosition, setLastPosition] = useState({ top: 0, left: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [lastSize, setLastSize] = useState({ width: '100%', height: '100%' });
    const [size, setSize] = useState({ width: '100%', height: '100%' });
    const [resizeDirection, setResizeDirection] = useState('');
    const { windowType, windowDir } = useAppStore();
    const { closeProgram, minimizeProgram, active, setActive } = useOSMemoryStore();

    const handleExit = () => {
        closeProgram(programId);
    };

    const handleMinimize = () => {
        minimizeProgram(programId);
    };

    const handleMaximize = useCallback(() => {
        if (isMaximized) {
            setIsMaximized(false);
            setPosition(lastPosition);
            setL(lastSize)
            setSize({ width: '50%', height: '50%' });
        } else {
            setIsMaximized(true);
            setLastPosition(position);
            setPosition({ top: 0, left: 0 });
            setSize({ width: '100%', height: '100%' });
            setIsDragging(false);
        }
    }, [isMaximized, lastPosition, position]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging && !isMaximized) {
            const newLeft = e.clientX - offset.x;
            const newTop = e.clientY - offset.y;
    
            // Ensure the window stays partially visible
            const minVisible = 50; // Minimum pixels visible
            const maxLeft = window.innerWidth - minVisible;
            const maxTop = window.innerHeight - minVisible;
    
            setPosition({
                top: Math.max(0, Math.min(newTop, maxTop)),
                left: Math.max(0, Math.min(newLeft, maxLeft)),
            });
        } else if (isResizing && !isMaximized) {
            const newSize = { ...size };
            const newPosition = { ...position };
            const rect = document.getElementById(`window-${programId}`)!.getBoundingClientRect();
            const minWidth = 200; // Minimum width of the window
            const minHeight = 100; // Minimum height of the window
    
            switch (resizeDirection) { 
                case 's':
                    newSize.height = Math.max(minHeight, e.clientY - rect.top)+"";
                    break;
                case 'w':
                    newSize.width = Math.max(minWidth, rect.right - e.clientX)+"";
                    newPosition.left = Math.min(rect.right - minWidth, e.clientX);
                    break;
                case 'e':
                    newSize.width = Math.max(minWidth, e.clientX - rect.left)+"";
                    break;
                case 'sw':
                    newSize.width = Math.max(minWidth, rect.right - e.clientX)+"";
                    newSize.height = Math.max(minHeight, e.clientY - rect.top)+"";
                    newPosition.left = Math.min(rect.right - minWidth, e.clientX);
                    break;
                case 'se':
                    newSize.width = Math.max(minWidth, e.clientX - rect.left)+"";
                    newSize.height = Math.max(minHeight, e.clientY - rect.top)+"";
                    break;
            }
    
            setSize({
                width: `${newSize.width}px`,
                height: `${newSize.height}px`,
            });
            setPosition(newPosition);
        }
    }, [isDragging, isResizing, offset, isMaximized, position, size, resizeDirection, programId]);

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    const handleResizeStart = (direction: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isMaximized) {
            setIsResizing(true);
            setResizeDirection(direction);
        }
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, handleMouseMove]);

    const ButtonComponent = windowType === 0 ? MacButtons : WindowsButtons;

    return (
        <div
            id={`window-${programId}`}
            className={`card ${windowType == 1 ? "!rounded-none" : ""} ${minimized ? "hidden" : "flex"} flex-col !p-0 bgblur overflow-hidden bgOpacity absolute ${isMaximized ? 'w-full h-full' : ''} ${(active === programId) && "z-20"} p-4 ${isDragging || isResizing ? "" : "transition-all duration-200"} ease-in-out`}
            style={{ top: position.top, left: position.left, width: size.width, height: size.height }}
        > 
            <div 
                className={`flex ${windowDir == 0 ? "flex-row" : "flex-row-reverse"} justify-between p-2 h-8 bg-background items-center ${isMaximized ? 'cursor-default' : 'cursor-grab'}`} 
                onMouseDown={(e) => {
                    if (!isMaximized) {
                        setIsDragging(true);
                        setOffset({
                            x: e.clientX - position.left,
                            y: e.clientY - position.top,
                        });
                    }
                }}
                onClick={() => setActive(programId)}
            >
                <ButtonComponent
                    handleExit={handleExit}
                    handleMaximize={handleMaximize}
                    handleMinimize={handleMinimize}
                    windowDir={windowDir}
                    windowType={windowType}
                />
                <div className="flex-grow text-center text-foreground text-xs font-semibold capitalize">
                    {programId}
                </div>
                <div className=" w-1/4"></div>
            </div>
            <div className='flex-grow h-[calc(100%-2rem)] relative'>
                {children}
            </div>
            <ResizingSides isMaximized={isMaximized} handleResizeStart={handleResizeStart}/>
        </div>
    );
} 

const MacButtons = ({ handleExit, handleMaximize, handleMinimize, windowDir, windowType }:ButtonProps) => (
    <div className={`flex ${windowDir==0?"flex-row": "flex-row-reverse"} gap-2 space-x-2 text-window-foreground w-1/4`}>
        <button onClick={handleExit} className="w-3 h-3 bg-window-exit rounded-full group overflow-hidden">
            <X className='w-full h-full hidden group-hover:block'/>
        </button>
        <button onClick={handleMinimize} className="w-3 h-3 bg-window-mini rounded-full group overflow-hidden !m-0">
            <Minus className='w-full h-full hidden group-hover:block'/>
        </button>
        <button onClick={handleMaximize} className="w-3 h-3 bg-window-max rounded-full group overflow-hidden !m-0">
            <Maximize2 className='w-full h-full hidden group-hover:block'/>
        </button>
    </div>
);

const WindowsButtons = ({ handleExit, handleMaximize, handleMinimize, windowDir, windowType }:ButtonProps) => (
    <div className={`flex ${windowDir==0?"flex-row": "flex-row-reverse"} gap-2 !text-foreground w-1/4 items-center`}>
        <Button onClick={handleExit} className={`p-1 w-6 h-6 bg-transparent hover:!bg-window-exit rounded-md overflow-hidden !text-foreground !m-0 ${windowType==2&&"bg-window-exit rounded-full"}`}>
            <X className='w-4 h-4'/> 
        </Button>
        <Button onClick={handleMaximize} className={`p-1 w-6 h-6 bg-transparent rounded-md hover:bg-foreground/15 overflow-hidden !m-0 ${windowType==2&&"bg-foreground/15 rounded-full"}`}>
            <Maximize2 className='w-4 h-4 '/> 
        </Button>
        <Button onClick={handleMinimize} className={`p-1 w-6 h-6 bg-transparent hover:!bg-foreground/15 rounded-md overflow-hidden !m-0 ${windowType==2&&"bg-foreground/15 rounded-full"}`}>
            <Minus className='w-4 h-4'/>
        </Button>
    </div>
);

const ResizingSides= ({isMaximized, handleResizeStart}:{isMaximized:boolean, handleResizeStart:Function})=>{
    return(
        <>
            {!isMaximized && (
                <>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize" onMouseDown={handleResizeStart('s')}></div>
                    <div className="absolute top-0 left-0 bottom-0 w-1 cursor-w-resize" onMouseDown={handleResizeStart('w')}></div>
                    <div className="absolute top-0 right-0 bottom-0 w-1 cursor-e-resize" onMouseDown={handleResizeStart('e')}></div> 
                    <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={handleResizeStart('sw')}></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={handleResizeStart('se')}></div>
                </>
            )}
        </>
    )
}

export default MacWindow;