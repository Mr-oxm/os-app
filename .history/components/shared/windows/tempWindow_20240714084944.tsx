"use client"
import React, { useState, useCallback } from 'react';
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
    minimized
}: Readonly<{
    children: React.ReactNode;
    programId: string;
    
}>) => {
    const [isMaximized, setIsMaximized] = useState(true);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [lastPosition, setLastPosition] = useState({ top: 0, left: 0 });
    const [isDragging, setIsDragging] = useState(true);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const { windowType, windowDir } = useAppStore();
    const {closeProgram, minimizeProgram} = useOSMemoryStore();

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
        } else {
            setIsMaximized(true);
            setLastPosition(position);
            setPosition({ top: 0, left: 0 });
            setIsDragging(false);
        }
    }, [isMaximized, lastPosition, position]);

    const handleMouseDown = (e:any) => {
        if (!isMaximized) {
            setIsDragging(true);
            setOffset({
                x: e.clientX - position.left,
                y: e.clientY - position.top,
            });
        }
    };

    const handleMouseMove = useCallback((e:any) => {
        if (isDragging && !isMaximized) {
            setPosition({
                top: e.clientY - offset.y,
                left: e.clientX - offset.x,
            });
        }
    }, [isDragging, offset, isMaximized]);

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    React.useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove]);
    

    const ButtonComponent = windowType === 0 ? MacButtons : WindowsButtons;


    return (
        <div
            className={`card ${windowType==1?"!rounded-none": ""} ${}flex flex-col !p-0 bgblur overflow-hidden bgOpacity absolute ${isMaximized ? 'w-full h-full' : 'w-1/2 h-1/2'} p-4 ${isDragging?"":"transition-all"} ease-in-out`} 
            style={{ top: position.top, left: position.left }}
        >
            <div className={`flex ${windowDir==0?"flex-row": "flex-row-reverse"} justify-between p-2 h-8 bg-background items-center ${isMaximized ? 'cursor-default' : isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} onMouseDown={handleMouseDown}>
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
            <div className='flex-grow h-[calc(100%-2rem)] '>
                {children}
            </div>
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

export default MacWindow;