import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import OXMDockIcon from "../desktopIcons/OXMDockIcon";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";

const OXMTaskbar = () => {
    const { iconsType, taskbarDir } = useAppStore();
    const {openProgram, openedPrograms, minimizeProgram, maximizeProgram} = useOSMemoryStore();
    
    const handleProgram = (id:string) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }  

    return (
        <div className={`absolute  bg-white/60 transition-all bgblur rounded-full duration-200 group/show ease-in-out z-50 ${taskbarDir===0?" hover:w-fit hover:h-14 px-4 hover:py-1 h-4 bottom-2 w-fit":"w-4 h-fit hover:w-14 py-4 px-1 "} ${taskbarDir===1? "right-2":"left-2"}  `}>
            <div className={`opacity-0 group-hover/show:opacity-100  flex transition-all  gap-2  ease-linear ${taskbarDir===0?"flex-row h-full group-hover/show:w-fit":"flex-col"}`}>
                {TaskbarIcons.map((icon, index) => (
                    <div
                        key={index}
                        onClick={() => handleProgram(icon.id)}
                        className={`transition-all group/button ease-linear relative duration-100 mb-0  active:scale-150 text-center ${taskbarDir===0}
                        }`}
                    >
                        <OXMDockIcon imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                        <span className={`${
                            openedPrograms.some(p => p.id === icon.id) ? '' : 'hidden'}  absolute -bottom-0 group-hover/button:-bottom-2 transition-all w-1 h-1 bg-foreground rounded-full`}></span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OXMTaskbar;