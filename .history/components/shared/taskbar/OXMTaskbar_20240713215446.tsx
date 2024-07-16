import Link from "next/link"; 
import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import OXMDockIcon from "../desktopIcons/OXMDockIcon";
const OXMTaskbar = () => {
    const {iconsType}=useAppStore()
    return (
        <div className="absolute w-44 bg-white/60 h-4 bottom-2 transition-all bgblur rounded-full duration-200 group/show hover:w-fit hover:h-12 px-4 hover:py-4 ease-in-out">
            <div className="opacity-0 group-hover/show:opacity-100 flex transition-all flex-row gap-2 h-full duration-300 w-fit">
                {TaskbarIcons.map((icon, index) => (
                    <Link href={icon.route} className={` transition-all ease-linear relative duration-100 mb-0 hover:mb-3 active:scale-125`}
                    >
                        <OXMDockIcon  key={index} imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default OXMTaskbar