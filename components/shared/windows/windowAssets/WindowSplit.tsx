import React from 'react';
import { Button } from '@/components/ui/button';
import { TooltipContent } from '@/components/ui/tooltip';

interface WindowSplitProps {
    handleSplit: (direction: string) => void;
    windowDir: number;
}

const WindowSplit: React.FC<WindowSplitProps> = ({ handleSplit, windowDir }) => (
    <TooltipContent className={`card bgOpacity bgblur flex flex-col gap-2 ${windowDir === 0 ? "translate-x-10" : "-translate-x-10"} !text-xs `}>
        <h2 className='col-span-2 text-xs text-center'>Split in Two</h2>
        <div className='card bgOpacity grid grid-cols-2 gap-2'>
            <Button onClick={() => handleSplit('left')} className='rounded-r-none h-20 !text-xs !text-primary-foreground bg-foreground/15 hover:!bg-foreground/20'>Left</Button>
            <Button onClick={() => handleSplit('right')} className='rounded-l-none h-20 !text-xs !text-primary-foreground bg-foreground/15 hover:!bg-foreground/20'>Right</Button>
        </div>
        <h2 className='col-span-2 text-xs text-center'>Split in Four</h2>
        <div className='grid grid-cols-2 gap-2 h-fit card bgOpacity'>
            <div className='flex flex-col gap-2 h-full '>
                <Button onClick={() => handleSplit('NW')} className='rounded-r-none rounded-b-none !text-xs !text-primary-foreground bg-foreground/15 hover:!bg-foreground/20'>NW</Button>
                <Button onClick={() => handleSplit('SW')} className='rounded-r-none rounded-t-none !text-xs !text-primary-foreground bg-foreground/15 hover:!bg-foreground/20'>SW</Button>
            </div>
            <div className='flex flex-col gap-2 h-full'>
                <Button onClick={() => handleSplit('NE')} className='rounded-l-none rounded-b-none !text-xs !text-primary-foreground bg-foreground/15 hover:!bg-foreground/20'>NE</Button>
                <Button onClick={() => handleSplit('SE')} className='rounded-l-none rounded-t-none !text-xs !text-primary-foreground bg-foreground/15 hover:!bg-foreground/20'>SE</Button>
            </div>
        </div>
    </TooltipContent>
);

export default React.memo(WindowSplit);