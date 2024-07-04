import Image from "next/image"
import { Activity } from "lucide-react"

interface iIcons{
    hideName?:boolean,
}
const mainDesktopIcon = ({hideName= true}:iIcons) => {
    return (
        <div className="item bg-transparent hover:bg-white/20 p-4 flex flex-col gap-4 items-center transition-all rounded-lg justify-center h-full w-full my-28">
            <Activity/> 
            {hideName?<p className="text-sm">User</p>: '' }
        </div>
    )
}
export default mainDesktopIcon