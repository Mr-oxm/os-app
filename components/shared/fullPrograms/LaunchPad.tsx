import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { SystemAppsIcons } from "@/lib/constants"
import useAppStore from "@/lib/Store/useAppStore";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import { useTaskbarStore } from "@/lib/Store/useTaskbarStore";
import Image from "next/image"

const LaunchPad = () => {
    const {openProgram}= useTaskbarStore();
    const { iconsType } = useAppStore();
    const { openedPrograms, minimizeProgram, maximizeProgram } = useOSMemoryStore();

    const handleProgram = (id:any) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }
    return (
        <ScrollArea className="!h-full !w-full">
            <div className="w-full h-full p-4 grid grid-cols-3 md:grid-cols-4 m-auto gap-2">
                {SystemAppsIcons.map((icon, index) => ( 
                    (icon.id!=='launchpad')&&
                    (<Button 
                        key={index}
                        variant="ghost" 
                        className={`!p-6 w-full h-full group border btn flex flex-col gap-2`}  
                        onClick={() => handleProgram(icon.id)}
                    >
                        <Image 
                            key={index}
                            src={icon.imgSrc[iconsType]} 
                            alt={icon.name} 
                            width={200}
                            height={200}
                            className="w-12 h-12 transition-all"
                        />
                        <span className="text-xs">{icon.name}</span>
                    </Button>)
                ))}
            </div>
        </ScrollArea>
    )
}
export default LaunchPad