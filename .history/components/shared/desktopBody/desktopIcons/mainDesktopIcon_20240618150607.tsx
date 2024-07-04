import Image from "next/image"
import { Activity } from "lucide-react"
const mainDesktopIcon = () => {
    return (
        <div className=" bg-transparent hover:bg-white/20 p-8 flex flex-col gap-4 items-center transition-all rounded-lg justify-center h-full w-full ">
            <Activity width={24} height={100}/>
            <p className="text-sm">User</p>
        </div>
    )
}
export default mainDesktopIcon