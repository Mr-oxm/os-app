"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { Bluetooth, Wifi, Battery, Settings2, Share, Moon, Sun, Copy} from "lucide-react"
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAppStore from "@/lib/Store/useAppStore";

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

const MacRightbar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { sysColor} = useAppStore()
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000); 

        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = currentDate ? formatDate(currentDate) : '';

    const menuItems = [
        { icon: null, label: formattedDate, content: <DateMenu /> },
        { icon: <Settings2 className="lucidBarIcon"/>, content: <SettingsMenu /> },
        { icon: <Battery className="lucidBarIcon"/>, content: <BatteryMenu /> },
        { icon: <Bluetooth className="lucidBarIcon"/>, content: <BlueMenu />, className: "hidden md:block" },
        { icon: <Wifi className="lucidBarIcon"/>, content: <WifiMenu />, className: "hidden md:block" },
    ];

    return (
        <div className={`flex flex-row-reverse h-full p-1 gap-1 !${sysColor}`}>
            {menuItems.map((item, index) => (
                <DropdownMenu key={index}>
                    <DropdownMenuTrigger className={` w-auto bg-transparent !py-0 !px-1 md:!px-3 h-full !text-foreground !text-xs hover:bg-background/40 rounded-sm transition-all ease-in-out !border-transparent hover:!border-border/20 card ${item.className || ''}`}>
                        {item.icon || item.label}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="!p-2 w-screen md:w-80 text-foreground card bgOpacity bgblur hover:bgOpacity mt-2">
                        {item.content}
                    </DropdownMenuContent>
                </DropdownMenu>
            ))}
        </div>
    )
}

export default MacRightbar

const SettingsMenu = () => {
    const settingsIcon=[
        {name:"Wifi", icon:<Wifi className="lucidBarIcon"/>, status:false},
        {name:"Bluetooth", icon:<Bluetooth className="lucidBarIcon"/>, status:false},
        {name:"Airdrop", icon:<Share className="lucidBarIcon"/>, status:false},
    ]
    const { sysColor} = useAppStore()
    return(
        <div className={`grid grid-cols-4 grid-rows-4 w-full !text-xs gap-2 ${sysColor}`}>
            <div className="flex flex-col gap-4 bgOpacity card row-span-2 col-span-2 ">
                {settingsIcon.map((icon, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center">
                        <Toggle className="btn !rounded-full w-10 h-10">
                            {icon.icon}
                        </Toggle>
                        <div className="flex flex-col gap-1 ">
                            <Label className=" !text-xs">{icon.name} </Label>
                            <Label className="!text-xs !font-thin">{icon.status? 'On': 'Off'}</Label>
                        </div>
                    </div> 
                ))}
            </div> 
            <div className="col-span-2 row-span-1 bgOpacity card flex flex-row gap-2 items-center">
                <Toggle className="btn !rounded-full w-10 h-10">
                    <Moon className="lucidBarIcon"/>
                </Toggle>
                <Label className=" !text-xs">Do Not Disturb</Label>
            </div>
            <div className="bgOpacity card flex flex-col gap-2 items-center col-span-1 row-span-1">
                <Sun className="lucidBarIcon"/>
                <Label className=" !text-xs text-center">Keyboard Brightness</Label>
            </div> 
            <div className="bgOpacity card flex flex-col gap-2 items-center col-span-1 row-span-1">
                <Copy className="lucidBarIcon"/>
                <Label className=" !text-xs text-center">Screen Mirroring</Label>
            </div> 
            {['Display', 'Sound'].map((label, index) => (
                <div key={index} className="bgOpacity card flex flex-col gap-2 items-start col-span-4 row-span-1 justify-center">
                    <Label className=" !text-xs text-center">{label}</Label>
                    <Slider defaultValue={[33]} max={100} step={1} className="pb-0"/>
                </div> 
            ))}
        </div>
    )
}

const WifiMenu = () => (
    <div className="flex flex-row w-full !text-xs justify-between p-2 items-center">
        <Label className="!text-xs">Wifi</Label>
        <Switch />
    </div> 
)

const BlueMenu = () => (
    <div className="flex flex-row w-full !text-xs justify-between p-2 items-center">
        <Label className="!text-xs">Bluetooth</Label>
        <Switch />
    </div> 
)

const BatteryMenu = () => (
    <div className="flex flex-col gap-2 p-2 w-full">
        <div className="flex flex-row !text-xs justify-between  items-center">
            <Label className="!text-xs">Battery</Label>
            <Label className="text-foreground/50 !text-xs font-thin">0%</Label>
        </div> 
        <hr className="border-foreground/15  my-1"  />
        <Label className="text-foreground/50 !text-xs font-thin">Power Source: Battery</Label>
        <hr className="border-foreground/15  my-1"  />
        <Label className="text-foreground/50 !text-xs font-thin">No Apps Using Significant Energy</Label>
    </div>
)

const DateMenu = () => {
    const [currentDate, setCurrentDate] = useState(new Date()); 
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = dayNames[currentDate.getDay()];
    return( 
        <div className="flex flex-col gap-2 p-2 bg-background w-full card text-left">
            <div className="flex flex-col">
                <Label className=" !text-xs !font-extrabold !uppercase !text-destructive">{dayOfWeek}</Label>
                <Label className="text-foreground !text-2xl">{currentDate.getDay()}</Label>
            </div>
            <Label className="text-foreground/50 !text-xs font-thin">No events for today</Label>
        </div>
    )
}