import useAppStore from "@/lib/Store/useAppStore";
import OXMDockIcon from "../desktopIcons/OXMDockIcon";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import { useTaskbarStore } from "@/lib/Store/useTaskbarStore";
import TaskbarContextMenu from "./TaskbarContextMenu"; 
import EchoIcon from "../desktopIcons/EchoIcon";

const OXMTaskbar = () => {
    const { iconsType, taskbarDir } = useAppStore();
    const {openedPrograms} = useOSMemoryStore();
    const {TaskbarIcons}= useTaskbarStore(); 

    const MdClassname=`md:absolute md:bg-background/50 hover:bg-background/15 md:!border md:!border-border/20 hover:!border-2 hover:!border-backbg-background/50 delay-75`;
    
    const SmClassname=`block bg-background/15 !border-2 !border-backbg-background/50`;

    return (
        <div className={`taskbar-buffer ${MdClassname} ${SmClassname}  card transition-all bgblur !rounded-full duration-200 group/show ease-in-out z-50 ${
            taskbarDir === 0
                ? "hover:w-fit hover:h-14 !py-0 !px-2 hover:!py-0 h-14 md:h-2 bottom-2 w-fit"
                : taskbarDir === 1
                ? "w-14 md:w-2 h-fit hover:w-14 !px-0 !py-2 right-2"
                : "left-2 w-14 md:w-2 h-fit hover:w-14 !px-0 !py-2"
        }`}>
            <div className={`opacity-100 md:opacity-0 group-hover/show:opacity-100  flex items-center transition-all  gap-2  ease-linear ${taskbarDir===0?"flex-row h-full group-hover/show:w-fit":"flex-col"}`}>
                {TaskbarIcons.map((icon, index) => (
                    <TaskbarContextMenu appId={icon.id}
                        key={index}
                        className={`transition-all group/button ease-in-out relative duration-200 mb-0  active:scale-150 delay-75 text-center hover:scale-125
                        }")}
                        }`}
                    >
                        <EchoIcon>
                            <OXMDockIcon imgSrc={icon.imgSrc[iconsType]} name={icon.name} isActive={openedPrograms.some(p => p.id === icon.id)}/>
                        </EchoIcon> 
                    </TaskbarContextMenu>
                ))}
            </div>
        </div>
    );
};

export default OXMTaskbar;