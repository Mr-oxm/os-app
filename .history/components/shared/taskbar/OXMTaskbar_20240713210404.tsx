import Link from "next/link";
import DockDesktopIcon from "../desktopIcons/dockDesktopIcon";
import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
const OXMTaskbar = () => {
    const {iconsType}=useAppStore()
    return (
        <div className="absolute w-44 h-4 bottom-2 transition-all bg-white rounded-full">
            {TaskbarIcons.map((icon, index) => (
                <Link href={icon.route} className={` transition-all ease-linear relative duration-100 `}}
                >
                    <DockDesktopIcon  key={index} imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                </Link>
            ))}
        </div>
    )
}
export default OXMTaskbar