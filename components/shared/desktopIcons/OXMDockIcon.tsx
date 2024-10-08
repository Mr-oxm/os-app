import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useAppStore from "@/lib/Store/useAppStore";
import Image, { StaticImageData } from "next/image" 
import { useState } from "react";

interface iIcons{
    imgSrc:string|StaticImageData,
    name:string, 
    isActive:boolean;
}
const OXMDockIcon = ({imgSrc, name, isActive}:iIcons) => { 
    const {taskbarDir } = useAppStore(); 

    return (
        <div className={`item bg-transparent flex flex-col gap-4 items-center  rounded-lg justify-center h-full w-full relative group `}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Image src={imgSrc} alt={name} width={200} height={200} className="brightness-100  p-1 w-10 h-10"/> 
                    </TooltipTrigger>
                    <TooltipContent className="card !px-2 !py-1 delay-0 text-xs font-bold bgOpacity bgblur">
                        {name}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>  
            <div className={` ${!isActive&&"hidden"} absolute top-10 h-0 w-0 border-white border-solid border-2 rounded-full group-hover:opacity-0 opacity-100`}></div>
        </div>
    )
} 
export default OXMDockIcon