"use client"
import { useState } from "react";
import DockDesktopIcon from "../desktopIcons/dockDesktopIcon";
import { TaskbarIcons } from "@/lib/constants";
import Link from "next/link";
import useIconsStore from "@/lib/Store/useIconsStore";

export default function MainTaskbar() {
    const { theme, setTheme } = useIconsStore();
    const [hoverIndex, setHoverIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const getIconStyle = (index) => {
        if (hoverIndex === null) return {};
        const distance = Math.abs(index - hoverIndex);
        const scale = Math.max(2 - distance * 0.25, 1);
        const marginBottom = Math.max(24 - distance * 8, 0);
        return {
            '--scale': scale,
            '--mb': `${marginBottom}px`,
        };
    };

    return (
        <div className="ease-in-out bgOpacity bgblur !p-1 m-2 my-1 flex flex-row gap-2 hover:gap-8 transition-all card h-12">
            {TaskbarIcons.map((icon, index) => (
                <Link 
                    key={index}
                    href={icon.route} 
                    className="transition-all ease-in-out duration-300 relative"
                    style={getIconStyle(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="transform scale-[var(--scale)] mb-[var(--mb)]">
                        <DockDesktopIcon imgSrc={icon.imgSrc[theme]} name={icon.name} />
                    </div>
                </Link>
            ))}
        </div>
    );
}