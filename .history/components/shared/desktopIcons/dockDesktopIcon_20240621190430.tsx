"use client"
import Image from "next/image" 

interface iIcons{
    imgSrc:string,
    name:string 
}
const dockDesktopIcon = ({imgSrc, name}:iIcons) => {
    return (
        <div className="item bg-transparent flex flex-col gap-4 items-center transition-all rounded-lg justify-center h-full w-full  relative group">
            <p className="text-sm absolute bottom-16 bg-white py-1 px-4 rounded-lg hidden group-hover:block">{name}</p>
            <Image src={imgSrc} alt={name} width={200} height={200} className="brightness-100 group-active:brightness-200 w-12 h-12 transition-all"/>
        </div>
    )
}
export default dockDesktopIcon