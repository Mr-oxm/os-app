import React from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import WindowSplit from './WindowSplit';
import { ButtonProps } from './types';

const MacButtons: React.FC<ButtonProps> = ({ setIsClosing, handleMaximize, handleMinimize, windowDir, handleSplit }) => (
    <div className={`flex ${windowDir == 0 ? "flex-row" : "flex-row-reverse"} gap-2 space-x-2 text-window-foreground w-1/4 items-center`}>
        <button onClick={() => setIsClosing(true)} className="md:w-3 md:h-3 h-5 w-5 bg-window-exit rounded-full group overflow-hidden">
            <X className='w-full h-full hidden group-hover:block'/>
        </button>
        <button onClick={handleMinimize} className="md:w-3 md:h-3 h-5 w-5 bg-window-mini rounded-full group overflow-hidden !m-0">
            <Minus className='w-full h-full hidden group-hover:block'/>
        </button>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className='!m-0 hidden md:flex'>
                    <button onClick={handleMaximize} className="md:w-3 md:h-3 h-5 w-5 bg-window-max rounded-full group overflow-hidden !m-0">
                        <Maximize2 className='w-full h-full hidden group-hover:block'/>
                    </button>
                </TooltipTrigger>
                <WindowSplit handleSplit={handleSplit} windowDir={windowDir}/>
            </Tooltip>
        </TooltipProvider> 
    </div>
);

export default React.memo(MacButtons);