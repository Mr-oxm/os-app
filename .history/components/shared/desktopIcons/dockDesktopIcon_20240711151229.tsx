import useAppStore from "@/lib/Store/useAppStore";
import Image from "next/image" 
import { useState } from "react";

interface iIcons{
    imgSrc:string,
    name:string, 
}
const dockDesktopIcon = ({imgSrc, name}:iIcons) => {
    const [isBouncing, setIsBouncing] = useState(false);
    const {taskbarDir } = useAppStore();
    const handleClick = () => {
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 700);
    };

    return (
        <div onClick={handleClick} className={`item bg-transparent flex flex-col gap-4 items-center transition-all rounded-lg justify-center h-full w-full relative group ${isBouncing ? 'animate-bouncing' : ''} `}>
            <div className={` hidden absolute  flex-col items-center group-hover:flex ${taskbarDir===0? "bottom-10":(taskbarDir==1?"right-10":"left-10")}`}>
                <p className=" text-xs scale-75 bg-background py-1 px-4 rounded-lg ">
                    {name}
                </p>
                <span className={` w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-background border-r-8 border-r-transparent absolute top-5 `}></span>
            </div>
            <Image src={imgSrc} alt={name} width={200} height={200} className="brightness-100 group-active:brightness-200 w-10 h-10 transition-all"/>
            <div className="hidden absolute top-9 h-0 w-0 border-white border-solid border-2 rounded-full hover:hidden"></div>
        </div>
    )
}
export default dockDesktopIcon