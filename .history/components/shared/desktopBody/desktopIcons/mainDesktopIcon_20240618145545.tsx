import Image from "next/image"
import { Activity } from "lucide-react"
const mainDesktopIcon = () => {
    return (
        <div className=" bg-transparent hover:bg-white/20 flex flex-col gap-4 items-center transition-all rounded-lg content-center">
            <Activity/>
            <p className="text-sm">User</p>
        </div>
    )
}
export default mainDesktopIcon