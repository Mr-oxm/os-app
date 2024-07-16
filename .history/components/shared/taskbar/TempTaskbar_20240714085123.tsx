import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import OXMDockIcon from "../desktopIcons/OXMDockIcon";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";

const OXMTaskbar = () => {
    const { iconsType,  } = useAppStore();
    const {openProgram, openedPrograms, minimizeProgram, maximizeProgram} = useOSMemoryStore();

    return (
        <div className="absolute w-fit bg-white/60 h-4 bottom-2 transition-all bgblur rounded-full duration-200 group/show hover:w-fit hover:h-12 px-4 hover:py-4 ease-in-out">
            <div className="opacity-0 group-hover/show:opacity-100 group-hover/show:w-fit flex transition-all flex-row gap-2 h-full ease-linear ">
                {TaskbarIcons.map((icon, index) => (
                    <button
                        key={index}
                        onClick={() => openProgram(icon.id)}
                        className={`transition-all ease-linear relative duration-100 mb-0 hover:mb-3 active:scale-125 ${
                            openedPrograms.some(p => p.id === icon.id) ? 'border-b-2 border-blue-500' : ''
                        }`}
                    >
                        <OXMDockIcon imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OXMTaskbar;