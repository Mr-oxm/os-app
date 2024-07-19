import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useAppStore from "@/lib/Store/useAppStore";
import Image from "next/image" 
import { useState } from "react";

interface iIcons{
    imgSrc:string,
    name:string, 
}
const OXMDockIcon = ({imgSrc, name}:iIcons) => { 
    const {taskbarDir } = useAppStore(); 

    return (
        <div className={`item bg-transparent flex flex-col gap-4 items-center transition-all rounded-lg justify-center h-full w-full relative group `}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Image src={imgSrc} alt={name} width={200} height={200} className="brightness-100  w-10 h-10"/> 
                    </TooltipTrigger>
                    <TooltipContent className="card !px-2 !py-1 delay-0 text-xs font-bold">
                        {name}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>  
            <div className="hidden absolute top-9 h-0 w-0 border-white border-solid border-2 rounded-full hover:hidden"></div>
        </div>
    )
} 
export default OXMDockIcon