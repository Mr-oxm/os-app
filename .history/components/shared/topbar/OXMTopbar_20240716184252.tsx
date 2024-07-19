"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import { Label } from "@radix-ui/react-context-menu";
import { Battery, Volume2, Wifi } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineSignalWifi4Bar,MdOutlinePowerSettingsNew, MdOutlineRestartAlt } from "react-icons/md";
import { FaVolumeUp, FaSearch } from "react-icons/fa";
import { RiBatteryFill } from "react-icons/ri";
import { IoIosApps } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoLogOutOutline } from "react-icons/io5";

const formatDate = (date:Date) => {
    const options:any = { 
        day: '2-digit', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    };
    return date.toLocaleDateString('en-US', options).replace(',', ',').replace(/:.. /, (match) => match.slice(0, -1));
};

const OXMTopbar = () => { 
    const { openProgram, openedPrograms, minimizeProgram, maximizeProgram, active } = useOSMemoryStore();
    const [currentDate, setCurrentDate] = useState(new Date()); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); 

        return () => clearInterval(intervalId);
    }, []); 

    const handleProgram = (id:any) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }

    const formattedDate = formatDate(currentDate);

    return (
        <div className={`bg-background/80 backdrop-blur-md flex flex-row justify-between h-6 px-4 py-1 z-50 rounded-full w-[calc(100%-8px)] my-1`}> 
                <div className={`flex justify-start w-1/5 flex-row text-xs font-bold`}>
                <Popover>
                    <PopoverTrigger className="capitalize p-1.5 border-transparent group border hover:border-border/50 hover:bg-foreground/10 flex flex-row h-full gap-2 items-center rounded-md">
                        <IoIosApps /> 
                    </PopoverTrigger>
                    <OXMenu handleProgram={handleProgram}/>
                </Popover> 
                </div>

                {/* Center Icons */}
                <div className={`flex flex-row items-center h-full gap-1 text-xs font-bold`}>
                <Popover>
                        <PopoverTrigger className="p-1.5 border-transparent group border hover:border-border/50 hover:bg-foreground/10 flex flex-row h-full gap-2  items-center rounded-md">
                            {formattedDate}
                        </PopoverTrigger>
                        <PopoverContent className="w-fit bg-background/80 backdrop-blur-md mt-3">
                            <Calendar
                                mode="single"
                                selected={currentDate}
                                className="card"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Right-side Icons */}
                <div className={`flex justify-end flex-row w-1/5 h-full`}> 
                    <Popover>
                        <PopoverTrigger>
                            {/* System Tray */}
                            <div className={`p-1.5 border-transparent group border hover:border-border/50 hover:bg-foreground/10 flex flex-row h-full gap-2  items-center rounded-md`}>
                                <MdOutlineSignalWifi4Bar />
                                <FaVolumeUp />
                                <RiBatteryFill />
                            </div> 
                        </PopoverTrigger>
                        <SystemTrayMenu/>
                    </Popover>
                </div> 
        </div>
    )
}

const sliders = [
    { id: "brightness", label: "Brightness" },
    { id: "volume", label: "Volume" },
];

function SystemTrayMenu() {
    return (
    <PopoverContent className="w-80 card bg-background/80 backdrop-blur-md mb-3 overflow-hidden"> 
        <div>
            {sliders.map(({ id, label }) => (
            <div key={id}>
                <Label className="text-xs">{label}</Label>
                <Slider id={id} className="my-2" />
            </div>
            ))}
        </div> 
        <div className="flex flex-row !text-xs justify-between  items-center">
                <Label className="!text-xs">Battery</Label>
                <Label className="text-foreground/50 !text-xs font-thin">0%</Label>
                
        </div> 
        </PopoverContent>
    );
}


const OXMenu=({handleProgram}:{handleProgram:Function})=>{
    const { iconsType } = useAppStore();
    const { openProgram, openedPrograms, minimizeProgram, maximizeProgram, active } = useOSMemoryStore();
    return(
        <PopoverContent className="card bgblur bgOpacity ml-5 mt-1 grid grid-cols-6 gap-2 w-96 ">
            {/* left section  */}
            <div className="flex flex-col justify-between gap-2 col-span-5 bgOpacity card">
                <ScrollArea className="!flex !flex-col items-center justify-start">
                    {TaskbarIcons.map((icon, index) => ( 
                            <Button key={index} onClick={() => handleProgram(icon.id)} variant="ghost" className={`!p-1.5 mb-1 flex flex-row gap-3 card  w-full h-10 group bgOpacity hover:!bg-foreground/20 justify-start active:scale-110 transition-all ${
                                openedPrograms.some(p => p.id === icon.id) ? 'bg-primary !text-primary-foreground' : 'hover:bg-primary'
                            }`}>
                                <Image 
                                    src={icon.imgSrc[iconsType]} 
                                    alt={icon.name} 
                                    width={200}
                                    height={200}
                                    className="w-8 h-8 transition-all"
                                />
                                <Label className="text-xs group-hover:text-primary-foreground mt-8 gro">{icon.name}</Label>
                            </Button> 
                    ))} 
                </ScrollArea> 
                <Input className="text-xs h-9 card !drop-shadow-none !shadow-none" placeholder={`Search`}/>
            </div>
            {/* right section  */}
            <div className="flex flex-col justify-between text-xs !p-1 items-center card bgOpacity">
                <div className="flex flex-col justify-center items-center group gap-1 font-bold transition-transform ">
                    <Image 
                    src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Profile" 
                    width={1000} 
                    height={1000} 
                    className='w-10 h-10 !rounded-full !p-1 card bgOpacity transition-transform duration-300 hover:scale-105'
                    />
                    <Label className="opacity-0 group-hover:opacity-100 transition-all">Guest</Label>
                </div>
                <div className="flex flex-col gap-2 justify-end">
                    <Button className="!rounded-full w-8 h-8 !p-1 card bgOpacity hover:!bg-foreground/20">
                        <MdOutlinePowerSettingsNew />
                    </Button>
                    <Button className="!rounded-full w-8 h-8 !p-1 card bgOpacity hover:!bg-foreground/20"> 
                        <MdOutlineRestartAlt />
                    </Button>
                    <Button className="!rounded-full w-8 h-8 !p-1 card bgOpacity hover:!bg-foreground/20">
                        <IoLogOutOutline />
                    </Button>
                </div>
            </div>
        </PopoverContent>
    )
}
export default OXMTopbar