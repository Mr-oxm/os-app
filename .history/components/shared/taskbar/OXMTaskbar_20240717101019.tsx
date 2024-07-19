import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import OXMDockIcon from "../desktopIcons/OXMDockIcon";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";

const OXMTaskbar = () => {
    const { iconsType, taskbarDir } = useAppStore();
    const {openProgram, openedPrograms, minimizeProgram, maximizeProgram} = useOSMemoryStore();

    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsHovered(true), 50);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsHovered(false), 50);
    };
    
    const handleProgram = (id:string) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }  

    return (
        <div className={`absolute card bg-background/50 hover:bg-background/15 hover:!border-2 hover:!border-backbg-background/50  delay-75 transition-all bgblur !rounded-full duration-200 group/show ease-in-out z-50 ${taskbarDir===0?" hover:w-fit hover:h-14 !py-0 !px-2 hover:!py-0 h-2 bottom-2 w-fit": (taskbarDir===1? "w-2 h-fit hover:w-14 !px-0 !py-2 right-2":"left-2 w-2 h-fit hover:w-14 !px-0 !py-2")}   `}>
            <div className={`taskbar-buffer absolute card bg-background/50 hover:bg-background/15 hover:!border-2 hover:!border-backbg-background/50 delay-75 transition-all bgblur !rounded-full duration-200 group/show ease-in-out z-50 ${
            taskbarDir === 0
                ? "hover:w-fit hover:h-14 !py-0 !px-2 hover:!py-0 h-2 bottom-2 w-fit"
                : taskbarDir === 1
                ? "w-2 h-fit hover:w-14 !px-0 !py-2 right-2"
                : "left-2 w-2 h-fit hover:w-14 !px-0 !py-2"
            }`}>
                {TaskbarIcons.map((icon, index) => (
                    <div
                        key={index}
                        onClick={() => handleProgram(icon.id)}
                        className={`transition-all group/button ease-linear relative duration-100 mb-0  active:scale-150 text-center delay-75 ${taskbarDir===0?"hover:mb-3":(taskbarDir===1?"hover:mr-3":"hover:ml-3")}
                        }`}
                    >
                        <OXMDockIcon imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                        <span className={`${
                            openedPrograms.some(p => p.id === icon.id) ? '' : 'hidden'}  absolute  transition-all w-1 h-1 bg-foreground rounded-full ${taskbarDir===0 && "-bottom-0 group-hover/button:-bottom-2"}
                        }`}></span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OXMTaskbar;