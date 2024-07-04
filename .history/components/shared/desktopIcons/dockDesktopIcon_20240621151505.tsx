import Image from "next/image"
import { Activity } from "lucide-react"

interface iIcons{
    hideName?:boolean,
}
const dockDesktopIcon = ({hideName= true}:iIcons) => {
    return (
        <div className="item bg-transparent flex flex-col gap-4 items-center transition-all rounded-lg justify-center h-full w-full ">
            <Activity/> 
            {hideName?<p className="text-sm">User</p>: '' }
        </div>
    )
}
export default dockDesktopIcon