"use client"
import React from 'react';
import useWindowLogic from './windowAssets/useWindowLogic';
import { WindowProps } from './windowAssets/types';
import ResizingSides from './windowAssets/ResizingSides';
import {Lock } from 'lucide-react';
import dynamic from 'next/dynamic';
const MacButtons = dynamic(() => import('./windowAssets/MacButtons'));
const WindowsButtons = dynamic(() => import('./windowAssets/WindowsButtons'));

const MainWindow: React.FC<WindowProps> = ({
    children,
    programId,
    minimized,
    name
}) => {
    const {
        isClosing,
        isOpening,
        isMinimizing,
        isMaximizing,
        isMaximized,
        position,
        size,
        isDragging,
        isResizing,
        windowType,
        windowDir,
        active,
        handleExit,
        handleMinimize,
        handleMaximize,
        handleMouseMove,
        handleMouseUp,
        handleResizeStart,
        handleSplit,
        setActive,
        setIsClosing,
        setIsDragging,
        setOffset,
        setIsMaximizing,
        setIsOpening,
    } = useWindowLogic(programId, minimized);

    const ButtonComponent = windowType === 0 ? MacButtons : WindowsButtons;

    return (
        <div
            id={`window-${programId}`}
            className={`card ${windowType == 1 ? "!rounded-none" : ""} 
                ${(minimized && !isMinimizing) && "hidden"} 
                ${(!minimized && !isMaximizing) && 'flex'}
                flex-col !p-0 bgblur overflow-hidden bgOpacity absolute 
                ${isMaximized ? 'w-full h-full' : ''}
                ${isClosing ? "closing" : ""}
                ${isOpening ? "opening" : ""}
                ${isMinimizing ? "closing" : ""}
                ${isMaximizing ? "opening" : ""}
                ${(active === programId) ? "z-20" : "z-10"} p-4 ${isDragging || isResizing ? "" : "transition-all duration-200"} 
                ease-in-out`}
            style={{ top: position.top, left: position.left, width: size.width, height: size.height }}
            onAnimationEnd={() => {
                if (isClosing) handleExit();
                if (isOpening) setIsOpening(false);
                if (isMinimizing) handleMinimize();
                if (isMaximizing) setIsMaximizing(false);
            }}
        >
            <div 
                className={`select-none flex ${windowDir == 0 ? "flex-row" : "flex-row-reverse"} justify-between p-2 h-8 bg-background items-center ${isMaximized ? 'cursor-default' : 'cursor-grab'}`} 
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
                    handleMinimize={handleMinimize}
                    handleMaximize={handleMaximize} 
                    windowDir={windowDir}
                    windowType={windowType}
                    handleSplit={handleSplit}
                    setIsClosing={setIsClosing}
                />
                <div className="flex-grow flex flex-row gap-2 justify-center items-center text-center text-foreground text-xs font-semibold capitalize">
                    {isMaximized && <Lock width={12} height={12} />}
                    {name}
                </div>
                <div className="w-1/4"></div>
            </div>
            <div className='flex-grow h-[calc(100%-2rem)] relative'>
                {children}
            </div>
            {!isMaximized&&<ResizingSides isMaximized={isMaximized} handleResizeStart={handleResizeStart}/>}
        </div>
    );
}

export default MainWindow;