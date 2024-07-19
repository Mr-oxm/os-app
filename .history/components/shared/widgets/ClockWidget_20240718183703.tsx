import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";

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
        <Card className="col-span-4 row-span-2 h-full">
            <CardContent className="flex flex-col items-center justify-center h-full "> 
                <div className="z-10 text-center text-white relative">
                    <span className="block text-6xl font-bold" style={{ lineHeight: '1' }}>
                        {formatTime(time)}
                    </span>
                    <span className="absolute text-5xl top-1/2  font-bold ">
                        {weekday}
                    </span>
                    <span className="block text-xl font-bold">
                        {day}TH {month} {year}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default ClockWidget;
