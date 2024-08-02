import useAppStore from "@/lib/Store/useAppStore";
import OXMDockIcon from "../desktopIcons/OXMDockIcon";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import { useTaskbarStore } from "@/lib/Store/useTaskbarStore";
import TaskbarContextMenu from "./TaskbarContextMenu";

const OXMTaskbar = () => {
    const { iconsType, taskbarDir } = useAppStore();
    const {openedPrograms} = useOSMemoryStore();
    const {TaskbarIcons}= useTaskbarStore(); 

    return (
        <div className={`taskbar-buffer absolute card bg-background/50 hover:bg-background/15 hover:!border-2 hover:!border-backbg-background/50 delay-75 transition-all bgblur !rounded-full duration-200 group/show ease-in-out z-50 ${
            taskbarDir === 0
                ? "hover:w-fit hover:h-14 !py-0 !px-2 hover:!py-0 h-2 bottom-2 w-fit"
                : taskbarDir === 1
                ? "w-2 h-fit hover:w-14 !px-0 !py-2 right-2"
                : "left-2 w-2 h-fit hover:w-14 !px-0 !py-2"
        }`}>
            <div className={`opacity-0 group-hover/show:opacity-100  flex transition-all  gap-2  ease-linear ${taskbarDir===0?"flex-row h-full group-hover/show:w-fit":"flex-col"}`}>
                {TaskbarIcons.map((icon, index) => (
                    <TaskbarContextMenu appId={icon.id}
                        key={index}
                        className={`transition-all group/button ease-linear relative duration-100 mb-0  active:scale-150 delay-75 text-center ${taskbarDir===0?"hover:mb-3":(taskbarDir===1?"hover:mr-3":"hover:ml-3")}
                        }`}
                    >
                        <OXMDockIcon imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                        <span className={`${
                            openedPrograms.some(p => p.id === icon.id) ? '' : 'hidden'}  absolute   transition-all w-1 h-1 bg-foreground rounded-full ${taskbarDir===0 && "-bottom-0 group-hover/button:-bottom-2"}
                        }`}></span>
                    </TaskbarContextMenu>
                ))}
            </div>
        </div>
    );
};

export default OXMTaskbar;