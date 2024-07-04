"use client"
import { useState } from "react";
import DockDesktopIcon from "../desktopIcons/dockDesktopIcon";

export default function MainTaskbar() {
    

    const [hoverIndex, setHoverIndex] = useState(null);

    const handleMouseEnter = (index:any) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const getIconClass = (index:any) => {
        if (hoverIndex === null) return "";
        if (index === hoverIndex) return "scale-[2] mb-6";
        if (index === hoverIndex - 1 || index === hoverIndex + 1) return "scale-[1.75] mb-4";
        if (index === hoverIndex - 2 || index === hoverIndex + 2) return "scale-[1.5] mb-2";
        return "";
    };
    return (
        <div className="ease-in-out bgOpacity bgblur !p-1 m-2 my-1 flex flex-row gap-2 hover:gap-8 transition-all card h-12 ">
            {icons.map((icon, index) => (
                <div className={` transition-all ease-linear relative duration-100 ${getIconClass(index)}`}onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}>
                    <DockDesktopIcon  key={index} imgSrc={icon.imgSrc} name={icon.name} />
                </div>
            ))}
        </div>
    );
}
