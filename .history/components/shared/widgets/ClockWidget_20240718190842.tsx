import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

const ClockWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatDate = (date: Date) => {
        const day = date.toLocaleDateString('en-GB', { day: 'numeric' });
        const month = date.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();
        const year = date.getFullYear();
        const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
        return { day, month, year, weekday };
    };

    const { day, month, year, weekday } = formatDate(time);

    return (
        <div className=" col-span-4 row-span-2 h-full bg-transparent border-transparent flex flex-col relative gap-8 items-center justify-center "> 
                <Label className="block text-8xl  text-foreground/50 font-six-caps tracking-wider" style={{ lineHeight: '1' }}>
                    {formatTime(time)}
                </Label>
                <Label className="absolute font-style-script italic text-7xl mt-14 font-bold ">
                    {weekday}
                </Label>
                <Label className="block text-4xl text-foreground/50 font-six-caps tracking-wider">
                    {day}TH {month} {year}
                </Label> 
            </d>
        </div>
    );
};

export default ClockWidget;
