"use client"
import { useState, useEffect } from "react"; 
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
        <div className="select-none bg-transparent !border-transparent h-full !px-6 md:!px-10 flex flex-col relative gap-2 md:gap-10 items-center justify-center card"> 
                <Label className="block text-6xl md:text-9xl  text-foreground/50 font-six-caps tracking-wider" style={{ lineHeight: '1' }}>
                    {formatTime(time)}
                </Label>
                <Label className="absolute font-style-script italic text-5xl md:text-8xl mt-4 md:mt-16 font-bold ">
                    {weekday}
                </Label>
                <Label className="block text-3xl md:text-5xl text-foreground/50 font-six-caps tracking-wider">
                    {day}TH {month} {year}
                </Label> 
        </div>
    );
};

export default ClockWidget;
