"use client"
import React, { useState } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react'; 

const MacWindow = () => {
    const [isMaximized, setIsMaximized] = useState(false); 

    const handleExit = () => {
        
    };

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    return (
        <div className={`card bgblur bgOpacity ${isMaximized ? 'w-full h-full' : 'w-1/2 h-1/2'} p-4`}>
            <div  className="flex justify-between items-center mb-2">
                {/* Window buttons: exit, minimize, maximize */}
                <div className="flex space-x-2 text-window-foreground">
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
                <div className=""></div>
            </div>
            <div>
                {/* Additional content can go here */}
            </div>
        </div>
    )
}

export default MacWindow;
