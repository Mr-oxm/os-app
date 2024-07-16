import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import OXMDockIcon from "../desktopIcons/OXMDockIcon";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";

const OXMTaskbar = () => {
    const { iconsType,  } = useAppStore();
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
        <div className="absolute w-fit bg-white/60 h-4 bottom-2 transition-all bgblur rounded-full duration-200 group/show hover:w-fit hover:h-12 px-4 hover:py-1 ease-in-out">
            <div className="opacity-0 group-hover/show:opacity-100 group-hover/show:w-fit flex transition-all flex-row gap-2 h-full ease-linear ">
                {TaskbarIcons.map((icon, index) => (
                    <button
                        key={index}
                        onClick={() => handleProgram(icon.id)}
                        className={`transition-all ease-linear relative duration-100 mb-0 hover:mb-3 active:scale-125 
                        }`}
                    >
                        <OXMDockIcon imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                        <span className={`${
                            openedPrograms.some(p => p.id === icon.id) ? '' : 'hidden'}  absolute -bottom-1 group-hover/show:-bo w-1 h-1 bg-foreground rounded-full`}></span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OXMTaskbar;