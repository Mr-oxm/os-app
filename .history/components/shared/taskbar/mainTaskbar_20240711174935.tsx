"use client"
import { useState } from "react";
import DockDesktopIcon from "../desktopIcons/dockDesktopIcon";
import { TaskbarIcons } from "@/lib/constants";
import Link from "next/link";
import useIconsStore from "@/lib/Store/useIconsStore";
import useAppStore from "@/lib/Store/useAppStore";

export default function MainTaskbar() { 
    const { iconsType, setIconsType,taskbarDir } = useAppStore();
    const [hoverIndex, setHoverIndex] = useState(null);

    const handleMouseEnter = (index:any) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const getIconClass = (index:any) => {
        if (hoverIndex === null) return "";
        if (index === hoverIndex) return "scale-[2] "+ taskbarDir? "";
        if (index === hoverIndex - 1 || index === hoverIndex + 1) return "scale-[1.75] mb-4";
        if (index === hoverIndex - 2 || index === hoverIndex + 2) return "scale-[1.5] mb-2";
        return "";
    };
    return (
        <div className={`ease-in-out bgOpacity bgblur !p-1 m-2 my-1 flex ${taskbarDir===0? "flex-row h-12 hover:gap-8":"flex-col w-12 hover:gap-"}  gap-2  transition-all card`}>
            {TaskbarIcons.map((icon, index) => (
                <Link href={icon.route} className={` transition-all ease-linear relative duration-100 ${getIconClass(index)}`}onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}>
                    <DockDesktopIcon  key={index} imgSrc={icon.imgSrc[iconsType]} name={icon.name} />
                </Link>
            ))}
        </div>
    );
}
