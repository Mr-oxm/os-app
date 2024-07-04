import Image from "next/image"
import { Activity } from "lucide-react"
const mainDesktopIcon = () => {
    return (
        <div className=" bg-transparent hover:bg-white/20 p-8 flex flex-col gap-4 items-center ease-in-out">
            <Activity/>
            <p className="text-sm">User</p>
        </div>
    )
}
export default mainDesktopIcon