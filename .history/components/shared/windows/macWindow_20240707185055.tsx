"use client"
import React, { useState, useCallback } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import Link from 'next/link';
import useAppStore from '@/lib/Store/useAppStore';
import { Button } from '@/components/ui/button';

const MacWindow = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [isMaximized, setIsMaximized] = useState(true);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [lastPosition, setLastPosition] = useState({ top: 0, left: 0 });
    const [isDragging, setIsDragging] = useState(true);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const { windowType} = useAppStore();

    const themes = ['Mac', 'Windows', 'Linux']

    const getImageIndex = (theme:string) => {
        switch (theme) {
            case 'Mac': return 0;
            case 'Windows': return 1;
            case 'Linux': return 2;
            default: return 0;
        }
    }

    const handleExit = () => {
        // Exit functionality here
    };

    const handleMaximize = (e:any) => {
        if (isMaximized) {
            // Restore the window to its previous position and size
            setIsMaximized(false);
            setPosition(lastPosition);
        } else {
            // Maximize the window and disable dragging
            setIsMaximized(true); 
            setLastPosition({
                top: e.clientY - offset.y,
                left: e.clientX - offset.x,
            });
            setPosition({ top: 0, left: 0 });
            setIsDragging(false);
        }
    };

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
    

    const MacButtons= ()=>{return(
        <div className={`flex ${windowType==0?"flex-row": "flex-row-reverse"} gap-2 space-x-2 text-window-foreground w-1/4`}>
            <Link href={"/"} onClick={handleExit} className="w-3 h-3 bg-window-exit rounded-full group overflow-hidden">
                <X className='w-full h-full hidden group-hover:block'/>
            </Link>
            <button className="w-3 h-3 bg-window-mini rounded-full group overflow-hidden !m-0">
                <Minus className='w-full h-full hidden group-hover:block'/>
            </button>
            <button onClick={handleMaximize} className="w-3 h-3 bg-window-max rounded-full group overflow-hidden !m-0">
                <Maximize2 className='w-full h-full hidden group-hover:block'/>
            </button>
        </div>
    )}
    const WindowsButtons= ()=>{return(
        <div className={`flex ${windowType==0?"flex-row": "flex-row-reverse"} gap-2 space-x-2 text-window-foreground w-1/4`}>
            <Link href={"/"} onClick={handleExit} className="w-3 h-3 bg-window-exit rounded-full group overflow-hidden">
                <X className='w-full h-full hidden group-hover:block'/>
            </Link>
            <Button onClick={handleMaximize} className="w-3 h-3 bg-window-max rounded-md group overflow-hidden !m-0">
                <Maximize2 className='w-full h-full hidden group-hover:block'/>
            </Button>
            <Button className="p-1 w-8 h-8 bg-transparent hover:!bg-foreground/0 rounded-md overflow-hidden !m-0">
                <Minus className='w-full h-full'/>
            </Button>
        </div>
    )}
    return (
        <div
            className={`card flex flex-col !p-0 bgblur overflow-hidden bgOpacity absolute ${isMaximized ? 'w-full h-full' : 'w-1/2 h-1/2'} p-4 ${isDragging?"":"transition-all"} ease-in-out`} 
            style={{ top: position.top, left: position.left }}
        >
            <div className={`flex ${windowType==0?"flex-row": "flex-row-reverse"} justify-between p-2 h-8 bg-background items-center ${isMaximized ? 'cursor-default' : isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} onMouseDown={handleMouseDown}>
                <WindowsButtons/>
                <div className="flex-grow text-center text-foreground text-xs font-semibold">
                    Program Title
                </div>
                <div className=" w-1/4"></div>
            </div>
            <div className='flex-grow h-[calc(100%-2rem)] '>
                {children}
            </div>
        </div>
    );
}

export default MacWindow;
