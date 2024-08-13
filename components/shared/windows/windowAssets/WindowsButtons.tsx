import React from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { ImCross, ImMinus } from "react-icons/im";
import { FaMaximize } from "react-icons/fa6";
import WindowSplit from './WindowSplit';
import { ButtonProps } from './types';

const WindowsButtons: React.FC<ButtonProps> = ({ setIsClosing, handleMaximize, handleMinimize, windowDir, windowType, handleSplit }) => (
    <div className={`flex ${windowDir == 0 ? "flex-row" : "flex-row-reverse"} gap-2 !text-foreground w-1/4 items-center`}>
        <Button onClick={() => setIsClosing(true)} className={`p-1 md:w-6 md:h-6 h-8 w-8 bg-transparent hover:!bg-window-exit rounded-md overflow-hidden !text-foreground !m-0 ${windowType == 2 && "bg-window-exit rounded-full"} ${windowType == 3 && "hover:!text-window-foreground hover:bg-window-exit rounded-full"}`}>
            {windowType === 3 ? <ImCross /> : <X className='w-4 h-4'/>}
        </Button>
        
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className='!m-0 hidden md:block'>
                <Button onClick={handleMaximize} className={`p-1 md:w-6 md:h-6 h-8 w-8 bg-transparent rounded-md hover:bg-foreground/15 overflow-hidden !m-0 ${windowType == 2 && "bg-foreground/15 rounded-full"} ${windowType == 3 && "hover:!text-window-foreground hover:bg-window-max rounded-full"}`}>
                    {windowType === 3 ? <FaMaximize /> : <Maximize2 className='w-4 h-4 '/>}
                </Button>
                </TooltipTrigger>
                <WindowSplit handleSplit={handleSplit} windowDir={windowDir}/>
            </Tooltip>
        </TooltipProvider> 
        <Button onClick={handleMinimize} className={`p-1 md:w-6 md:h-6 h-8 w-8 bg-transparent hover:!bg-foreground/15 rounded-md overflow-hidden !m-0 ${windowType == 2 && "bg-foreground/15 rounded-full"} ${windowType == 3 && "hover:!text-window-foreground hover:!bg-window-mini rounded-full"}`}>
            {windowType === 3 ? <ImMinus /> : <Minus className='w-4 h-4'/>}
        </Button>
    </div>
);

export default React.memo(WindowsButtons);