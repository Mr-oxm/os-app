import Image from "next/image"
import { Activity } from "lucide-react"

interface iIcons
{
    imgSrc:string,
    name:string, 
    hideName?:boolean,
}
const mainDesktopIcon = ({imgSrc, name,hideName= true}:iIcons) => {
    return (
        <div className="bg-transparent hover:bg-white/20 p-4 flex flex-col gap-4 items-center transition-all rounded-lg justify-center h-full w-full ">
            <Image src={imgSrc} alt={name} width={200} height={200} className="w-10 h-10 transition-all"/> 
            {hideName?<p className="text-sm">{}</p>: '' }
        </div>
    )
}
export default mainDesktopIcon