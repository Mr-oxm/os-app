"use client"
import { useState } from "react";
import DockDesktopIcon from "../desktopIcons/dockDesktopIcon";

export default function MainTaskbar() {
    const icons = [
        {
            imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/884c8c0cc7a505ac50339c9552263524_B7DXS2NKpM.png",
            name: "Finder"
        },
        {
            imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/580889ee3811c11886dc163ee59b9d92_V7Od0GfbVh.png",
            name: "launchpad"
        },
        {
            imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/2daefe2173c9ccc78a108eb9dd805565_eJCDM3QFYI.png",
            name: "Terminal"
        },
        {
            imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/66c7ae19964613c774a3751916d496b3_yNBo22mIIb.png",
            name: "Settings"
        },
        {
            imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/f4c0c6c2336b6433aaf11ed6353769d0_low_res_Calculator.png",
            name: "Calculator"
        },
        {
            imgSrc: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/db1241171cb324621c222ad116d80972_f8Y65N7lzM.png",
            name: "Trash"
        }
    ];

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
        <div className="ease-in-out bg-background/20 bgblur p-1 m-2 rounded-xl flex flex-row gap-2 hover:gap-8 transition-all border border-border/20 h-12 ">
            {icons.map((icon, index) => (
                <div className={` transition-all ease-linear relative duration-100 ${getIconClass(index)}`}onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}>
                    <DockDesktopIcon  key={index} imgSrc={icon.imgSrc} name={icon.name} />
                </div>
            ))}
        </div>
    );
}
