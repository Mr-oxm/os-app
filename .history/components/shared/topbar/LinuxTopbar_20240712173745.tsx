import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import useAppStore from "@/lib/Store/useAppStore";
import { Battery, ChevronUp, Volume2, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LinuxTopbar = () => {
    const { iconsType, setIconsType, taskbarDir, taskbarPos } = useAppStore();
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); 

        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = formatDate(currentDate);
    return (
        <div className={` bg-background/80 backdrop-blur-md  flex flex-row justify-between h-6 px-2 w-screen py-1 border-t border-border`}> 
                <div className={`hidden md:flex justify-start w-1/5 flex-row `}>
                </div>

                {/* Center Icons */}
                <div className={`flex flex-row items-center h-full gap-1`}>
                    hi
                </div>

                {/* Right-side Icons */}
                <div className={`hidden md:flex flex-row w-1/5 h-full `}> 
                    <Popover>
                        <PopoverTrigger>
                            {/* System Tray */}
                            <div className={`p-1.5 border-transparent group border hover:border-accent/25 hover:bg-accent/40 flex flex-row h-full gap-2  items-center rounded-md`}>
                                <ChevronUp className="w-4 h-4" />
                                <Wifi className="w-4 h-4" />
                                <Volume2 className="w-4 h-4" />
                                <Battery className="w-4 h-4" />
                            </div> 
                        </PopoverTrigger>
                        {/* <SystemTrayMenu/> */}
                    </Popover>


                    
                </div> 
        </div>
    )
}
export default LinuxTopbar