import Image from "next/image"
import { Activity } from "lucide-react"
const mainDesktopIcon = () => {
    return (
        <div className=" bg-white p-8 flex flex-col gap-2 items-center">
            <Activity/>
            <p className="text-sm">User</p>
        </div>
    )
}
export default mainDesktopIcon