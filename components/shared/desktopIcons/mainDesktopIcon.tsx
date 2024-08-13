import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import { useTaskbarStore } from "@/lib/Store/useTaskbarStore"
import Image, { StaticImageData } from "next/image"


interface iIcons
{
    imgSrc:string|StaticImageData,
    name:string, 
    hideName?:boolean,
}
const mainDesktopIcon = ({imgSrc, name,hideName= true}:iIcons) => {
    const {openProgram } = useTaskbarStore();
    const { openedPrograms, minimizeProgram, maximizeProgram, active, setActive } = useOSMemoryStore();

    const handleProgram = (id:any) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) { 
            if(result.minimized){ 
                setActive(id);
                maximizeProgram(id);
            }else if(active != id){
                setActive(id);
            }else{
                minimizeProgram(id)
            }
        } else {
            openProgram(id);
        }
    }
    return (
        <div className="select-none bg-transparent hover:bg-background/20 p-2 flex flex-col gap-3 items-center transition-all rounded-lg justify-center h-full w-full " onDoubleClick={()=>handleProgram('finder')}>
            <Image src={imgSrc} alt={name} width={200} height={200} className="w-14 h-14 transition-all"/> 
            {hideName?<p className="text-xs">{name}</p>: '' }
        </div>
    )
}
export default mainDesktopIcon