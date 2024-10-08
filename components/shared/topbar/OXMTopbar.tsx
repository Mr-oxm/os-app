"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; 
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { SystemAppsIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import { Label } from "@radix-ui/react-context-menu"; 
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineSignalWifi4Bar,MdOutlinePowerSettingsNew, MdOutlineRestartAlt, MdBluetooth, MdMonitor } from "react-icons/md";
import { FaVolumeUp } from "react-icons/fa";
import { RiBatteryFill, RiBatteryLine } from "react-icons/ri";
import { IoIosApps, IoMdMoon } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoAccessibility, IoAirplaneSharp, IoLogOutOutline } from "react-icons/io5";
import { BsBrightnessHighFill } from "react-icons/bs";
import { FaLocationArrow, FaVolumeXmark } from "react-icons/fa6";
import { useTaskbarStore } from "@/lib/Store/useTaskbarStore";
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
    const {sysColor } = useAppStore() 
    const [currentDate, setCurrentDate] = useState(new Date()); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); 

        return () => clearInterval(intervalId);
    }, []); 



    const formattedDate = formatDate(currentDate);

    return (
        <div className={`  bg-background/80 backdrop-blur-md flex flex-row justify-between h-6 px-4 py-1 z-50 rounded-full w-full my-1`}> 
                <div className={`flex justify-start w-1/5 flex-row text-xs font-bold`}>
                <Popover>
                    <PopoverTrigger className="capitalize p-1 border-transparent group border hover:border-border/50 hover:bg-foreground/10 flex flex-row h-full gap-2 items-center rounded-md">
                        <IoIosApps /> 
                    </PopoverTrigger>
                    <OXMenu/>
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
                                className={`card bgOpacity ${sysColor}`}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Right-side Icons */}
                <div className={`flex justify-end flex-row w-1/5 h-full`}> 
                    <Popover>
                        <PopoverTrigger>
                            {/* System Tray */}
                            <div className={`p-1.5 border-transparent group border hover:border-border/50 hover:bg-foreground/10 flex flex-row h-full gap-2  items-center rounded-md `}>
                                <MdOutlineSignalWifi4Bar  className="p-px" />
                                <FaVolumeUp className="p-px" />
                                <RiBatteryFill  className="p-px"/>
                            </div> 
                        </PopoverTrigger>
                        <SystemTrayMenu/>
                    </Popover>
                </div> 
        </div>
    )
}

const sliders = [
    { id: "brightness", Icon: BsBrightnessHighFill },
    { id: "volume", Icon: FaVolumeUp },
];
const quickSettings = [
    { icon: MdOutlineSignalWifi4Bar, label: "Wi-Fi" },
    { icon: MdBluetooth, label: "Bluetooth" },
    { icon: IoAirplaneSharp, label: "Airplane mode" },
    { icon: RiBatteryLine, label: "Battery saver" },
    { icon: IoAccessibility, label: "Accessibility" },
    { icon: MdMonitor, label: "Project" },
    { icon: IoMdMoon, label: "Night light" },
    { icon: FaLocationArrow, label: "Location" },
    { icon: FaVolumeXmark, label: "Silent Mode" },
];

