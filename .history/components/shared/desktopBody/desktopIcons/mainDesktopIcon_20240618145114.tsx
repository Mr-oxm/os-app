import Image from "next/image"
import { Activity } from "lucide-react"
const mainDesktopIcon = () => {
    return (
        <div className=" bg-tra hover:bg- p-8 flex flex-col gap-4 items-center">
            <Activity/>
            <p className="text-sm">User</p>
        </div>
    )
}
export default mainDesktopIcon