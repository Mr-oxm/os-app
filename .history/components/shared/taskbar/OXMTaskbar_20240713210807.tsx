import Link from "next/link";
import DockDesktopIcon from "../desktopIcons/dockDesktopIcon";
import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
const OXMTaskbar = () => {
    const {iconsType}=useAppStore()
    return (
        <div className="absolute w-44 h-20 bottom-2 transition-all bg-white rounded-full group/show hover:w-fit hover:h-10 px-2 py-2">
            <div className="group-hover/show:flex flex-row gap-2 hidden h-full">
                {TaskbarIcons.map((icon, index) => (
                    <Link href={icon.route} className={` transition-all ease-linear relative duration-100 `}
                    >
                        <DockDesktopIcon  key={index} imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default OXMTaskbar