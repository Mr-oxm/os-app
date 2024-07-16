"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TaskbarIcons } from "@/lib/constants";
import useAppStore from "@/lib/Store/useAppStore";
import { Label } from "@radix-ui/react-context-menu";
import { Battery, ChevronUp, Volume2, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const formatDate = (date:Date) => {
    const options:any = { 
        weekday: 'short', 
        day: '2-digit', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    };
    return date.toLocaleDateString('en-US', options).replace(',', '').replace(/:.. /, (match) => match.slice(0, -1));
};


const LinuxTopbar = () => {
    const { iconsType, setIconsType, taskbarDir, taskbarPos } = useAppStore();
    const [currentDate, setCurrentDate] = useState(new Date());
    const pathname = usePathname();
    const programTitle = pathname?.split('/').pop() || '';

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); 

        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = formatDate(currentDate);
    return (
        <div className={` bg-background/80 backdrop-blur-md  flex flex-row justify-between h-6 px-4 w-screen py-1 `}> 
                <div className={`flex justify-start w-1/5 flex-row text-xs font-bold `}>
                <Dialog>
                    <DialogTrigger className="capitalize">{programTitle?programTitle:"Desktop"}</DialogTrigger>
                    <DialogContent className="flex flex-col items-center w-fit bgblur bgOpacity border-0 ">
                        <Label>Applications</Label>
                        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                            {TaskbarIcons.map((icon, index) => (
                                <Link href={icon.route} 
                                    
                                > 
                                    <Button variant="ghost" className={`p-1.5 border-transparent w-20 h-20 group border hover:border-accent/25 hover:bg-accent/40 'bg-accent/40 hover:hover:bg-accent/40
                                    }`} >
                                        <Image 
                                            src={icon.imgSrc[iconsType]} 
                                            alt={icon.name} 
                                            width={200}
                                            height={200}
                                            className="w-full h-full transition-all group-active:h-5 group-active:w-5"
                                        /> 
                                        
                                    </Button> 
                                </Link> 
                            ))} 
                        </div>
                    </DialogContent>
                </Dialog>
                    
                </div>

                {/* Center Icons */}
                <div className={`flex flex-row items-center h-full gap-1 text-xs font-bold`}>
                <Popover>
                        <PopoverTrigger>
                            {formattedDate}
                        </PopoverTrigger>
                        <PopoverContent className="w-fit bg-background/80 backdrop-blur-md mt-3">
                            <Calendar
                                mode="single"
                                selected={currentDate}
                                
                                className="rounded-md border "
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Right-side Icons */}
                <div className={`flex justify-end flex-row w-1/5 h-full `}> 
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