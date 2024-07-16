import Link from "next/link";
import DockDesktopIcon from "../desktopIcons/dockDesktopIcon";
import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
const OXMTaskbar = () => {
    const {iconsType}=useAppStore()
    return (
        <div className="absolute w-44 bg-white/60 h-4 bottom-2 transition-all bgblur rounded-full group/show hover:w-fit hover:h-12 px-4 hover:py-4 ease-in-out">
            <div className="group-hover/show:flex transition-all flex-row gap-2 hidden h-full">
                {TaskbarIcons.map((icon, index) => (
                    <Link href={icon.route} className={` transition-all ease-linear relative duration-100 mb-0 hover:mb-3 hover:scale-125`}
                    >
                        <DockDesktopIcon  key={index} imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default OXMTaskbar