function SystemTrayMenu() {
    const { sysColor } = useAppStore();
    return (
    <PopoverContent className={`w-80 card bgOpacity backdrop-blur-md mt-1 overflow-hidden flex flex-col gap-3 mr-4 ${sysColor}`}>
        <div className="grid grid-cols-3 gap-2 card bgOpacity">
            {quickSettings.map(({ icon: Icon, label }) => (
            <div className="flex flex-col items-center gap-2" key={label}>
                <Button  variant="ghost" className=" h-20 overflow-hidden w-full flex flex-col gap-2 group btn2 !drop-shadow-none">
                    <Icon className="h-4 w-4" />
                    <span className="text-xs text-wrap opacity-0 h-0 group-hover:h-6 group-hover:opacity-100 transition-all ease-in-out">{label}</span>
                </Button>
            </div>
            ))}
        </div> 
        <div className="card bgOpacity">
            {sliders.map(({ id, Icon }) => (
            <div key={id} className="flex flex-row gap-2 items-center">
                <Icon className="h-4 w-4" />
                <Slider id={id} className="my-2" />
            </div>
            ))}
        </div> 
        <div className="flex flex-row !text-xs justify-between  items-center card bgOpacity">
                <Label className="!text-xs flex flex-row gap-2 items-center"><RiBatteryFill /> Battery</Label>
                <Label className="text-foreground/70 !text-xs font-thin">0%</Label>
                
        </div> 
        </PopoverContent>
    );
}


const OXMenu=()=>{
    const { iconsType, sysColor } = useAppStore();
    const {openedPrograms, minimizeProgram, maximizeProgram, active } = useOSMemoryStore();
    const {openProgram}= useTaskbarStore();
    const [searchTerm, setSearchTerm] = useState('');

    const handleProgram = (id:any) => {
        const result = openedPrograms.find(program => program.id === id);
        if (result) {
            result.minimized ? maximizeProgram(id) : minimizeProgram(id);
        } else {
            openProgram(id);
        }
    }
    // Filter icons based on search term
    const filteredIcons = SystemAppsIcons.filter(icon => 
        icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PopoverContent className={`${sysColor} card bgblur bgOpacity ml-4 mt-1 grid md:grid-cols-6 grid-cols-8 gap-2 w-80 md:w-96 `}>
            {/* left section  */}
            <div className="flex flex-col justify-between gap-2 md:col-span-5 col-span-6 bgOpacity card">
                <Label className=" font-bold text-sm">All apps</Label>
                <ScrollArea className="max-h-72">
                    <div className="!flex !flex-col gap-1 items-center justify-start min-h-64">
                        {filteredIcons.map((icon, index) => ( 
                            <Button key={index} onClick={() => handleProgram(icon.id)} variant="ghost" className={`!p-1.5 flex flex-row gap-3  w-full h-10 group    justify-start btn-normal !drop-shadow-none ${
                                openedPrograms.some(p => p.id === icon.id) ? '!bg-primary !text-primary-foreground hover:!bg-primary' : ''
                            }`}>
                                <Image 
                                    src={icon.imgSrc[iconsType]} 
                                    alt={icon.name} 
                                    width={200}
                                    height={200}
                                    className="w-8 h-8 transition-all"
                                />
                                <Label className="text-xs">{icon.name}</Label>
                            </Button> 
                        ))} 
                    </div>
                </ScrollArea> 
                <Input 
                    className="text-xs h-9 card !drop-shadow-none !shadow-none bg-background" 
                    placeholder={`Search`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/* right section  */}
            <div className="flex flex-col justify-between text-xs !px-1 items-center card bgOpacity active:outline-primary md:col-span-1 col-span-2">
                <div className="flex flex-col justify-center items-center group gap-1 transition-transform ">
                    <Image 
                    src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Profile" 
                    width={1000} 
                    height={1000} 
                    className='w-10 h-10 !rounded-full !p-1 card bgOpacity transition-all ease-in-out hover:!bg-foreground/10'
                    />
                    <Label className=" transition-all hidden ease-in-out group-hover:block">Guest</Label>
                </div>
                <div className="flex flex-col gap-2 justify-end">
                    <Button className="!rounded-full w-10 h-10 btn">
                        <MdOutlinePowerSettingsNew />
                    </Button>
                    <Button className="!rounded-full w-10 h-10 btn"> 
                        <MdOutlineRestartAlt />
                    </Button>
                    <Button className="!rounded-full w-10 h-10 btn">
                        <IoLogOutOutline />
                    </Button>
                </div>
            </div>
        </PopoverContent>
    )
}
export default OXMTopbar