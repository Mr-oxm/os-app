import Image from "next/image"
import { Activity } from "lucide-react"

interface iIcons{
    imgSrc:string,
    name:string
    hideName?:boolean,
}
const dockDesktopIcon = ({imgSrc, name,hideName= true}:iIcons) => {
    return (
        <div className="item bg-transparent flex flex-col gap-4 items-center transition-all rounded-lg justify-center h-full w-full brightness-100 active:brightness-200">
            <Image src={imgSrc} alt={name} width={50} height={50} className="bg-"/>
            {hideName?<p className="text-sm">{name}</p>: '' }
        </div>
    )
}
export default dockDesktopIcon