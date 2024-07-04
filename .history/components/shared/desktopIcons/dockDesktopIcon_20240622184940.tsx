import Image from "next/image" 
import { useState } from "react";

interface iIcons{
    imgSrc:string,
    name:string, 
}
const dockDesktopIcon = ({imgSrc, name}:iIcons) => {
    const [isBouncing, setIsBouncing] = useState(false);

    const handleClick = () => {
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 700);
    };

    return (
        <div onClick={handleClick} className={`item bg-transparent flex flex-col gap-4 items-center transition-all rounded-lg justify-center h-full w-full relative group ${isBouncing ? 'animate-bouncing' : ''} `}>
            <div className=" hidden absolute bottom-10 flex-col items-center group-hover:flex ">
                <p className=" text-xs scale-75 bg-white py-1 px-4 rounded-lg ">
                    {name}
                </p>
                <span className=" w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-white border-r-8 border-r-transparent absolute top-5"></span>
            </div>
            <Image src={imgSrc} alt={name} width={200} height={200} className="brightness-100 group-active:brightness-200 w-10 h-10 transition-all"/>
            <div className="bg-white h-2 w-2"></div>
        </div>
    )
}
export default dockDesktopIcon