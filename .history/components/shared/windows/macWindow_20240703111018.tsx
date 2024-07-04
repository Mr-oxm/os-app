"use client"
import React, { useState, useCallback } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

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

    return (
        <div
            className={`card grid grid-rows-12 !p-0 bgblur overflow-hidden bgOpacity absolute ${isMaximized ? 'w-full h-full' : 'w-1/2 h-1/2'} p-4 ${isDragging?"":"transition-all"} ease-in-out`} 
            style={{ top: position.top, left: position.left }}
        >
            <div className={`flex justify-between rows p-2 bg-background items-center ${isMaximized ? 'cursor-default' : isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} onMouseDown={handleMouseDown}>
                <div className="flex space-x-2 text-window-foreground w-1/4">
                    <button onClick={handleExit} className="w-3 h-3 bg-window-exit rounded-full group overflow-hidden">
                        <X className='w-full h-full hidden group-hover:block'/>
                    </button>
                    <button className="w-3 h-3 bg-window-mini rounded-full group overflow-hidden">
                        <Minus className='w-full h-full hidden group-hover:block'/>
                    </button>
                    <button onClick={handleMaximize} className="w-3 h-3 bg-window-max rounded-full group overflow-hidden">
                        <Maximize2 className='w-full h-full hidden group-hover:block'/>
                    </button>
                </div>
                <div className="flex-grow text-center text-foreground text-xs font-semibold">
                    Program Title
                </div>
                <div className=" w-1/4"></div>
            </div>
            <div className='flex-grow h-full'>
                {children}
            </div>
        </div>
    );
}

export default MacWindow;
