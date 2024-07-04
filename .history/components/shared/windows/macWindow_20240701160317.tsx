import React from 'react';
import { Cross, Minus, Maximize2 } from 'lucide-react';
const MacWindow = () => {
    return (
        <div className="card bgblur bgOpacity w-full h-full p-4"> 
            <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-window-exit rounded-full"><Cross/></span>
                    <span className="w-3 h-3 bg-window-mini rounded-full"><Minus/></span>
                    <span className="w-3 h-3 bg-window-max rounded-full"><Ma</span>
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
