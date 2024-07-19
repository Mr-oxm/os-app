
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
        <div className="sel col-span-4 row-span-2 h-full bg-transparent border-transparent flex flex-col relative gap-10 items-center justify-center "> 
                <Label className="block text-9xl  text-foreground/50 font-six-caps tracking-wider" style={{ lineHeight: '1' }}>
                    {formatTime(time)}
                </Label>
                <Label className="absolute font-style-script italic text-8xl mt-16 font-bold ">
                    {weekday}
                </Label>
                <Label className="block text-5xl text-foreground/50 font-six-caps tracking-wider">
                    {day}TH {month} {year}
                </Label> 
        </div>
    );
};

export default ClockWidget;
